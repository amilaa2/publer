# Publer — Unified Social Media Platform

React 18 + Vite demo frontend for unified inbox, post scheduling, AI captions, best-time analytics, and posts management. All data runs in **demo mode** (`VITE_DEMO_MODE=true`) with clear API integration points for backend swap.

## Quick start (local)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Default route redirects to `/inbox`.

## Deploy on Vercel

This project is configured for Vercel out of the box (`vercel.json` includes SPA routing for React Router).

### Option A — GitHub (recommended)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel should auto-detect **Vite** with:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add **Environment Variables** (Project → Settings → Environment Variables):

   | Name | Value | Environments |
   |------|--------|----------------|
   | `VITE_DEMO_MODE` | `true` | Production, Preview, Development |
   | `VITE_API_BASE_URL` | `https://your-api.example.com` | Production (optional; only if you connect a real API later) |

5. Click **Deploy**. Direct links like `/inbox`, `/compose`, and `/analytics/best-times` work after deploy thanks to the rewrite rules in `vercel.json`.

### Option B — Vercel CLI

```bash
npm install -g vercel
cd publer
vercel login
vercel
```

Follow the prompts. For production:

```bash
vercel --prod
```

Set env vars in the dashboard or via CLI:

```bash
vercel env add VITE_DEMO_MODE production
# Enter: true
```

### Local production preview

```bash
npm run build
npm run preview
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_DEMO_MODE` | `true` (default for deploy) uses demo data; `false` calls `VITE_API_BASE_URL` |
| `VITE_API_BASE_URL` | Backend base URL when demo mode is off |

Copy `.env.example` to `.env` for local development. **Do not commit `.env`** — configure secrets in Vercel instead.

## Routes

| Path | Page |
|------|------|
| `/inbox` | Unified inbox |
| `/compose` | New post composer + AI captions |
| `/schedule` | Calendar (month / week / day) |
| `/posts` | All posts grid/list |
| `/analytics/best-times` | Best time to post |
| `/settings` | Connected accounts |
| `/login` | Login (no shell) |

## Tech stack

- React Router v6, Zustand, Tailwind CSS + CSS variables
- Recharts (analytics), date-fns, Axios (API layer)
- Demo data in `src/demo/` — swap via `src/hooks/useDemoMode.js`

## Legacy

The original standalone `UnifiedInbox/UnifiedInbox.jsx` prototype is preserved for reference; the app lives under `src/`.
