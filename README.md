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
