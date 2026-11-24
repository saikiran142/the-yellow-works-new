import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { TrialForm } from "@/components/demos/gym/TrialForm";
import { coaches, faqs, features, gym, plans, timetable } from "@/config/demo-gym";

function Mark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="8" fill="#b8f23a" />
      <path d="M23 6L10 23h8l-2 11 14-18h-9z" fill="#0e1116" />
    </svg>
  );
}

function HeroArt() {
  return (
    <svg viewBox="0 0 420 420" role="img" aria-label="Illustration of a barbell with weight plates and a free trial ticket">
      <circle cx="210" cy="210" r="190" fill="#171c24" />
      <circle cx="210" cy="210" r="150" fill="none" stroke="#2b3440" strokeWidth="2" strokeDasharray="6 10" />
      <rect x="40" y="200" width="340" height="20" rx="10" fill="#aab3bf" />
      <rect x="62" y="130" width="34" height="160" rx="8" fill="#b8f23a" />
      <rect x="100" y="152" width="26" height="116" rx="7" fill="#e7f9b0" />
      <rect x="324" y="130" width="34" height="160" rx="8" fill="#b8f23a" />
      <rect x="294" y="152" width="26" height="116" rx="7" fill="#e7f9b0" />
      <g transform="rotate(-6 210 330)">
        <rect x="110" y="300" width="200" height="64" rx="10" fill="#f3f5ee" />
        <circle cx="110" cy="332" r="9" fill="#0e1116" />
        <circle cx="310" cy="332" r="9" fill="#0e1116" />
        <text x="210" y="326" textAnchor="middle" fontFamily="var(--font-barlow-c), sans-serif" fontWeight="800" fontSize="24" fill="#0e1116">FREE TRIAL</text>
        <text x="210" y="350" textAnchor="middle" fontFamily="var(--font-barlow), sans-serif" fontWeight="600" fontSize="14" fill="#3f4955">Admit one first session</text>
      </g>
    </svg>
  );
}

