# Testing

Last run 2026-11-23 on the Phase 3 build. Never read a line here as passing unless it names what was run.

## Automated (run)
| Check | Command | Result |
|---|---|---|
| TypeScript | `npm run typecheck` | Clean |
| Lint | `npm run lint` | Clean |
| Unit tests | `npm test` (Vitest) | 31 passed: capability gate (8), WhatsApp link (3), validation (6), enquiry handler and delivery (14: origin, honeypot, rate limit, validation, idempotency, concurrent duplicate, failures retry, no destination, bad input, no PII in errors) |
| Production build | `npm run build` (Next 16.4.6, webpack) | Compiled; `/`, `/privacy`, `/_not-found` prerendered static |

## Browser checks (run, Chrome headless via `scripts/shoot.mjs`, CDP)
- Widths 360, 768, 1280, 1920, each with reduced motion off and on: **no horizontal overflow, no console errors**. Canvas present with motion allowed, absent with reduced motion.
- Industries section (`scripts/industries-check.mjs`, 1280 px): tint switches mint, coral, cobalt as sections scroll; the stage pins and releases at the end.
- Screenshots in `qa/` (local, ignored by git). I viewed the first screen at 1280 and 360 px with 3D on. I did **not** view the full-page captures section by section at 768 and 1920, nor the reduced-motion captures.

## Lighthouse 12.8 (mobile preset, simulated slow 4G, local production server, run twice)
Performance 95, Accessibility 100, Best Practices 100, SEO 66. LCP 2.7 s, CLS 0.002, TBT 70 to 100 ms.
- SEO 66 is the single failing audit `is-crawlable`: the site sets `noindex` on purpose until launch. Remove it in Phase 3.
- LCP is the hero `<h1>`. 2.7 s is over the 2.5 s budget (lab goal 2.0 s). Cause: the render-blocking stylesheet plus the display-font fetch. A static two-weight font lowered file size but pushed CLS to 0.18, so it was reverted.

