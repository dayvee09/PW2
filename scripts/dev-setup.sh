#!/usr/bin/env bash
# First-time local setup (dev container or workstation).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
API="$ROOT/cellier-projet/api-php"
CLIENT="$ROOT/cellier-projet/client"

if [ ! -f "$API/config.local.php" ]; then
  cp "$API/config.local.example.php" "$API/config.local.php"
  # Dev container defaults (docker-compose db service)
  if [ "${DB_HOST:-}" = "db" ] || [ -f "$ROOT/.devcontainer/docker-compose.yml" ]; then
    cat > "$API/config.local.php" <<'PHP'
<?php
return [
    'db_host' => getenv('DB_HOST') ?: 'db',
    'db_name' => getenv('DB_NAME') ?: 'pw2',
    'db_user' => getenv('DB_USER') ?: 'monvino',
    'db_pass' => getenv('DB_PASSWORD') ?: 'monvino',
];
PHP
    echo "Created api-php/config.local.php (dev container DB settings)"
  else
    echo "Created api-php/config.local.php — edit credentials before running the API."
  fi
fi

if [ ! -f "$API/modeles/AccesBd.cls.php" ]; then
  cp "$API/modeles/AccesBd-template.cls.php" "$API/modeles/AccesBd.cls.php"
  echo "Created api-php/modeles/AccesBd.cls.php from template"
fi

if [ ! -f "$CLIENT/src/aws-exports.js" ]; then
  if [ -f "$CLIENT/src/aws-exports.example.js" ]; then
    cp "$CLIENT/src/aws-exports.example.js" "$CLIENT/src/aws-exports.js"
    echo "Created client/src/aws-exports.js from example — configure Cognito before auth works."
  fi
fi

"$ROOT/scripts/setup-git-hooks.sh"

echo "Dev setup complete."
