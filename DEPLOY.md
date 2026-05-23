# Deploy to Vercel

## Required dashboard settings

In [Vercel Project Settings](https://vercel.com/docs/projects/overview#project-settings) → **General**:

| Setting | Value |
|---------|--------|
| Framework Preset | **Other** (or leave blank — `vercel.json` controls the build) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js Version | **20.x** or **22.x** |

Do **not** set Build Command to `vite build` alone.

## Environment variables (optional)

| Name | Value |
|------|--------|
| `VITE_DEMO_MODE` | `true` |

Already set in `.env.production` for production builds.

## Push and deploy

```bash
git add .
git commit -m "Harden Vercel production deploy"
git push
```

Vercel redeploys automatically on push to `main`.

## Verify after deploy

Open these URLs on your `*.vercel.app` domain:

- `/` → redirects to inbox
- `/inbox`
- `/compose`
- `/campaigns`
- `/analytics/competitors`

If a route shows 404, check that `vercel.json` is at the repo root and was pushed.

## Local production test

```bash
npm run build
npm run preview
```

Open http://localhost:4173
