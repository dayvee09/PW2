# Déploiement Mon Vino en production

Ce guide décrit comment exporter le projet, le déployer sur un serveur de production, et éviter d’exposer des fichiers sensibles sur GitHub.

## Architecture

| Composant | Dossier | Rôle |
|-----------|---------|------|
| Frontend React | `cellier-projet/client/build` → `www/` dans l’archive | Interface utilisateur (fichiers statiques) |
| API PHP | `cellier-projet/api-php` | Backend REST JSON |
| Base de données | `cellier-projet/database/pw2_le_bon.sql` | Schéma + données initiales |
| Auth | AWS Cognito via `aws-exports.js` | Connexion utilisateurs |

URL de production actuelle de l’API (dans le code) : `https://monvino.app/api-php/index.php`

---

## 1. Préparer la machine de développement

### Installation initiale

```bash
cd /chemin/vers/monvino
chmod +x scripts/*.sh .githooks/pre-commit
./scripts/dev-setup.sh
```

Cela crée (s’ils manquent) :

- `cellier-projet/api-php/config.local.php` — identifiants MySQL (gitignored)
- `cellier-projet/api-php/modeles/AccesBd.cls.php` — copie du template (gitignored)
- `cellier-projet/client/src/aws-exports.js` — config Cognito (gitignored)
- le hook Git `pre-commit` pour bloquer les secrets

### Fichiers à ne jamais committer

| Fichier | Raison |
|---------|--------|
| `AccesBd.cls.php` | Ancienne variante avec mots de passe en dur |
| `config.local.php` | Identifiants base de données |
| `.env`, `.env.production`, `.env.*.local` | Variables d’environnement |
| `src/aws-exports.js` | IDs Cognito / OAuth |
| `amplify/team-provider-info.json` | Compte AWS, ARNs |
| `amplify/.config/local-*` | Chemins machine locale |
| `cellier-projet/database/` | Dumps SQL (mots de passe hashés) |

### Retirer des fichiers déjà suivis par Git

Si le dépôt a déjà poussé des fichiers sensibles :

```bash
./scripts/untrack-sensitive.sh
git add .gitignore
git commit -m "Stop tracking Amplify and Cognito local config"
```

Puis régénérez `aws-exports.js` localement (`amplify pull` ou copie depuis la console AWS).

### Activer la protection Git

```bash
./scripts/setup-git-hooks.sh
```

Le hook `pre-commit` refuse tout commit contenant des chemins sensibles connus.

---

## 2. Créer l’archive de production

### Configurer le build frontend

```bash
cp cellier-projet/client/.env.production.example cellier-projet/client/.env.production
# Éditer REACT_APP_API_URI pour votre domaine
```

Vérifier que `cellier-projet/client/src/aws-exports.js` existe et que les URLs OAuth `redirectSignIn` / `redirectSignOut` pointent vers votre domaine de production (console AWS Cognito).

### Générer le tarball

```bash
./scripts/build-export.sh
```

Résultat dans `dist/` :

- `monvino-release-YYYYMMDD-HHMMSS/` — dossier déployable
- `monvino-release-YYYYMMDD-HHMMSS.tar.gz` — archive à transférer

L’archive **ne contient pas** : `node_modules`, `.env`, `config.local.php`, ni `AccesBd.cls.php` avec secrets locaux.

---

## 3. Déployer sur le serveur

### Prérequis serveur

- PHP 7.4+ avec extensions `pdo_mysql`, `json`
- MySQL ou MariaDB 10.x
- Apache (mod_rewrite) ou Nginx
- HTTPS recommandé (Cognito OAuth)

### Transfert

```bash
scp dist/monvino-release-*.tar.gz user@serveur:/tmp/
ssh user@serveur
cd /var/www
sudo tar -xzf /tmp/monvino-release-*.tar.gz
sudo mv monvino-release-* monvino
```

### Base de données

```bash
mysql -u root -p -e "CREATE DATABASE pw2 CHARACTER SET utf8mb4;"
mysql -u root -p pw2 < /var/www/monvino/database/pw2_le_bon.sql
```

Créer un utilisateur MySQL dédié (éviter `root` en production).

### Configuration API

```bash
cd /var/www/monvino/api-php
sudo cp config.local.example.php config.local.php
sudo nano config.local.php   # db_host, db_name, db_user, db_pass
```

`AccesBd.cls.php` est déjà inclus dans l’archive (généré depuis le template) et lit `config.local.php`.

### Apache (exemple)

```apache
<VirtualHost *:443>
    ServerName monvino.app
    DocumentRoot /var/www/monvino/www

    <Directory /var/www/monvino/www>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    Alias /api-php /var/www/monvino/api-php
    <Directory /var/www/monvino/api-php>
        AllowOverride All
        Require all granted
    </Directory>

    # React Router — renvoyer les routes vers index.html
    FallbackResource /index.html
</VirtualHost>
```

Ajuster selon votre hébergeur (cPanel, WebDev, etc.).

### Nginx (extrait)

```nginx
root /var/www/monvino/www;
index index.html;

location /api-php/ {
    try_files $uri $uri/ /api-php/index.php?$query_string;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

### Vérifications post-déploiement

1. `https://votredomaine.com` — l’interface React s’affiche
2. `https://votredomaine.com/api-php/utilisateurs` (ou route test) — JSON, pas d’erreur 500
3. Connexion Cognito — redirects OAuth vers le bon domaine
4. `config.local.php` et `.env.production` **absents** du dépôt Git public

---

## 4. Mises à jour (re-déploiement)

1. Sur la machine de dev : `git pull`, config à jour, `./scripts/build-export.sh`
2. Sur le serveur : sauvegarder la BD, extraire la nouvelle archive
3. Ne pas écraser `api-php/config.local.php` (le conserver)
4. Remplacer `www/` par le nouveau build React
5. Remplacer le code PHP sauf `config.local.php`

---

## 5. Checklist sécurité GitHub

- [ ] `./scripts/setup-git-hooks.sh` exécuté sur chaque poste de dev
- [ ] `./scripts/untrack-sensitive.sh` si des secrets étaient déjà commités
- [ ] Aucun fichier listé dans la section « Fichiers à ne jamais committer » dans `git status`
- [ ] Cognito : URLs de callback production dans la console AWS
- [ ] Mot de passe MySQL fort, utilisateur dédié
- [ ] HTTPS actif sur le domaine de production

---

## Dépannage

| Problème | Solution |
|----------|----------|
| `Configuration manquante` (API) | Créer `api-php/config.local.php` sur le serveur |
| Erreur 500 base de données | Vérifier host/user/pass dans `config.local.php` |
| Auth Cognito échoue | Vérifier `aws-exports.js` au **build** (pas seulement sur le serveur) |
| Routes React 404 au refresh | Configurer `FallbackResource` ou `try_files … /index.html` |
| pre-commit bloque un commit | `git reset HEAD -- <fichier>` et ajouter au `.gitignore` |
