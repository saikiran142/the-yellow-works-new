# The Yellow Works website platform (Phase 5)

A client website is **data**: one typed config file rendered by shared components. Writing a new site means writing a config, not new components, styles or pages. The proof is `src/sites/brightpath.ts`, a complete fictional tuition-centre website made with no new component, style or page code.

## Where things live
| Path | What |
|---|---|
| `src/platform/types.ts` | The `SiteConfig` type: theme, nav, CTA, SEO, contact, and an ordered list of sections. The contract. |
| `src/platform/SiteRenderer.tsx` | Renders any config: concept banner, header, sections, footer, sticky mobile bar. |
| `src/platform/EnquiryForm.tsx` | The one enquiry form. Fields, wording and tag come from config. |
| `src/platform/use-enquiry-submit.ts` | The one submit flow (browser validation, focus on the first bad field, stable idempotency key, double-click guard, clear error messages). The three demo forms use it too. |
| `src/platform/compose.ts` | Builds the enquiry message from a template such as `Demo class request. Class: {class}. {note}`. |
| `src/platform/theme.ts` | Theme to CSS variables, plus contrast checks. |
| `src/platform/fonts.ts` | Curated font pairs (`friendly`, `athletic`, `modern`). Only the chosen pair's files load. |
| `src/platform/metadata.ts` | One function from config to Next.js metadata (title, description, canonical, Open Graph, robots). |
| `src/styles/platform.css` | One stylesheet for every config site. All colours, radii and fonts are CSS variables (`--t-*`, `--pf-*`). |
| `src/sites/index.ts` | The registry of sites. A site is served at `/sites/<slug>`. |
| `src/sites/sites.test.ts` | A linter that runs for every registered site (below). |

## Section types
`hero`, `band`, `cards` (services, plans, reasons), `profiles` (people, shown as initials), `steps`, `schedule`, `gallery`, `hours`, `faq`, `enquiry`. Each takes plain data. Cards can carry a sample price, perks, a featured badge and a button, so they cover service lists and pricing plans.

## Theming
A theme is 15 colours, a radius (`soft` or `sharp`) and a font pair. The same components produce visibly different sites. Client sites must **not** inherit The Yellow Works yellow.

## Guard rails (tests run on every registered site)
- Every text pairing in the theme meets WCAG AA (4.5:1).
- Unique slug and unique section ids; the nav and button links point at sections that exist.
- Exactly one hero, first; at least one enquiry section.
- The enquiry tag is `site-<slug>` and the message template only uses fields that exist.
- Contact details stay in square-bracket placeholders until the client confirms them.

## Standardised integrations
- **Enquiries.** Every site posts to `/api/enquiry` with its tag. The same origin check, spam trap, rate limit, validation, idempotency and delivery apply. The destination is `ENQUIRY_WEBHOOK_URL` (decision D-08: a Google Sheet via `docs/ENQUIRY_SETUP.md`). The tag tells the receiver which site an enquiry came from.
- **WhatsApp.** `src/lib/whatsapp.ts` builds a click-to-chat link only when a real number is configured.
- **Analytics.** Off by default (decision D-11).
- **Metadata.** `buildSiteMetadata`; sites are `noindex` until their config sets `seo.noindex: false`.

## What it deliberately does not do
- No visual page builder or no-code editor (not approved).
- No content management system: content changes are edits to the config and a redeploy.
- No per-site custom code path. If a client needs something the sections cannot do, add a new section type to the platform (with a test), rather than forking a site.
- No images yet: profiles use initials and galleries are placeholders. Photography handling (D-09) is still to be decided.

## Known limitations (honest)
- The three earlier demos (`/demos/clinic`, `/demos/gym`, `/demos/real-estate`) keep their own pages and stylesheets. Only their **forms** were moved onto the shared flow. Rebuilding them as configs would lose bespoke parts (the real-estate property pages, filterable listings, hero illustrations).
- A card grid with a count that does not divide the column count (for example 4 cards in 3 columns) leaves a gap; there is no column setting yet.
- Hero art is two floating cards only. Illustrations need a new section type.
- Per-site fonts are limited to three curated pairs.
- Rate limiting is per server instance (see `docs/TESTING.md`).
- Not tested on a real phone, with a screen reader, or in browsers other than Chrome.
