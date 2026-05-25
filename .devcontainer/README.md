# Dev container

Local-only files (gitignored): `docker-compose.yml`, `Dockerfile`, `apache-monvino.conf`.

Setup:

```bash
cp .devcontainer/docker-compose.example.yml .devcontainer/docker-compose.yml
# Edit passwords in docker-compose.yml — do not commit that file.
```

Database seed on first start: `cellier-projet/database/monvino-starter.sql` (or your local `pw2_le_bon.sql` if you change the volume path in compose).
