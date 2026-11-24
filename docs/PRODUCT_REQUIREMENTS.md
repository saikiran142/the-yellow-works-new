# Product Requirements (Homepage MVP and beyond)

Priority: P0 = launch blocker, P1 = launch if time allows, P2 = later phase.

## Goal
Generate qualified enquiries from clinic, gym and real-estate owners. A clinic owner must understand what we do and how to contact us within five seconds.

## Principles that constrain every requirement
Build only what the phase needs · design quality is a launch gate · one signature moment per page · mobile-first on mid-range Android/4G · no invented testimonials, clients, stats or awards · unavailable features are labelled "Coming next" · every visual passes the fallback test (no WebGL, no JS, reduced motion).

## Homepage sections (Phase 2)
| # | Section | Pri | Key requirement |
|---|---|---|---|
| 1 | Navigation | P0 | Transparent over hero, Paper after scroll. Mobile full-screen Dusk sheet. CTA "Let's Build Your Website". |
| 2 | Hero | P0 | Headline + CTAs render at first paint. Lit-storefront scene (R3F, capability-gated) with AVIF still fallback. LCP is the headline or still, never the canvas. |
| 3 | Industry ticker | P1 | Tilted yellow band, static with reduced motion. |
| 4 | Problem and solution | P0 | 3 scenario tabs, before/after slider with keyboard + button controls, fictional business names. |
| 5 | Industries | P0 | Sticky stage on desktop; stacked panels on mobile. Mint, coral, cobalt tints. |
| 6 | Services | P0 | Bento grid, outcome-led copy, tiles expand to "what you get". |
| 7 | Showcase | P0 | Clinic/Gym/Real estate tabs, desktop/phone toggle, every preview labelled "Concept project". No heavy iframes. |
| 8 | Why us | P1 | One statement + asymmetric six-point list. No card grid. |
| 9 | Process | P1 | Discover, Design, Develop, Launch and Grow. Numbered markers allowed (real sequence). |
| 10 | Future vision | P1 | Pipeline with travelling lead token. Every unbuilt capability labelled "Coming next". |
| 11 | FAQ | P0 | Accessible accordion. Timelines and prices are placeholders until confirmed. |
| 12 | Contact | P0 | Form: name, business name, business type chips, city, phone, message. Zod validated server-side. WhatsApp prefilled generic message. Consent line. Success = lights-on state. |
| 13 | Footer | P0 | Dusk, oversized wordmark, legal links, socials only if configured. |
| 14 | 404 | P1 | Storefront with lights off, "This page has closed shop." |

## Non-functional requirements
- LCP ≤ 2.5 s (lab goal 2.0 s, mid-range Android, throttled 4G), INP ≤ 200 ms, CLS ≤ 0.1.
- First-load JS ≈ 170 KB gzipped or less, excluding lazy 3D chunk. Hero 3D payload ≤ 1.5 MB, loaded after LCP on capable devices only. Mobile loop ≤ 600 KB.
- Lighthouse mobile: Performance 90+, A11y/Best Practices/SEO 95+.
- WCAG 2.2 AA: keyboard, visible focus not hidden by sticky header, 24 px targets, drag alternatives, reduced motion.
- SEO: server-rendered content, en-IN, metadata, sitemap, robots, Organization schema only (no invented LocalBusiness data).
- Privacy: DPDP Act 2023 aligned notice and consent; professional review before launch.

## Out of scope until approved
CRM, per-industry demo sites, website builder, AI features, blog, pricing numbers, any invented contact details.

## Open inputs needed
See DECISIONS.md, "Needs your input".
