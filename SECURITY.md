# Security

## If GitGuardian or GitHub flagged secrets in this repo

### Amplify generated CloudFormation (critical)

These folders can contain **OAuth client secrets** (Facebook, Google, Login with Amazon) inside CloudFormation JSON. They must never be committed:

- `cellier-projet/client/amplify/#current-cloud-backend/`
- `cellier-projet/client/amplify/backend/awscloudformation/`

If it was ever pushed:

1. Remove it from Git (see `scripts/untrack-sensitive.sh`).
2. **Rotate immediately** in each provider console and in AWS Cognito / Amplify.
3. Invalidate old OAuth client secrets.

### Dev container database passwords

`.devcontainer/docker-compose.yml` uses local-only MariaDB credentials. Use `docker-compose.example.yml` and your own values. If `monvino` / `root` were committed in an old revision, treat them as compromised for any shared environment and change local passwords.

### Cognito / AWS

- Never commit `aws-exports.js`, `team-provider-info.json`, or `config.local.php`.
- Use `aws-exports.example.js` and `config.local.example.php` as templates.
