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

Copy `.env.example` to `.env` for local deploy config. Create a separate `.env` on the server at `$REMOTE` for Docker build/runtime values.

**Local `.env`** (used by `deploy.sh`):

| Variable   | Description                        |
| ---------- | ---------------------------------- |
| `HOST`     | SSH target, e.g. `root@1.2.3.4`    |
| `REMOTE`   | Deployment path on the server      |
| `RUN_USER` | System user that owns the checkout |

**Server `$REMOTE/.env`** (used by `docker compose up --build`):

| Variable            | Description                                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| `SITE_URL`          | Public URL for OG metadata, sitemap, and build                                     |
| `PORT`              | Host port mapped to the app (default `3000`). Match nginx `proxy_pass` on the VPS  |
| `ANTHROPIC_API_KEY` | Claude API key for the chat widget (`/api/chat`). Takes priority when both are set |
| `GROQ_API_KEY`      | Groq API key (free tier) — chat fallback provider when no Anthropic key is set     |

The chat widget needs at least one of the two keys; with neither, `/api/chat` returns 503 and the rest of the site works normally. For local development, put the key in `.env.local` (git-ignored) so `pnpm dev` picks it up.

## Deployment

The project deploys via `deploy.sh` — it SSHes into the VPS, pulls the latest code, reloads nginx, and runs `docker compose up -d --build`. nginx proxies to the container and handles HTTPS with Let's Encrypt.

```bash
./deploy.sh
```

For first-time VPS setup see [VPS.md](./VPS.md).

## License

MIT
