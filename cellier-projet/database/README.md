# Base de données Mon Vino

## Fichiers

| Fichier | Versionné Git | Usage |
|---------|---------------|--------|
| `monvino-starter.sql` | Oui | Schéma + données de démo génériques pour nouveaux contributeurs |
| `pw2_le_bon.sql` | Non (local) | Votre dump personnel / production — ne pas pousser sur GitHub |

## Import (développement ou première install)

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS pw2 CHARACTER SET utf8mb4;"
mysql -u root -p pw2 < cellier-projet/database/monvino-starter.sql
```

## Comptes de démo inclus

- **Admin** : `admin@example.com` — cellier `#1` (catalogue SAQ pour l’import et l’autocomplete)
- **Démo** : `demo@example.com` — cellier `#2` avec quelques bouteilles d’exemple

L’authentification passe par **AWS Cognito** (`mdp` est `NULL` dans MySQL). Après la première connexion Cognito, l’API crée ou retrouve l’utilisateur par courriel. Pour l’admin :

```sql
UPDATE vino__utilisateur SET email = 'votre-email-cognito@example.com' WHERE id = 1;
```

Ou connectez-vous une fois avec le compte admin Cognito : l’app peut enregistrer l’utilisateur automatiquement si le courriel n’existe pas encore.

## Dump personnel

Gardez `pw2_le_bon.sql` uniquement en local. Les archives de production générées par `./scripts/build-export.sh` utilisent ce fichier s’il est présent, sinon `monvino-starter.sql`.
