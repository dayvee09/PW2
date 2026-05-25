#!/usr/bin/env bash
# One-time: stop tracking files that should never be on GitHub.
# Run from repo root after updating .gitignore.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

FILES=(
  cellier-projet/client/src/aws-exports.js
  cellier-projet/client/amplify/team-provider-info.json
  cellier-projet/client/amplify/.config/local-aws-info.json
  cellier-projet/client/amplify/.config/local-env-info.json
  .devcontainer/docker-compose.yml
)

for f in "${FILES[@]}"; do
  if git ls-files --error-unmatch "$f" &>/dev/null; then
    git rm --cached "$f"
    echo "Untracked: $f"
  else
    echo "Not tracked (skip): $f"
  fi
done

AMPLIFY_BACKEND="cellier-projet/client/amplify/#current-cloud-backend"
if git ls-files --error-unmatch "$AMPLIFY_BACKEND" &>/dev/null; then
  git rm -r --cached "$AMPLIFY_BACKEND"
  echo "Untracked: $AMPLIFY_BACKEND/ (recursive)"
else
  echo "Not tracked (skip): $AMPLIFY_BACKEND/"
fi

echo ""
echo "Done. Commit the .gitignore update and these removals when ready."
echo "Keep local copies of aws-exports.js and Amplify config on your machine."
