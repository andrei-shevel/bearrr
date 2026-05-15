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
```

## 3. Install Node.js 24

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt-get install -y nodejs
node -v  # should print v24.x.x
```

## 4. Create the app user

```bash
useradd -m -s /bin/bash nextjs
```

## 5. Install pnpm & pm2 for the app user

```bash
su - nextjs

# configure a user-local npm prefix to avoid permission errors
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

npm install -g pnpm pm2
exit

# enable pm2 autostart on reboot (run the printed command as root)
sudo env PATH=$PATH:/home/nextjs/.npm-global/bin pm2 startup systemd -u nextjs --hp /home/nextjs
```

## 6. Install nginx & certbot

```bash
apt-get install -y nginx certbot python3-certbot-nginx
systemctl enable --now nginx
```

## 7. DNS

Point both records to your server IP before running certbot:

| Type | Name          | Value          |
|------|---------------|----------------|
| A    | bearrr.io     | YOUR_SERVER_IP |
| A    | www.bearrr.io | YOUR_SERVER_IP |

## 8. Generate SSH Key for the app user

```bash
su - nextjs
ssh-keygen -t ed25519 -C "bearrr-deploy" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
exit
```

Copy the printed public key and add it to GitHub:
**Settings → SSH and GPG keys → New SSH key**

## 9. Clone the Repository

```bash
sudo -u nextjs git clone git@github.com:andrei-shevel/bearrr.git /home/nextjs/bearrr
```

## 10. Obtain SSL Certificate

```bash
certbot --nginx -d bearrr.io -d www.bearrr.io \
  --non-interactive --agree-tos -m admin@bearrr.io \
  --redirect
```

Certbot auto-renews via a systemd timer — verify it:

```bash
systemctl status certbot.timer
```

## 11. First Deploy

Back on your local machine:

```bash
./deploy.sh
```

---

## Useful Commands

```bash
pm2 logs bearrr        # live logs
pm2 status             # process list
pm2 restart bearrr     # restart app
pm2 stop bearrr        # stop app
journalctl -u nginx    # nginx logs
nginx -t               # test nginx config
certbot renew --dry-run  # test cert renewal
