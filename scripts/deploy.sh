#!/usr/bin/env bash
# Language Bridge — deploy helper.
#
# Puente follows the mglearn pattern: its own repo (github.com/mglearn/puente)
# served directly by GitHub Pages at https://mglearn.github.io/puente/. The repo
# root IS the site — it's static, so there is no build step. "Deploy" = gate,
# commit, push. Pages serves from the main branch root.
#
# This folder auto-uses the mglearn GitHub account for identity + push auth
# (see ../README-git-accounts.md), so no per-repo credential setup is needed.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "▸ Running validators + smoke tests..."
npm run check

if [[ -n "$(git status --porcelain)" ]]; then
  MSG="${1:-Update Language Bridge}"
  echo "▸ Committing: $MSG"
  git add -A
  git commit -m "$MSG"
else
  echo "▸ Nothing to commit."
fi

echo "▸ Pushing to origin main..."
git push -u origin main

echo "✓ Deployed. Live in ~1 min at https://mglearn.github.io/puente/"
