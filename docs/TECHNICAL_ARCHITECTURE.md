# Technical Architecture (proposal)

## Repository findings
- **github.com/saikiran142/yellow-works:** public, default branch `main`, one commit ("Initial commit", 2026-11-18), a single `README.md` containing only `# yellow-works`. No code, no dependencies, no history to preserve.
- **Local folder** `new-yellow-works/` (this workspace): empty.
- **Sibling folders** on disk under `Desktop/Bussiness/` (not part of the repo, not modified, not deeply reviewed — READMEs and package.json only):
  - `website-landing/` "LocalLift Studio": Next.js 16, React 19, Tailwind 4, TypeScript 6; agency landing + clinic/gym/real-estate demos; has its own planning docs. Different brand name.
  - `clinic-crm/`: npm-workspaces monorepo: NestJS API (multi-tenant, JWT + roles), Drizzle ORM with embedded PGlite, Next.js apps, shared `@acme/*` packages, 9 docs.
  - `theyellowworks/`: "Dental Growth CRM" MVP: Next.js, NestJS, Prisma, PostgreSQL, Docker.
  These are relevant prior art for Phases 4–7. See DECISIONS D-01 and D-02.

## Recommendation: start fresh (Next.js App Router)
Nothing to keep or migrate in the repo. Next.js gives server-rendered/static content for SEO, `next/font`, `next/image`, and first-class Vercel deploy. Reuse ideas from sibling projects selectively, with your approval; do not copy code wholesale (different brand, unknown quality, would pull in "template" structure we want to avoid).

## Stack
| Layer | Choice | Note |
|---|---|---|
| Framework | Next.js (current stable) + React + TypeScript strict | Confirm exact versions at scaffold time against npm; sibling project uses Next 16 / React 19 |
| Styling | Tailwind CSS v4 | Tokens as CSS variables, exposed via `@theme` |
| Motion | Motion for React; GSAP ScrollTrigger only where needed | |
| 3D | React Three Fiber + drei, hero only, `next/dynamic` ssr:false after LCP + idle | Fallback AVIF still |
| Forms | React Hook Form + Zod; same schema validated server-side | Honeypot + rate limit first |
| Icons | Lucide (interface only) | |
| Testing | Vitest (unit), Playwright (e2e, screenshots at 360/768/1280/1920 ± reduced motion), axe, Lighthouse CI | Added in Phase 2 when there is code |

## 3D loading strategy
Hero headline/still is LCP. Load canvas only when: WebGL2, no reduced-motion, no Save-Data, precise pointer or wide viewport, ≥4 cores/≥4 GB if reported. Reserve exact dimensions (no CLS). DPR cap 2, pause offscreen/hidden tab, dispose on unmount. GLB with Draco/Meshopt, KTX2 textures. Budget 1.5 MB.

## Enquiry pipeline (Phase 3, decision D-08)
Form → server route handler → Zod validate → spam checks → store/notify. Idempotency key per submission to avoid duplicates on retry. No PII in logs. Env vars for all config.

## CRM backend (decision D-02, Phase 6)
Option 1: Next.js route handlers + Postgres (Prisma/Drizzle). Fewer moving parts, one deploy. Option 2: separate Node service (Express, or NestJS as in your existing clinic-crm), with Postgres. Better for background jobs, reminders, webhooks, multi-tenant isolation tests. Lean: Option 2 once CRM begins; Option 1 is enough for Phase 3 enquiries. Not decided; Phase 6 gate.

## Initial structure
```
src/
  app/            page.tsx, services/, clinic-websites/, gym-websites/,
                  real-estate-websites/, about/, work/, contact/, not-found.tsx, api/enquiry/
  components/     layout/ sections/ ui/ forms/ motion/ three/
  config/         site.ts brand.ts navigation.ts industries.ts services.ts faq.ts
  lib/            seo.ts validation.ts analytics.ts utils.ts
  styles/         globals.css (tokens)
public/           images/ 3d/ icons/ brand/ fonts/
docs/
```
Business copy lives in `config/`, tokens in one place, no hard-coded colours or durations in components.

## Security and privacy
Server-side validation, rate limiting, honeypot, secrets in env only, no secrets committed. DPDP Act 2023: per research the Rules were notified 13 Nov 2025 with staged enforcement; the notice/consent duties are reported to start around 13–14 May 2027 (sources differ; verify against the gazette). Build consent notice from day one regardless; legal review before launch.

## Risks
1. 3D budget vs mid-range Android (mitigated by gate + still).
2. Asset production (3D, photography) is the critical path and needs an owner and budget.
3. Logo conflict check may eliminate a route.
4. Font licensing (Clash/Satoshi).
5. Scope creep into CRM before homepage ships.
6. Placeholders (WhatsApp, city) block Phase 3 and local SEO.

## As built in Phase 2 (2026-11-23)
- Next.js 16.4.6 (webpack), React 19.3.1, TypeScript 6, Tailwind 4.3.5 with `src/styles/tokens.css`, `lucide-react` (interface icons), `three` and `@react-three/fiber` (hero only, lazy). Vitest for unit tests. TypeScript 7 exists on npm but was not used (Next 16.4 and the prior project run on 6).
- Pages: `/` (11 sections), `/privacy` (placeholder), `not-found`. Business copy in `src/config/content.ts`; facts and placeholders in `src/config/site.ts`, fed from env vars.
- Styling: the approved design CSS is ported as `src/styles/site.css` (class names match the design) rather than rewritten as Tailwind utilities. Tailwind is installed and the tokens map to it, but few utilities are used. This was chosen for fidelity and speed; migrating to utilities is optional later.
- Hero 3D: `HeroStage` always renders the SVG cube and panels; on capable devices, after load and idle, it lazy-loads `Hero3D` (R3F canvas, DPR capped at 2, loop paused offscreen and in hidden tabs, tilt toward cursor) and fades the SVG out. Gate in `src/lib/capability.ts` (tested). The 3D object is procedural geometry, so there is no GLB or texture download.
- Deviation: the fallback is the SVG cube plus HTML panels, not a pre-rendered AVIF still.
- Not added on purpose: React Hook Form, Zod, Motion, GSAP (no need yet; form validation is plain functions mirrored by the Phase 3 server schema).
- Project sits inside a OneDrive folder, so `node_modules` and `.next` will sync. Consider moving the project out of OneDrive.