## Not run
- Real mid-range Android phone on 4G; INP; field LCP (no real users).
- Screen-reader and full keyboard walkthrough (the page was only scanned by Lighthouse's automated axe checks).
- Cross-browser (only Chrome).
- Any test of form delivery (not built, Phase 3).
- Playwright suite and CI: not set up; checks above are scripts.

## Phase 3 additions (run)
- **Enquiry API over real HTTP** (production server, mock webhook): a valid post was delivered once; the same key retried returned the first result with no second delivery; an invalid phone gave 422 with a fix message; the honeypot returned 200 without delivering; a foreign Origin gave 403; GET gave 405; the sixth request in the window gave 429; the webhook received the normalised phone, the idempotency header and the bearer secret; the server log contained no name or phone.
- **Real browser form check** (`scripts/form-check.mjs`): an empty submit shows both field errors and focuses the name field with `aria-invalid`; picking Gym recolours the accent to coral; a valid submit shows the success state; a double click delivered once. An earlier run delivered twice, a race that is now fixed on both client and server and covered by a test.
- `robots.txt` disallows everything and the page carries `noindex` until `NEXT_PUBLIC_ALLOW_INDEXING=true`; `sitemap.xml` returns 200.
- Consent banner: written so nothing loads unless analytics is configured and the visitor accepts. **Not exercised in a browser** (no analytics configured here), so the Accept, Decline and persistence paths are untested.
- Lighthouse mobile during Phase 3 work: Performance 94 and 85 across two runs (TBT noise of 90 to 360 ms), Accessibility 100, Best Practices 100, SEO 69 (the same deliberate `is-crawlable`), LCP 2.9 to 3.1 s. That run included a stylesheet-inlining experiment which did not help; it was reverted and the build rechecked, but Lighthouse was **not re-run on the final build**. Treat LCP as roughly 2.7 s (the Phase 2 measurement) and over budget until measured on a real device.

## Still not run
Real phone on 4G, INP, screen reader, cross-browser, a live-domain submission, consent banner paths, shared-store rate limiting.

## Phase 4, clinic demo (run, 2026-11-23)
- Typecheck, lint, 32 unit tests (one added for the allow-listed demo source) and the production build pass.
- Browser (`scripts/shoot.mjs`) at 360, 768, 1280 and 1920 px with reduced motion on and off: no horizontal overflow, no console errors. I viewed the 1280 px top, middle and lower thirds and the 360 px top and lower parts. I did not view the 768 and 1920 px captures.
- Real-browser form check (`scripts/form-check.mjs http://127.0.0.1:3100/demos/clinic "#book"`): an empty submit shows both errors and focuses the name field; a valid submit shows the success state; a double click delivered once.
- Lighthouse mobile, final build: Performance 96, Accessibility 100, Best Practices 100, SEO 66 (deliberate `noindex`). LCP 2.4 to 2.7 s across runs (budget 2.5 s, so on the line), CLS 0, TBT 80 ms. Earlier runs found three accessibility issues, fixed and re-measured: white text on a mid-teal avatar (3.89:1, now 6.01:1), a link name that did not contain its visible text, and links in running text distinguished by colour only.
- Bugs found and fixed while reviewing: demo class names collided with the agency site's CSS (header text invisible); tag-qualified selectors were missed by the rename (`p.lead`, `textarea.input`); a build failed once with EPERM because a running server held `.next` (clear `.next` after stopping the server).

Not run: real phone, screen reader, keyboard walkthrough, other browsers, the 768 and 1920 px captures by eye.

## Decisions D-08, D-11, D-12 applied (run, 2026-11-23)
- Production build with the real number and city: every WhatsApp link points to the number in international form with the generic prefilled message; the number displays in the contact section and footer; the page description says "in Hyderabad"; Organization data carries the telephone; no `[WHATSAPP_NUMBER]` placeholder is left on the home page. The city field shows "Your city" as its placeholder (not a prefilled value).
- Receiver script logic (`node scripts/test-apps-script.mjs`): 8 of 8 pass against mocked Google services (wrong key, no secret, bad JSON, bad id, one row and one email, no duplicate on repeat, formula neutralised, email failure still saves).
- API to a receiver that answers 302 then 200 (how Apps Script behaves), with `?key=` in the URL: delivered once and the key reached the receiver.
- **Not run:** the script on Google itself, a real WhatsApp click on a phone, delivery to a real sheet, the email notification. These depend on the owner's Google account.

## Phase 4, gym demo (run, 2026-11-23)
- Typecheck, lint and 32 unit tests pass; production build passes.
- Browser (`scripts/shoot.mjs`) at 360, 768, 1280 and 1920 px, reduced motion on and off: no horizontal overflow, no console errors. I viewed the 1280 px top, middle and lower thirds and the 360 px top and middle; I did not view the 768 and 1920 px captures, or the 360 px lower section.
- Real-browser form check (`scripts/form-check.mjs http://127.0.0.1:3100/demos/gym "#trial"`): empty submit shows both errors and focuses the name field; a valid submit shows the success state; a double click delivered once.
- Colour contrast checked by script for the demo's pairings (lowest 7.64:1).
- Lighthouse mobile: Accessibility 100 and Best Practices 100 on every run, SEO 66 (deliberate `noindex`), CLS about 0. **Performance 88 to 95 and LCP 2.8 to 2.9 s across four runs, over the 2.5 s budget.** The variation between runs is mostly total blocking time and looks like machine noise. Dropping unused font weights (to three font files) did not improve LCP. The LCP element is the large display headline; the likely cause is the same font-loading path seen on the agency page. Not yet fixed.

Not run: real phone, screen reader, keyboard walkthrough, other browsers.

## Phase 4, real-estate demo (run, 2026-11-23)
- Typecheck, lint, 32 unit tests and the production build pass. The four property pages are statically generated; an unknown property id returns 404.
- Browser (`scripts/shoot.mjs`) on the home page at 360, 768, 1280 and 1920 px and on a property page at 360 and 1280 px, reduced motion on and off: no horizontal overflow, no console errors. I viewed the home page at 1280 px (top, middle) and 360 px (top), and the property page at 1280 and 360 px (top). I did not view the 768 and 1920 px captures, the lower parts of the 360 px pages, or the reduced-motion captures.
- Filter chips (`scripts/realty-filter-check.mjs`, real browser): All shows 4, Apartments 2, Villas 1, Plots 1, back to All 4; the count line and `aria-pressed` follow.
- Forms (`scripts/form-check.mjs ... "#visit"`), home and property page: an empty submit shows both errors and focuses the name field; a valid submit shows the success state; two submits with double clicks produced exactly two deliveries.
- Colour contrast checked by script (lowest pair 6.54:1, the error colour).
- Lighthouse mobile: Accessibility 100 and Best Practices 100; SEO 66 (deliberate `noindex`). Property page: Performance 96, LCP 2.7 s, CLS 0.001. Home page: Performance 91 to 92 and **LCP 3.0 to 3.2 s (over the 2.5 s budget)**. The home page first measured CLS 0.17 because the hero cards shifted when the web fonts swapped in; switching this demo's fonts to `display: optional` brought CLS to 0. **Trade-off:** with `optional`, a visitor on a slow first load may see the fallback font for that visit instead of a swap. Two earlier accessibility findings (link names not containing their visible text) were fixed.

Not run: real phone, screen reader, keyboard walkthrough, other browsers.

## Pattern worth fixing everywhere
Large display headlines are the LCP element on every page, and LCP sits between 2.4 and 3.2 s on the pages I measured. Font loading is the likely common cause and is not yet solved for the agency homepage or the clinic and gym demos.

## Phase 5, reusable foundation (run, 2026-11-23)
- Typecheck, lint and **45 unit tests** pass (up from 32): message composer (3), metadata (2), a config linter that runs for every registered site (7: slug, contrast of every theme pairing, unique ids, nav and button targets exist, one hero first, enquiry tag and template tokens, placeholders), and enquiry-handler tests extended for `site-<slug>` tags (accepted) and look-alikes (rejected). Production build passes; `/sites/brightpath` is statically generated and an unknown slug returns 404.
- **Form consolidation regression check** (real browser, `scripts/form-check.mjs`, all four forms against a receiver that logs what it gets): the new platform site, clinic, gym and real-estate each showed errors and focused the name field on an empty submit, reached the success state on a valid submit, and delivered **exactly once** (4 deliveries for 4 forms, with the right `source` tags `site-brightpath`, `demo-clinic`, `demo-gym`, `demo-realty` and the right business and city fields). The three demo form components shrank from 341 to 215 lines.
- **Proof the platform works for a new industry:** `/sites/brightpath` (a fictional tuition centre) is entirely data in `src/sites/brightpath.ts`. Browser at 360, 768, 1280 and 1920 px, reduced motion on and off: no horizontal overflow, no console errors. I viewed it at 1280 px (top, middle, lower) and 360 px (top, twice: a clipped hero card was found and fixed). I did not view the 768 and 1920 px captures or the lower 360 px parts.
- Only the chosen font pair loads on a config site (2 font files requested, checked in Lighthouse's network list).
- Lighthouse mobile on `/sites/brightpath`: Accessibility 100, Best Practices 100, SEO 66 (deliberate `noindex`), CLS 0. Performance 90 and 96 across two runs, LCP 2.9 s and 2.6 s (over or on the 2.5 s budget), TBT 100 to 250 ms.

Not run: real phone, screen reader, keyboard walkthrough, other browsers, a second config site built by someone other than me, a client deployment at a domain root (not built).
