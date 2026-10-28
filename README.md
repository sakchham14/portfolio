# Portfolio — Sakchham Maharjan

A personal portfolio website for **Sakchham Maharjan**, a CSIT student specializing in
Full-Stack Development, Network & System Administration, and Infrastructure Automation.

Built with **Next.js 16 (App Router)** + **TypeScript** + **Tailwind CSS v4**, and hosted
on a self-managed VPS behind Nginx via Docker Compose.

---

## How it works

### Architecture

```
sacam.duckdns.org
        │
        ▼
   Nginx (port 80)
        │
        ▼
   Docker container: portfolio:3000
        │
        ▼
   Next.js (standalone output) — Node 20, Alpine Linux
```

- **Nginx** (`nginx/default.conf`) is the entry point. It listens on port 80 and
  reverse-proxies to the `portfolio` container on port 3000.
- **Docker Compose** (`docker-compose.yml`) builds the image from the `Dockerfile` and
  runs it with a healthcheck, auto-restarting if it crashes.
- **Next.js** is built with `output: "standalone"` — a minimal runtime that only ships
  the rendered pages, not the whole toolchain.

### What's on the site

| Section | Where | What it does |
|---|---|---|
| Home | `src/app/page.tsx` | Hero, about, skills, projects — reads content from `src/data/content.ts` |
| Content data | `src/data/content.ts` | Single source of truth for profile, skills, and projects. Edit `portfolio-details.json` and regenerate, or edit the TS file directly. |
| Chrome Dino game | `src/app/game/page.tsx` | A browser-side runner. Scores are saved to the server. |
| High score API | `src/app/api/highscore/route.ts` | `GET` reads the high score; `POST` writes it. |
| High score store | `data/highscore.json` | The persistent high score. Written by the API, read by everyone. |

### The Chrome Dino game

A self-contained canvas-style runner built with React state and `requestAnimationFrame`.

- **Game loop** (`useEffect` on `game.running`) advances the dinosaur, spawns cactus/bird
  obstacles, and detects collisions via AABB intersection.
- **High score** is loaded on mount (`GET /api/highscore`) and saved when the player beats
  their best score (`POST /api/highscore`).
- **Score protection**: the `POST` endpoint requires the `x-game-key` header to match
  `NEXT_PUBLIC_GAME_KEY`, so visitors can't inflate the high score directly.

### Environment variables

Both are set at **build time** — Next.js inlines `NEXT_PUBLIC_*` values into the client
bundle, so a rebuild is required after changing them.

| Variable | Purpose | Set in |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID (e.g. `G-XXXXXXXXXX`) | `.env` + Docker build arg |
| `NEXT_PUBLIC_GAME_KEY` | Shared secret gating high-score writes | `.env` + Docker build arg |

See [`.env.example`](./.env.example) for the template.

### Routing

| Route | Type | Description |
|---|---|---|
| `/` | Static | Home page |
| `/game` | Static | Dino runner |
| `/api/highscore` | Dynamic | `GET` / `POST` high score |

---

## Getting Started

### Local development

```bash
npm install
cp .env.example .env   # and fill in NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GAME_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Update portfolio details

Edit [`portfolio-details.json`](./portfolio-details.json) — the site reads it through
`src/data/content.ts`. Keep the JSON valid; skill levels are numbers from 1 to 5, and
project entries retain their existing fields. Save and the dev server reloads.

### Docker / VPS deploy

```bash
cp .env.example .env
# fill in NEXT_PUBLIC_GA_ID and NEXT_PUBLIC_GAME_KEY
docker compose up -d --build
```

The image is rebuilt so the env values are baked in, then the container starts. The GA ID
and game key are compile-time constants — changing either one requires a rebuild.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Google Analytics for the web](https://developers.google.com/analytics/devguides/collection/ga4)