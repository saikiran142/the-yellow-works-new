import { CalendarCheck, Compass, HandHelping, MessageSquareText } from "lucide-react";
import { ConceptBanner, RealtyFooter, RealtyHeader, StickyBar } from "@/components/demos/realty/Chrome";
import { Listings } from "@/components/demos/realty/Listings";
import { SiteVisitForm } from "@/components/demos/realty/SiteVisitForm";
import { advisors, faqs, reasons, visitSteps } from "@/config/demo-realty";

const reasonIcons = [MessageSquareText, CalendarCheck, HandHelping] as const;

export default function RealtyDemo() {
  return (
    <>
      <ConceptBanner />
      <RealtyHeader />
      <main id="top">
        <section className="dr-hero" aria-labelledby="h1">
          <div className="dr-wrap">
            <div>
              <span className="dr-eyebrow">Homes and plots, explained clearly</span>
              <h1 id="h1">Find a place you’ll <em>be glad to come home to.</em></h1>
              <p className="dr-lead">Browse a small, carefully described selection of apartments, villas and plots, then book a visit that fits your week.</p>
              <div className="dr-ctas">
                <a className="dr-btn dr-go" href="#listings">See properties</a>
                <a className="dr-btn dr-line" href="#visit">Schedule a site visit</a>
              </div>
            </div>
            <div className="dr-hero-art" aria-hidden="true">
              <div className="dr-hero-card"><Compass size={22} strokeWidth={1.75} /><span>Sample listing</span><strong>Greenfield Heights</strong><small>3 bed apartment · ₹ 85 lakh onwards (sample)</small></div>
              <div className="dr-hero-card dr-hero-b"><CalendarCheck size={22} strokeWidth={1.75} /><span>Site visit</span><strong>Saturday, 11:00</strong><small>Requested</small></div>
            </div>
          </div>
        </section>

        <section className="dr-sec" id="listings" aria-labelledby="h-listings">
          <div className="dr-wrap">
            <h2 id="h-listings">Featured properties</h2>
            <p className="dr-intro">A small selection, each with the facts that matter. These are sample listings for the concept.</p>
            <Listings />
          </div>
        </section>

        <section className="dr-sec dr-sky" aria-labelledby="h-why">
          <div className="dr-wrap">
            <h2 id="h-why">Why people use Haven</h2>
            <div className="dr-reasons">
              {reasons.map((r, i) => {
                const I = reasonIcons[i];
                return (<article key={r.title}><span className="dr-ic"><I aria-hidden="true" size={26} strokeWidth={1.75} /></span><h3>{r.title}</h3><p>{r.text}</p></article>);
              })}
            </div>
          </div>
        </section>

        <section className="dr-sec" id="how" aria-labelledby="h-how">
          <div className="dr-wrap">
            <h2 id="h-how">How a site visit works</h2>
            <p className="dr-intro">Three simple steps, from browsing to standing in the home.</p>
            <ol className="dr-steps">
              {visitSteps.map((s) => (<li key={s.title}><div><h3>{s.title}</h3><p>{s.text}</p></div></li>))}
            </ol>
          </div>
        </section>

        <section className="dr-sec dr-sky" id="advisors" aria-labelledby="h-adv">
          <div className="dr-wrap">
            <h2 id="h-adv">Your advisors</h2>
            <p className="dr-intro">Two advisors who answer your questions. These are sample profiles for the concept.</p>
            <div className="dr-advisors">
              {advisors.map((a) => (
                <article className="dr-advisor" key={a.name}>
                  <span className="dr-av" style={{ background: a.color }} aria-hidden="true">{a.initials}</span>
                  <div><h3>{a.name}</h3><p>{a.role}</p><span className="dr-samplet">Sample profile</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="dr-sec dr-faq" id="faq" aria-labelledby="h-faq">
          <div className="dr-wrap">
            <h2 id="h-faq">Common questions</h2>
            <div style={{ maxWidth: "46rem" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="dr-sec dr-book" id="visit" aria-labelledby="h-visit">
          <div className="dr-wrap">
            <div>
              <h2 id="h-visit">Schedule a site visit</h2>
              <p className="dr-intro" style={{ marginBottom: "1rem" }}>Tell us the day and time that suit you. We’ll call to confirm.</p>
              <p style={{ fontWeight: 600 }}>No fee. No obligation.</p>
            </div>
            <SiteVisitForm />
          </div>
        </section>
      </main>
      <RealtyFooter />
      <StickyBar />
    </>
  );
}
