#!/bin/zsh
# ship.command — double-click to build + deploy showbusiness.actor.
# NOTE: Cloudflare's git-CI hook for this repo has been dead since Jul 2026
# (pushes fire no builds). This script is the reliable deploy path until the
# hook is reconnected. Same pattern as michaelcbouchard-site/ship.command.
cd "$(dirname "$0")"

echo "Building client (vite)..."
npx vite build
status=$?
if [ $status -ne 0 ]; then
  echo "❌ Build failed (exit $status). Scroll up for the error."
  [ -t 0 ] && read -k 1 "?Press any key to close..."
  exit 1
fi

echo
echo "Deploying dist/public to Cloudflare Pages..."
NODE_ENV= npx wrangler pages deploy dist/public \
  --project-name showbusiness-contracts \
  --branch main \
  --commit-dirty=true
status=$?
echo
if [ $status -eq 0 ]; then
  echo "✅ Shipped. Give it ~30 seconds, then hard-refresh the site."
else
  echo "❌ Deploy failed (exit $status). Scroll up for the error."
fi
[ -t 0 ] && read -k 1 "?Press any key to close..."
exit $status