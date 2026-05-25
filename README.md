# Mon Vino

Application de gestion de cellier (React + PHP + MySQL/MariaDB + AWS Cognito).

## Démarrage rapide (développement)

```bash
./scripts/dev-setup.sh
cd cellier-projet/client && npm install && npm start
```

API PHP : servie via Apache/XAMPP ou le proxy du client (`setupProxy.js`).

## Production

Voir **[DEPLOYMENT.md](./DEPLOYMENT.md)** pour :

- créer une archive prête pour le serveur (`./scripts/build-export.sh`)
- configurer Apache/Nginx, MySQL et Cognito
- protéger les secrets sur GitHub (`.gitignore` + hook `pre-commit`)

## Scripts utiles

| Script | Description |
|--------|-------------|
| `scripts/dev-setup.sh` | Config locale (DB, hooks Git) |
| `scripts/build-export.sh` | Build React + tarball de déploiement |
| `scripts/setup-git-hooks.sh` | Active le hook anti-secrets |
| `scripts/untrack-sensitive.sh` | Retire les fichiers sensibles de l’index Git |
