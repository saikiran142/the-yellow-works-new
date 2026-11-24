# Demonstration websites (Phase 4)

Built one at a time, with a review after each. Every demo has its own identity (not The Yellow Works yellow), a defined customer journey, a mobile-first build, realistic **sample** content, working enquiry functionality and SEO foundations. Every demo is labelled concept work.

## 1. Clinic: Greenleaf Dental Clinic (built 2026-11-23, awaiting review)
Route: `/demos/clinic`. Code: `src/app/demos/clinic/`, `src/components/demos/clinic/`, `src/config/demo-clinic.ts`, `src/styles/demo-clinic.css`.

**Identity.** Deep teal ink `#0b3433`, teal `#12706b`, aqua `#5ccabc`, mist `#eef8f6`, one action colour (amber `#f5a524`) used only for appointment buttons. Type: Sora (display) with Source Sans 3 (body), loaded separately from the agency fonts. A simple leaf mark. All demo CSS classes are prefixed `dc-` and scoped under `.dc`, so the demo and the agency site cannot affect each other (an earlier unprefixed version leaked the agency header and button styles).

**Journey.** A patient searches, lands, sees reassurance and what is treated, meets the dentists, understands what a visit involves, and requests an appointment. Primary action is always one tap away: a sticky "Request appointment" bar on phones, a header button on desktop.

**Page architecture (one page, anchored):** concept banner, header, hero, trust list, services (6), dentists (3 fictional), how a visit works (3 steps), visit us (sample hours, placeholders for address, phone and map), FAQ (4, native `details`), appointment request form, footer with concept disclaimer.

**Working enquiry.** The form posts to the same `/api/enquiry` as the agency site, tagged `source: "demo-clinic"` (allow-listed; unknown tags are ignored). Validation, honeypot, rate limit, idempotency and delivery all apply. A request therefore really arrives wherever enquiries are delivered, and says it came from the demo. The success message says plainly that no one will call. Delivery is still decision D-08.

**SEO foundations.** One H1, ordered headings, landmarks, unique title and description, canonical, `lang`, descriptive labels. The demo is `noindex` (demo work stays out of search). **No structured data**: LocalBusiness data needs a real verified address and phone, which a fictional clinic does not have.

**Content rules kept.** No real clinic, person, price, review, address or phone. No testimonials at all. Dentists are fictional and shown as initials, not photographs, and tagged "Sample profile". Opening hours are labelled sample. Placeholders: `[CLINIC_ADDRESS]`, `[CLINIC_PHONE]`, a map placeholder.

**Known limitations.** No photography (initials and an SVG illustration stand in; a real clinic site needs licensed or commissioned photos, D-09). The map is a placeholder. No appointment slot picker (a preference of time of day only). Single page, not the multi-page architecture a real clinic would have (services pages, one per dentist). Medical claims were kept deliberately generic and have not been reviewed by anyone qualified; a real clinic site needs that review and attention to advertising rules for health services.

## 2. Gym: IronCore Fitness (built 2026-11-23, awaiting review)
Route: `/demos/gym`. Code: `src/app/demos/gym/`, `src/components/demos/gym/`, `src/config/demo-gym.ts`, `src/styles/demo-gym.css`.

**Identity.** Dark and athletic, the opposite mood to the clinic. Ink `#0e1116`, steel `#171c24`, one volt-lime action colour `#b8f23a`, paper `#f3f5ee` for contrast sections. Type: Barlow Condensed 800 (uppercase display) with Barlow (body), loaded separately. A bolt mark. Every class is prefixed `dg-` and scoped under `.dg` from the start.

**Journey.** A visitor wants to get fitter, sees the promise and the free first session, compares plans, meets the coaches, checks the classes against their week, and books a free trial. The primary action is always one tap away: a sticky "Book a free trial" bar on phones, a header button on desktop.

**Page architecture (one page, anchored):** concept banner, header, hero, feature band, plans (3), coaches (3 fictional), weekly class timetable, gallery placeholders, FAQ, free-trial form, footer with concept disclaimer.

**Working enquiry.** The trial form posts to `/api/enquiry` tagged `demo-gym` (allow-listed). Goal and preferred time are carried in the message. The success message says plainly no one will be in touch.

**SEO foundations.** Same as the clinic: one H1, ordered headings, landmarks, unique title and description, canonical, `noindex`, no structured data.

**Content rules kept.** No real gym, coach, price, review, address or phone. No testimonials and no invented statistics. Plan prices are **sample** and labelled "Sample prices for the concept. They are not real." Coaches are fictional, shown as initials, tagged "Sample profile". Photo areas are labelled placeholders.

**Known limitations.** No photography (D-09). No online payment or join flow, only a trial request. The timetable is static sample data. Single page. The trial form's submit logic duplicates the clinic's; consolidating it is Phase 5 work. Fitness and weight-loss wording is generic and has not been reviewed for advertising rules.

## 3. Real estate: Haven Properties (built 2026-11-23, awaiting review)
Routes: `/demos/real-estate` (home with listings) and `/demos/real-estate/[id]` (four sample property pages, statically generated; an unknown id returns 404). Code: `src/app/demos/real-estate/`, `src/components/demos/realty/`, `src/config/demo-realty.ts`, `src/styles/demo-realty.css`.

**Identity.** Calm and trustworthy, between the clinic's soft teal and the gym's dark energy. Deep navy `#12203f`, blue `#2e4a8f`, soft sky `#eaf0fa`, one brass action colour `#d9a441`. Type: Manrope 800 (display) with Work Sans (body). A house mark. Every class is prefixed `dr-` and scoped under `.dr`.

**Journey.** A buyer browses a small set of homes and plots, filters by type, opens a property to see the facts that matter, and requests a site visit for that property. A sticky "Schedule a site visit" bar stays on phones; a header button does the same on desktop; the property page keeps the visit form beside the details.

**Page architecture (multi-page).** Home: concept banner, header, hero, filterable featured properties, why-us, how a site visit works, advisors (fictional), FAQ, site-visit form, footer. Property page: breadcrumb, illustration, price (sample), key facts, about, highlights, amenities, gallery placeholders, location placeholder, a sticky site-visit form, and "You may also like".

**Working enquiry.** Both forms post to `/api/enquiry` tagged `demo-realty` (allow-listed). The property name, day, time and buying timeline are carried in the message, so the receiver can tell which home was asked about. The success message says plainly no one will call.

**SEO foundations.** Home and property pages each have a unique title and description, canonical URL, one H1, breadcrumb navigation, ordered headings. Both are `noindex` (demo work). No structured data: Product or RealEstateListing data would need real listings with real addresses and prices.

**Content rules kept.** No real agency, project, locality, price, person, address or phone. Prices are **sample** and labelled so on the home page and each property page. Locality is the placeholder `[LOCALITY]`. Advisors are fictional initials tagged "Sample profile". No testimonials or statistics. Property images are simple illustrations; gallery and map are labelled placeholders.

**Known limitations.** No photography (D-09), no real map, no saved favourites or comparison, no price range or bedroom filters (type filter only), no map search. Real listings would come from a data source, not a config file. Property wording is generic and has not been reviewed against real-estate advertising rules (RERA and local rules) that a real agency must follow.
