# FHK Stock

*For His Kingdom.* Stock photography for churches and ministries: a Next.js App Router marketplace, installable as a PWA.

## What is included

- `apps/web`: App Router frontend with public, buyer, contributor, and admin route surfaces
- `apps/api`: placeholder for the domain API and webhook layer
- `apps/workers`: placeholder for upload processing, derivatives, and indexing jobs
- `packages/ui`: placeholder for shared components

## Production decisions captured in this scaffold

- Public marketing pages are separated from protected routes so SSR and caching policy can differ by surface.
- Asset detail pages are positioned as hybrid pages: public metadata and JSON-LD on the page, dynamic entitlement UI later.
- Search is treated as a dynamic or client-driven surface rather than an SEO target for every query combination.
- Middleware demonstrates route protection boundaries, while session mutation should stay in route handlers or server actions.
- Uploads, payment webhooks, Connect onboarding, signed downloads, and processing jobs are intentionally left to the API and worker layers.

## Recommended next steps

1. Install dependencies with `pnpm install`.
2. Implement auth and role-aware session handling.
3. Add API contracts for search, checkout, uploads, downloads, and moderation.
4. Add worker contracts for derivatives, watermarking, and indexing.
5. Add CI, secrets management, IaC, audit logging, and observability before any launch.

## Visual direction

The initial UI uses a warm editorial palette and high-contrast serif display typography rather than default SaaS styling. This answers the request for a vogue-like feel while still keeping the codebase practical and easy to extend.

## Client page editor (self-edit pilot)

`/edit` opens a drag-and-drop editor for the homepage, built on [Puck](https://puckeditor.com) (MIT, self-hosted, no per-seat fees). Clients click text on the page to type over it, swap photos from the library or upload their own, drag sections in from the left, reorder or delete them, preview phone/tablet/desktop, and hit Publish.

- Sections live in `apps/web/lib/editor/blocks.tsx` and reuse the site's own markup, so an edited page looks identical to the hand-built one. `lib/editor/config.tsx` decides which fields a client can touch.
- Published pages are saved to Vercel Blob as timestamped JSON (`pages/home/<ms>.json`), so every publish is a restorable version. Locally they go to `apps/web/.content/`.
- Env: `BLOB_READ_WRITE_TOKEN` (added automatically when a Blob store is connected to the Vercel project) and `EDITOR_PASSCODE` (falls back to `fhk-demo`).
