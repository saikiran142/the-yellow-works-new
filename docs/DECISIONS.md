# Decisions

Status: Proposed = my recommendation, needs your approval. Open = needs your input.

| ID | Decision | Recommendation | Status |
|---|---|---|---|
| D-01 | Repository | **Start fresh** with Next.js in the empty repo. Nothing to migrate. | **Approved 2026-11-23** |
| D-02 | CRM backend | Defer to Phase 6. Leaning separate Node service + Postgres; Next route handlers suffice for Phase 3 enquiries. Your existing `clinic-crm` NestJS/Drizzle work is prior art to evaluate then. | **Approved 2026-11-23** |
| D-03 | Art direction | **A. Lights on** (re-confirmed after style frames, 2026-11-23) | **Approved 2026-11-23** |
| D-04 | Logo route | ~~Route 1 awning monogram~~ Superseded: owner rejected routes 1–5, then shop-themed and studio rounds. **Chosen: Cube Y, seams of light, A2 Broad** (2026-11-23). See BRAND_GUIDELINES. | **Decided 2026-11-23** |
| D-05 | Typography | **A. Bricolage Grotesque + DM Sans** (open licence, self-hostable). Re-confirmed after the comparison. | **Approved 2026-11-23** |
| D-06 | Hero 3D | **React Three Fiber** for runtime, pre-rendered AVIF still for fallback/mobile. Spline only for prototyping. | **Approved 2026-11-23** |
| D-07 | 3D asset producer | Open: me (concepts/code-built geometry), freelancer, or AI-generated and refined. Need budget. | Open |
| D-08 | Enquiry destination | **Decided 2026-11-23 (owner delegated the choice): a Google Sheet plus an email notification, via an Apps Script web app.** Script and steps in `docs/ENQUIRY_SETUP.md`. Not yet deployed; needs the owner's Google account. | Decided, setup pending (owner) |
| D-09 | Photography | Open: commissioned vs licensed stock. Suggest licensed stock for launch, commissioned later. | Open |
| D-10 | Pricing on site | Open: "starting from" INR vs quote only. Suggest quote-only at launch. | Open |
| D-11 | Analytics + consent | **Decided 2026-11-23 (owner delegated the choice): none at launch.** The consent notice and Plausible adapter stay built but dormant. Enquiries in the sheet are the measure of success for the first weeks; revisit after a month. No banner, no cookies, simpler privacy position. | Decided |
| D-12 | Contact data | **Partly answered 2026-11-23:** WhatsApp number and city (Hyderabad) supplied; address to follow. Number and city live in `.env.local` and Vercel env vars, not in code or docs. Address not published, so no LocalBusiness structured data yet (Organization data includes the phone and Hyderabad as area served). | Partly open (address) |
| D-13 | Sibling projects | Open: may I review `website-landing` (LocalLift Studio), `clinic-crm` and `theyellowworks` in depth for reusable ideas? Not modified so far. | Open |
| D-14 | Design tooling | Open: Figma available via connector; use it for Phase 1 style frames, or build frames in HTML? | Open |

| D-15 | Logo conflict checks | **Not done.** I cannot run IP India's trademark search or a reverse image search from here. **Owner is running them** (agreed 2026-11-23) on the mark and the name before print, signage or filing. Record results here. | Open, owner |
| D-16 | Hero object | The cube is also the planned hero 3D object. Confirm this replaces the "lit storefront" idea, or whether the storefront stays in the hero with the cube as the logo only. | Open |

| D-17 | Platform shape | **Sites are typed config rendered by shared components, served at `/sites/<slug>`; no page builder, no CMS.** The three earlier demos keep their bespoke pages; only their forms moved onto the shared flow. Rebuilding them as configs is optional and would lose bespoke parts. | Decided 2026-11-23 (my recommendation, owner approved Phase 5) |

## Provisional defaults (D-07 to D-14)
You approved "all" without answering these, so I am proceeding on my stated suggestions. Say so if any is wrong.
- D-07: I build concept and code-built 3D; budget and any freelancer still unanswered (needed before final 3D, late Phase 1).
- D-08: DB + email notification. D-09: licensed stock at launch. D-10: quote-only. D-11: privacy-friendly analytics after consent.
- D-12: still placeholders; blocks Phase 3, not Phase 1.
- D-13: no deep review of sibling projects until asked. D-14: Phase 1 frames built as HTML in `design/phase1/` (no Figma file exists yet).
