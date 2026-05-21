# VPS Setup Guide

One-time setup for a fresh Debian 12+ VPS.

## 1. SSH Access

On your local machine, copy your public key to the server:

```bash
ssh-copy-id root@YOUR_SERVER_IP
```

Optionally add an alias to `~/.ssh/config`:

```
Host bearrr
    HostName YOUR_SERVER_IP
    User root
    IdentityFile ~/.ssh/id_ed25519
```

## 2. Connect & Update

```bash
ssh root@YOUR_SERVER_IP
apt update && apt upgrade -y
apt install -y git ca-certificates curl
```

## 3. Install Docker Engine and Compose

Follow [Install Docker Engine on Debian](https://docs.docker.com/engine/install/debian/) on the VPS (root shell). Use Docker’s `apt` repository and install **`docker-ce`**, **`docker-ce-cli`**, **`containerd.io`**, **`docker-buildx-plugin`**, and **`docker-compose-plugin`** so you have both the Engine and **`docker compose`** (Compose v2). Enable the `docker` service with systemd if the doc’s install does not already. Confirm `docker` and `docker compose` work before continuing.

## 4. Create the app user

```bash
useradd -m -s /bin/bash nextjs
```

## 5. Install nginx & certbot

```bash
apt-get install -y nginx certbot python3-certbot-nginx
systemctl enable --now nginx
```

## 6. DNS

Point both records to your server IP before running certbot:

| Type | Name          | Value          |
| ---- | ------------- | -------------- |
| A    | bearrr.io     | YOUR_SERVER_IP |
| A    | www.bearrr.io | YOUR_SERVER_IP |

## 7. Generate SSH Key for the app user

```bash
su - nextjs
ssh-keygen -t ed25519 -C "bearrr-deploy" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
exit
```

Copy the printed public key and add it to GitHub:
**Settings → SSH and GPG keys → New SSH key**

## 8. Clone the Repository

```bash
sudo -u nextjs git clone git@github.com:andrei-shevel/bearrr.git /home/nextjs/bearrr
```

## 9. Obtain SSL Certificate

```bash
certbot --nginx -d bearrr.io -d www.bearrr.io \
  --non-interactive --agree-tos -m sendtoshevvy@gmail.com \
  --redirect
```

Certbot auto-renews via a systemd timer — verify it:

```bash
systemctl status certbot.timer
```

## 10. First Deploy

On your local machine, set `HOST`, `REMOTE`, and `RUN_USER` in `.env` (see `.env.example`). On the server, create `$REMOTE/.env` with `SITE_URL`, `PORT`, and any `NEXT_PUBLIC_*` vars, then:

```bash
./deploy.sh
```

`deploy.sh` pulls on the server, reloads nginx, and runs `docker compose up -d --build` in `REMOTE`.

---

## Useful Commands

```bash
# On the VPS (as root), from the app directory:
sudo -u nextjs -s
cd /home/nextjs/bearrr

docker compose ps
docker compose logs -f web
docker compose restart web
docker compose down    # stop stack; data in DB volumes (if any) is separate

journalctl -u nginx    # nginx logs
nginx -t               # test nginx config
certbot renew --dry-run  # test cert renewal
```

If the `nextjs` user should run Docker without `sudo`, add them to the `docker` group (`usermod -aG docker nextjs`), log out and back in, and use `docker compose` as that user. The default `deploy.sh` path runs Compose as root over SSH, which does not require the group.
