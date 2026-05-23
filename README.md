# Publer — Unified Social Media Platform

React 18 + Vite demo frontend for unified inbox, post scheduling, AI captions, best-time analytics, and posts management. All data runs in **demo mode** (`VITE_DEMO_MODE=true`) with clear API integration points for backend swap.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Default route redirects to `/inbox`.

## Environment

Copy `.env.example` to `.env`:

- `VITE_API_BASE_URL` — backend base URL (default `http://localhost:8000`)
- `VITE_DEMO_MODE` — set to `false` to call real APIs (requires backend)

## Routes

| Path | Page |
|------|------|
| `/inbox` | Unified inbox |
| `/compose` | New post composer + AI captions |
| `/schedule` | Calendar (month view) |
| `/posts` | All posts grid/list |
| `/analytics/best-times` | Best time to post |
| `/settings` | Connected accounts |
| `/login` | Login (no shell) |

## Tech stack

- React Router v6, Zustand, Tailwind CSS + CSS variables
- Recharts (analytics), date-fns, Axios (API layer)
- Demo data in `src/demo/` — swap via hooks in `src/hooks/useDemoMode.js`

## Legacy

The original standalone `UnifiedInbox/UnifiedInbox.jsx` prototype is preserved for reference; the app lives under `src/`.
