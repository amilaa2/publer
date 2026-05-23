# Deploy to Vercel

## Required dashboard settings

In [Vercel Project Settings](https://vercel.com/docs/projects/overview#project-settings) → **Build & Deployment**:

| Setting | Value |
|---------|--------|
| **Root Directory** | *(leave empty — repo root)* |
| **Framework Preset** | **Other** *(not Vite — `vercel.json` controls the build)* |
| **Build Command** | *(leave empty — uses `vercel.json` → `npm run build`)* |
| **Output Directory** | *(leave empty — uses `vercel.json` → `dist`)* |
| **Install Command** | *(leave empty — uses `vercel.json` → `npm ci`)* |
| **Node.js Version** | **20.x** or **22.x** |

If any of Build Command / Output Directory are **overridden** in the dashboard, either clear the override or set them to `npm run build` and `dist` exactly.

## Fix: "No Output Directory named dist found"

This error means Vercel did not find a `dist` folder after the build step. Common causes:

1. **Framework Preset is "Vite"** while `vercel.json` expects a plain `dist` folder — switch preset to **Other** and redeploy.
2. **Root Directory** points to a subfolder — clear it so the build runs at the repo root (where `package.json` lives).
3. **Build failed** before writing output — open the deploy log and look for errors above the "No Output Directory" line.
4. **Stale cache** — redeploy with **Clear build cache** enabled.

After pushing the latest code, the build script logs `[vercel-build] cwd:` and `[verify-dist] OK` so you can confirm `dist` was created.

## Environment variables (optional)

| Name | Value |
|------|--------|
| `VITE_DEMO_MODE` | `true` |

Already set in `.env.production` for production builds.

## Push and deploy

```bash
git add .
git commit -m "Fix Vercel dist output and harden production build"
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
npm ci
npm run build
npm run preview
```

Open http://localhost:4173
