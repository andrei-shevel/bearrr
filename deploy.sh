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

  # ── Build & restart as $RUN_USER ─────────────────────────────────────────
  sudo -u $RUN_USER env \
    PATH="/home/$RUN_USER/.npm-global/bin:/usr/local/bin:/usr/bin:/bin" \
    SITE_URL="$SITE_URL" \
    PORT="$PORT" \
    bash -c '
      set -e
      cd $REMOTE
      pnpm install --frozen-lockfile
      pnpm run build
      cp -r .next/static .next/standalone/.next/static
      cp -r public .next/standalone/public
      if pm2 describe $APP > /dev/null 2>&1; then
        pm2 reload $APP
      else
        pm2 start node --name $APP -- .next/standalone/server.js
        pm2 save
      fi
    '

  echo "Done."
ENDSSH
)"
