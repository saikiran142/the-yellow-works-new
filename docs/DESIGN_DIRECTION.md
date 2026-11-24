# Design Direction

## Research status (honest note)
Phase 0 research was a light pass: web search only, no hands-on teardown of individual sites. Findings below are from secondary sources and need a proper moodboard pass at the start of Phase 1 (Awwwards, CSSDA, Godly, Land-book, Siteinspire, Spline community, Mobbin, plus 3–5 Indian agency sites as the baseline to beat). I did not review any Indian agency sites yet.

## Findings
- **3D and scroll storytelling dominate agency sites in 2026.** One third-party analysis claims 3D experiences are 61% of Awwwards Site of the Day winners in Q1 2026 (up from 23% in Q1 2024). Unverified; treat as directional. Source: [Digital Strategy Force](https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/).
- Recent Awwwards agency entries to study in Phase 1: Noomo Agency (June 2026) and aino.agency (April 2026), via [Awwwards design agencies](https://www.awwwards.com/inspiration_search/design-agencies/).
- Agency roundups lean on 3D visuals, bold layouts and micro-interactions ([DesignRush](https://www.designrush.com/trends/top-7-advertising-agency-websites-that-demonstrate-unique-value) — contains sponsored placements).
- **Bricolage Grotesque** has weight, width and optical-size axes. Sources disagree on ranges (Google listing: wght 200–800, wdth 75–100, opsz 12–96). Check the live font page before use. See [Google variable fonts](https://fonts.google.com/variablefonts) and [Fontsource](https://fontsource.org/fonts/bricolage-grotesque/install).

## Adopt
One signature 3D moment; type as image; real photography with a house grade; before/after and sticky-stage storytelling where they explain something.

## Avoid
Template tells (identical card grids, eyebrow on every heading, arrow on every button, gradient text, serif+terracotta, near-black+acid accent), scroll-jacking, custom cursors, parallax on body text, 3D beyond the hero.

## Mobile and performance trade-offs
- Most award-winning sites degrade poorly on mid-range phones. Our rule: phones get the pre-rendered AVIF still (optionally a ≤600 KB muted loop). Real-time 3D only after LCP on capable devices.
- Capability gate: WebGL2, no reduced-motion, no Save-Data, precise pointer or wide viewport, ≥4 cores / ≥4 GB where reported.
- Scroll-into-door transition ships only if smooth on mid-range hardware; otherwise crossfade.

## Animation recommendations
One orchestrated lights-on sequence (≤1.8 s) with headline visible at first paint. Everything else responds to the user. Motion for React as default; GSAP ScrollTrigger only for scroll-scrubbed pieces (process line, sticky industries). Tokens: 150/250/450 ms, ease-out `cubic-bezier(0.22,1,0.36,1)`.

## Quality bar (Phase 1/2 gate)
Not mistakable for a template · one unmistakable signature moment · varied section rhythm · colour/type/3D/photo read as one family · premium with 3D off and reduced motion on · holds at 360 px · five-second clarity for a clinic owner.

## Moodboard
Links to be collected in Phase 1 (the list above is the seed).
