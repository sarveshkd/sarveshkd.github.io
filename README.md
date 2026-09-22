# Sarvesh Kurhade — Cloud & ServiceNow Portfolio

A cinematic personal portfolio for Sarvesh Kurhade. The page keeps the cloud, ServiceNow, and applied-AI story, and presents it with a draggable 360° hero, scroll-driven chapters, and a recruiter-readable stack.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Scripts

- `npm run dev` — start the Next.js dev server
- `npm run build` — write the static site to `out/`
- `npm run lint` — lint the project

## GitHub Pages

The site is a static export, meant for a user site at `https://<username>.github.io`.

Pushing `main` to a repository named `<username>.github.io` runs `.github/workflows/pages.yml`, which publishes the `out/` folder. In that repository, set Settings → Pages → Source to GitHub Actions.

## Stack

Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, GSAP, Lenis, and Three.js (React Three Fiber). If WebGL is unavailable, the hero falls back to a CSS orbit you can still drag.
