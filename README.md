# bearrr.io

Personal site for [Andrei Shevel](https://bearrr.io).

**Live:** [bearrr.io](https://bearrr.io)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, standalone output)
- React 19, TypeScript, Tailwind CSS v4
- Self-hosted on a Debian VPS with nginx + Docker Compose

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable   | Description                                                                       |
| ---------- | --------------------------------------------------------------------------------- |
| `HOST`     | SSH target, e.g. `root@1.2.3.4`                                                   |
| `REMOTE`   | Deployment path on the server                                                     |
| `SITE_URL` | Public URL for OG metadata, sitemap, deploy                                       |
| `PORT`     | Host port mapped to the app (default `3000`). Match nginx `proxy_pass` on the VPS |
| `RUN_USER` | System user that owns the git checkout                                            |

## Deployment

The project deploys via `deploy.sh` — it SSHes into the VPS, pulls the latest code, reloads nginx, and runs `docker compose up -d --build`. nginx proxies to the container and handles HTTPS with Let's Encrypt.

```bash
./deploy.sh
```

For first-time VPS setup see [VPS.md](./VPS.md).

## License

MIT
