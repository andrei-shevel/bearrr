#!/usr/bin/env bash
set -euo pipefail
source .env

echo "==> Deploying to $HOST..."

ssh $HOST "$(cat <<ENDSSH
  set -e

  # ── Pull latest code ─────────────────────────────────────────────────────
  sudo -u $RUN_USER git -C $REMOTE pull

  # ── nginx config (requires root) ─────────────────────────────────────────
  cp $REMOTE/nginx.conf /etc/nginx/sites-available/bearrr.io
  ln -sf /etc/nginx/sites-available/bearrr.io /etc/nginx/sites-enabled/bearrr.io
  rm -f /etc/nginx/sites-enabled/default
  nginx -t
  systemctl reload nginx

  # ── Build & run (Docker Compose) ─────────────────────────────────────────
  cd $REMOTE && docker compose up -d --build

  echo "Done."
ENDSSH
)"
