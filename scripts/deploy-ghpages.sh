#!/usr/bin/env bash
# Manual fallback deploy: builds the site and pushes dist/ to the gh-pages branch.
# Use this only if the GitHub Actions workflow is unavailable.
#
# Prerequisites:
#   npm install          (installs gh-pages locally)
#   git remote set correctly to github.com/Amber1234568/JSportfolio
#
# Usage:
#   chmod +x scripts/deploy-ghpages.sh
#   ./scripts/deploy-ghpages.sh

set -euo pipefail

REPO="https://github.com/Amber1234568/JSportfolio.git"
BRANCH="gh-pages"

echo "→ Building..."
npm run build

echo "→ Deploying dist/ to branch '$BRANCH' on $REPO ..."
npx gh-pages \
  --dist dist \
  --branch "$BRANCH" \
  --dotfiles \
  --message "deploy: $(date -u '+%Y-%m-%d %H:%M UTC')"

echo ""
echo "✓ Done. GitHub Pages will update in ~30–60 seconds."
echo "  https://amber1234568.github.io/JSportfolio/"
echo ""
echo "  After first run: GitHub Settings → Pages → Source → Deploy from branch → gh-pages / root"