export default function GymDemo() {
  return (
    <>
      <p className="dg-concept" role="note">Concept project by <Link href="/">The Yellow Works</Link>. IronCore Fitness is a fictional gym.</p>
      <header className="dg-hdr">
        <div className="dg-wrap">
          <a className="dg-brand" href="#top"><Mark /><span>Iron<b>Core</b></span></a>
          <nav className="dg-nav" aria-label="Main">
            <a href="#plans">Plans</a><a href="#coaches">Coaches</a><a href="#classes">Classes</a><a href="#faq">Questions</a>
          </nav>
          <a className="dg-btn dg-go" href="#trial">Free trial</a>
        </div>
      </header>

      <main id="top">
        <section className="dg-hero" aria-labelledby="h1">
          <div className="dg-wrap">
            <div>
              <span className="dg-eyebrow">Strength · Classes · Coaching</span>
              <h1 id="h1">Train like you <em>mean it.</em></h1>
              <p className="dg-lead">A friendly gym for beginners and regulars. Coaches on the floor, classes for every level, and a free first session so you can see if it’s for you.</p>
              <div className="dg-ctas">
                <a className="dg-btn dg-go" href="#trial">Book a free trial</a>
                <a className="dg-btn dg-line" href="#plans">See plans</a>
              </div>
            </div>
            <div className="dg-art"><HeroArt /></div>
          </div>
        </section>

        <section className="dg-band" aria-label="What you get">
          <div className="dg-wrap">
            <ul>{features.map((f) => (<li key={f}><Zap aria-hidden="true" strokeWidth={2.25} />{f}</li>))}</ul>
          </div>
        </section>

        <section className="dg-sec" id="plans" aria-labelledby="h-plans">
          <div className="dg-wrap">
            <h2 id="h-plans">Pick your plan</h2>
            <p className="dg-intro">Simple monthly plans. No joining fee in this sample. Every plan starts with a free trial session.</p>
            <div className="dg-plans">
              {plans.map((p) => (
                <article key={p.id} className={`dg-plan${p.featured ? " dg-feat" : ""}`}>
                  {p.featured && <span className="dg-tagp">Most popular</span>}
                  <h3>{p.name}</h3>
                  <div className="dg-price">{p.price}<small>{p.per}</small></div>
                  <p>{p.note}</p>
                  <ul>{p.perks.map((x) => (<li key={x}><Check aria-hidden="true" strokeWidth={2.5} />{x}</li>))}</ul>
                  <a className={`dg-btn ${p.featured ? "dg-go" : "dg-line"}`} href="#trial">Start with a free trial</a>
                </article>
              ))}
            </div>
            <span className="dg-sample">Sample prices for the concept. They are not real.</span>
          </div>
        </section>

        <section className="dg-sec dg-light" id="coaches" aria-labelledby="h-coaches">
          <div className="dg-wrap">
            <h2 id="h-coaches">Meet your coaches</h2>
            <p className="dg-intro">Coaches who learn your name and your goal. These are sample profiles for the concept.</p>
            <div className="dg-coaches">
              {coaches.map((c) => (
                <article className="dg-coach" key={c.name}>
                  <span className="dg-av" style={{ background: c.color }} aria-hidden="true">{c.initials}</span>
                  <div><h3>{c.name}</h3><p>{c.focus}</p><span className="dg-samplet">Sample profile</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="dg-sec dg-steel" id="classes" aria-labelledby="h-classes">
          <div className="dg-wrap">
            <h2 id="h-classes">This week’s classes</h2>
            <p className="dg-intro">A sample timetable. Pick one that fits your day, or ask a coach to help you choose.</p>
            <div className="dg-days">
              {timetable.map((d) => (
                <div className="dg-day" key={d.day}>
                  <h3>{d.day}</h3>
                  <ul>{d.sessions.map(([t, n]) => (<li key={t}><time>{t}</time><span>{n}</span></li>))}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dg-sec" aria-labelledby="h-gal">
          <div className="dg-wrap">
            <h2 id="h-gal">Inside the gym</h2>
            <p className="dg-intro">Photographs of the real floor, classes and coaches would go here.</p>
            <div className="dg-gal" role="img" aria-label="Placeholders for gym photographs">
              <div>Photo<br />placeholder</div><div>Photo<br />placeholder</div><div>Photo<br />placeholder</div><div>Photo<br />placeholder</div>
            </div>
          </div>
        </section>

        <section className="dg-sec dg-steel dg-faq" id="faq" aria-labelledby="h-faq">
          <div className="dg-wrap">
            <h2 id="h-faq">Common questions</h2>
            <div style={{ maxWidth: "46rem" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="dg-sec dg-book" id="trial" aria-labelledby="h-trial">
          <div className="dg-wrap">
            <div>
              <h2 id="h-trial">Book your free trial</h2>
              <p className="dg-intro" style={{ marginBottom: "1rem" }}>Tell us your goal and when you like to train. We’ll message you to fix a time.</p>
              <p style={{ fontWeight: 600 }}>No payment. No commitment.</p>
            </div>
            <TrialForm />
          </div>
        </section>
      </main>

      <footer className="dg-foot">
        <div className="dg-wrap">
          <a className="dg-brand" href="#top"><Mark /><span>Iron<b>Core</b></span></a>
          <p style={{ marginTop: "0.75rem" }}>{gym.address} · {gym.phone}</p>
          <p className="dg-legal">A concept website designed and built by <Link href="/">The Yellow Works</Link>. IronCore Fitness, its coaches, prices, timetable and address are fictional. <Link href="/privacy">Privacy policy</Link></p>
        </div>
      </footer>

      <div className="dg-bar"><a className="dg-btn dg-go" href="#trial">Book a free trial</a></div>
    </>
  );
}
