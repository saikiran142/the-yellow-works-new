# Deployment and launch checklist (Vercel, theyellowworks.com)

Nothing here has been done. Deploying, connecting the domain and turning on indexing are outward-facing steps for the owner to approve and perform. Last updated 2026-11-23.

## 1. Before the first deploy
- [ ] Move the project out of the OneDrive folder, or exclude `node_modules` and `.next` from sync.
- [ ] Put the code in the GitHub repo (`saikiran142/yellow-works`). The repo currently holds only a stub README.
- [ ] Set up the Google Sheet receiver (D-08 decided; see `docs/ENQUIRY_SETUP.md`). The app posts JSON to `ENQUIRY_WEBHOOK_URL`: `{ id, receivedAt, source, name, business, type, city, phone, message }` with an `Idempotency-Key` header and an optional `Authorization: Bearer` header. Any form service, automation or small endpoint that accepts this works. Make it dedupe on `id`.
- [x] D-12 number and city supplied (kept in `.env.local`, which is not committed). [ ] Address still to come; decide whether to publish it.

## 2. Vercel project settings (Production)
| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://theyellowworks.com` |
| `ENQUIRY_WEBHOOK_URL` | destination (server only) |
| `ENQUIRY_WEBHOOK_SECRET` | shared secret (server only) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | the confirmed number, with country code. These values must be set in Vercel too; `.env.local` is only for your machine |
| `NEXT_PUBLIC_TARGET_CITY` | `Hyderabad` |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` and `NEXT_PUBLIC_ANALYTICS_DOMAIN` | leave unset: no analytics at launch (D-11) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | leave **unset** until launch day |

Preview deployments: leave `NEXT_PUBLIC_ALLOW_INDEXING` unset. The API accepts calls from preview hosts only when `VERCEL_ENV=preview`.

## 3. Domain
- [ ] Add `theyellowworks.com` and `www` in Vercel, set DNS as Vercel instructs, redirect one to the other, confirm HTTPS.
- [ ] Check that `contact@theyellowworks.com` receives mail.

## 4. Launch gate (all must be true)
- [ ] Privacy policy reviewed by a qualified professional and its bracketed items filled in (legal entity, grievance officer, delivery service, retention, response time, date). Remove the "Draft" notice only then.
- [ ] Placeholders replaced or removed on the page: timeline, update policy, support terms (or rewrite the FAQ answers).
- [ ] Enquiry form tested end to end on the live domain: a real submission arrives once, and a repeat does not duplicate.
- [ ] D-15 trademark and reverse-image checks done.
- [ ] Real-device check on a mid-range Android phone over 4G: LCP, INP, hero 3D fallback.
- [ ] Screen-reader and keyboard walkthrough.
- [ ] Rate limiting upgraded to a shared store if traffic or abuse justifies it (the built one is per server instance).
- [ ] Google Search Console property verified. Submit the sitemap **after** indexing is turned on.
- [ ] Then set `NEXT_PUBLIC_ALLOW_INDEXING=true` and redeploy. `robots.txt` and the sitemap open up and the meta `noindex` is removed.

## 5. After launch
Watch enquiries for a week, check the delivery destination for failures, and review analytics consent behaviour. India's DPDP consent and notice duties are reported to start around May 2027; verify the dates with counsel.

## Client sites (Phase 5)
Client websites are built as configs on the platform; see `docs/CLIENT_ONBOARDING.md` for the full process and deployment per client. **Not built yet:** serving a client site at the root of its own domain. Today every config site is under `/sites/<slug>`; a client deployment needs a root route (or a rewrite) that renders its single site.
