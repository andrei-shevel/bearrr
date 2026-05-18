# bearrr.io

Personal site for [Andrei Shevel](https://bearrr.io).

**Live:** [bearrr.io](https://bearrr.io)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, standalone output)
- React 19, TypeScript, Tailwind CSS v4
- Self-hosted on a Debian VPS with nginx + [pm2](https://pm2.keymetrics.io)

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable   | Description                      |
| ---------- | -------------------------------- |
| `HOST`     | SSH target, e.g. `root@1.2.3.4`  |
| `REMOTE`   | Deployment path on the server    |
| `APP`      | pm2 process name                 |
| `SITE_URL` | Public URL, used for OG metadata |
| `RUN_USER` | System user that runs the app    |
| `PORT`     | Port the Node server listens on  |

## Deployment

The project deploys via `deploy.sh` — it SSHes into the VPS, pulls the latest code, installs dependencies, builds, and reloads the pm2 process. nginx handles HTTPS via a Let's Encrypt certificate.

```bash
./deploy.sh
```

For first-time VPS setup see [VPS.md](./VPS.md).

## License

MIT
