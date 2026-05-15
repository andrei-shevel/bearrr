#!/usr/bin/env bash
set -euo pipefail
source .env

echo "==> Deploying to $HOST..."

ssh $HOST "
  set -e

  # ── Pull latest code (as root, repo is owned by $RUN_USER) ───────────────
  cd $REMOTE
  sudo -u $RUN_USER git pull

  # ── nginx config (requires root) ─────────────────────────────────────────
  cp $REMOTE/nginx.conf /etc/nginx/sites-available/bearrr.io
  ln -sf /etc/nginx/sites-available/bearrr.io /etc/nginx/sites-enabled/bearrr.io
  rm -f /etc/nginx/sites-enabled/default
  nginx -t
  systemctl reload nginx

  # ── Build & restart as $RUN_USER ─────────────────────────────────────────
  sudo -u $RUN_USER bash -c '
    set -e
    cd $REMOTE
    pnpm install --frozen-lockfile
    pnpm run build
    if pm2 describe $APP &>/dev/null; then
      pm2 reload $APP
    else
      PORT=$PORT pm2 start node --name $APP -- .next/standalone/server.js
      pm2 save
    fi
  '

  echo 'Done.'
"
