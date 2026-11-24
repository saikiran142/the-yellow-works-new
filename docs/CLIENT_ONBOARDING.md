# Client onboarding: from first call to a live website

How a new client website is made on the platform (see `docs/PLATFORM.md`). A typical build is writing one config file, checking it, and deploying it. Timelines and prices are not set (placeholders until the owner confirms them).

## 1. Collect (from the client)
Never accept or store real card, bank or login details for this. Ask for:
- Business name, a one-line descriptor, and the industry.
- Services or offers, in the client's words, with prices only if the client confirms them.
- Hours, address and phone **as the client wants them published**. Leave placeholders until confirmed.
- Names and roles of people to show, and whether the client wants to use photographs (who owns them? licence?).
- WhatsApp number (international format) and a contact email for enquiries.
- Brand colours, if the client has any. If not, propose a theme.
- Questions customers often ask (for the FAQ). Facts only: no invented claims, awards, testimonials or statistics.

## 2. Write the config
1. Copy `src/sites/brightpath.ts` to `src/sites/<client-slug>.ts` and replace the content.
2. Pick the theme: 15 colours, a `soft` or `sharp` radius and a font pair. Keep `accent` for the main action only.
3. Order the sections: hero first, an enquiry section, then whatever the client needs (cards, profiles, steps, schedule, hours, gallery, faq).
4. Set the enquiry form: its selects, the message template, a `site-<slug>` source and the wording. Choose which select goes in the `business` and `city` columns of the sheet.
5. Add the site to `src/sites/index.ts`.
6. Remove the concept banner and all "Sample profile" wording; use real content only.

## 3. Check
Run `npm test`. The config linter fails on unreadable colours, broken links, duplicate ids or a bad enquiry template. Then `npm run lint`, `npm run typecheck`, `npm run build`. Open `/sites/<slug>` and check it at 360, 768, 1280 and 1920 px with reduced motion on and off. Send one real test enquiry and see it arrive once.

## 4. Content and legal review
- Placeholders replaced or removed. No invented claims.
- A privacy policy for **this client** (it is the client's data, not the agency's). It needs professional review (India's DPDP Act 2023). `src/app/privacy/page.tsx` is the agency's draft and is not a client policy.
- Health, finance, real-estate and education businesses have advertising rules of their own. The client confirms their wording is compliant.
- Photographs: licensed or the client's own; record each in a licence log.

## 5. Deploy
1. Per client, a separate Vercel project with its own environment variables: `ENQUIRY_WEBHOOK_URL` (the client's sheet or receiver; the setup is in `docs/ENQUIRY_SETUP.md`), `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`.
2. A client deployment should serve its site at the root. Keep only that site in `src/sites/index.ts`, and add a root route that renders it. This step is not built yet: today every site is under `/sites/<slug>`.
3. The client's domain: add it in Vercel, set DNS, confirm HTTPS.
4. Indexing stays off (`seo.noindex` unset) until the client has approved the live site. Then set `seo.noindex: false` and redeploy, and submit the sitemap in Search Console.

## 6. Handover
Give the client: the live URL, how enquiries reach them, who to contact for changes, and what is not included. Agree the support terms (placeholder until the owner sets them). Record the client, slug, deploy project and receiver in a private register, not in this repository.

## Checklist
- [ ] Facts confirmed in writing by the client
- [ ] Config written, linter passes
- [ ] No concept banner, no sample labels, no placeholders
- [ ] Contrast, responsive and reduced-motion checks done
- [ ] Test enquiry arrived once; a repeat did not duplicate
- [ ] Privacy policy for the client reviewed
- [ ] Domain, HTTPS, indexing decision recorded
- [ ] Handover sent
