#!/usr/bin/env bash
# Remove sensitive paths from ALL commits on the current branch (rewrites history).
# Run only if GitGuardian still flags old commits in your PR after untrack-sensitive.sh.
# Requires: git filter-branch (built-in) or git-filter-repo (recommended).
#
# After running: git push --force-with-lease origin <branch>
#
# IMPORTANT: Rotate OAuth client secrets if amplify #current-cloud-backend was ever pushed.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BRANCH="$(git branch --show-current)"
echo "This will rewrite history on branch: $BRANCH"
echo "Paths removed from every commit:"
echo "  - cellier-projet/client/amplify/#current-cloud-backend/"
echo "  - cellier-projet/client/amplify/backend/awscloudformation/"
echo "  - .devcontainer/docker-compose.yml"
echo ""
read -r -p "Continue? [y/N] " ans
[[ "${ans:-}" =~ ^[yY]$ ]] || exit 0

export FILTER_BRANCH_SQUELCH_WARNING=1

git filter-branch -f --index-filter '
  git rm -rf --cached --ignore-unmatch \
    cellier-projet/client/amplify/#current-cloud-backend \
    cellier-projet/client/amplify/backend/awscloudformation \
    .devcontainer/docker-compose.yml \
    2>/dev/null || true
' -- "$BRANCH"

echo ""
echo "Done. Verify with: git log --oneline -5"
echo "Then: git push --force-with-lease <remote> $BRANCH"
echo "See SECURITY.md for rotating exposed OAuth / DB credentials."
