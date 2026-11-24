import Link from "next/link";
import { Baby, Check, Clock, HeartHandshake, MapPin, Ruler, ShieldCheck, Smile, Sparkles, Stethoscope } from "lucide-react";
import { AppointmentForm } from "@/components/demos/clinic/AppointmentForm";
import { clinic, doctors, faqs, hours, services, trustPoints, visitSteps } from "@/config/demo-clinic";

const icons = { smile: Smile, shield: ShieldCheck, sparkles: Sparkles, ruler: Ruler, steth: Stethoscope, baby: Baby } as const;

function Leaf() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#12706b" />
      <path d="M11 27c0-9 6-15 17-15 0 10-5 16-14 16" fill="#5ccabc" />
      <path d="M12 28c5-5 9-8 14-11" stroke="#0b3433" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function HeroArt() {
  return (
    <svg viewBox="0 0 420 420" role="img" aria-label="Illustration of an appointment calendar with one day selected">
      <circle cx="215" cy="210" r="190" fill="#dff3ef" />
      <circle cx="320" cy="90" r="54" fill="#5ccabc" opacity=".55" />
      <circle cx="90" cy="330" r="38" fill="#f5a524" opacity=".85" />
      <g>
        <rect x="80" y="70" width="260" height="290" rx="28" fill="#fff" stroke="#cfe6e2" strokeWidth="3" />
        <rect x="80" y="70" width="260" height="70" rx="28" fill="#12706b" />
        <rect x="80" y="112" width="260" height="28" fill="#12706b" />
        <rect x="128" y="50" width="16" height="44" rx="8" fill="#0b3433" />
        <rect x="276" y="50" width="16" height="44" rx="8" fill="#0b3433" />
        <text x="210" y="118" textAnchor="middle" fontFamily="var(--font-sora), sans-serif" fontWeight="700" fontSize="24" fill="#fff">Your visit</text>
        {Array.from({ length: 12 }).map((_, i) => {
          const col = i % 4, row = Math.floor(i / 4);
          const sel = i === 6;
          return <rect key={i} x={112 + col * 52} y={166 + row * 52} width="38" height="38" rx="12" fill={sel ? "#f5a524" : "#eef8f6"} />;
        })}
        <path d="M241 237l8 8 15-17" stroke="#0b3433" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <g>
        <rect x="190" y="316" width="190" height="56" rx="28" fill="#0b3433" />
        <circle cx="222" cy="344" r="14" fill="#5ccabc" />
        <path d="M216 344l5 5 9-10" stroke="#0b3433" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="248" y="350" fontFamily="var(--font-source), sans-serif" fontWeight="700" fontSize="17" fill="#fff">Request received</text>
      </g>
    </svg>
  );
}

export default function ClinicDemo() {
  return (
    <>
      <p className="dc-concept" role="note">Concept project by <Link href="/">The Yellow Works</Link>. Greenleaf Dental Clinic is a fictional clinic.</p>
      <header className="dc-hdr">
        <div className="dc-wrap">
          <a className="dc-brand" href="#top">
            <Leaf /><span>Greenleaf<small>Dental Clinic</small></span>
          </a>
          <nav className="dc-nav" aria-label="Main">
            <a href="#services">Services</a><a href="#doctors">Our dentists</a><a href="#visit">Visit us</a><a href="#faq">Questions</a>
          </nav>
          <a className="dc-btn dc-btn-go" href="#book">Request appointment</a>
        </div>
      </header>

      <main id="top">
        <section className="dc-hero" aria-labelledby="h1">
          <div className="dc-wrap">
            <div>
              <span className="dc-eyebrow">Family dental care</span>
              <h1 id="h1">Gentle dental care, <em>close to home.</em></h1>
              <p className="dc-lead">Check-ups, cleaning and treatment for the whole family. Ask for an appointment in under a minute and we’ll call you to confirm.</p>
              <div className="dc-ctas">
                <a className="dc-btn dc-btn-go" href="#book">Request appointment</a>
                <a className="dc-btn dc-btn-line" href="#services">See our services</a>
              </div>
            </div>
            <div className="dc-art"><HeroArt /></div>
          </div>
        </section>

        <section className="dc-trust" aria-label="Why patients choose us">
          <div className="dc-wrap">
            <ul>
              {trustPoints.map((t) => (
                <li key={t}><Check aria-hidden="true" strokeWidth={2.25} />{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="dc-sec" id="services" aria-labelledby="h-services">
          <div className="dc-wrap">
            <h2 id="h-services">Care for every smile</h2>
            <p className="dc-intro">From a routine check-up to treatment you’ve been putting off. We explain every step before we begin.</p>
            <div className="dc-svc">
              {services.map((s) => {
                const I = icons[s.icon];
                return (
                  <article key={s.id}>
                    <span className="dc-ic"><I aria-hidden="true" strokeWidth={1.75} /></span>
                    <div><h3>{s.title}</h3><p>{s.text}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="dc-sec dc-mist" id="doctors" aria-labelledby="h-doctors">
          <div className="dc-wrap">
            <h2 id="h-doctors">Meet our dentists</h2>
            <p className="dc-intro">A small team that knows your name. These are sample profiles for the concept.</p>
            <div className="dc-docs">
              {doctors.map((d) => (
                <article className="dc-doc" key={d.name}>
                  <span className="dc-av" style={{ background: d.color }} aria-hidden="true">{d.initials}</span>
                  <div><h3>{d.name}</h3><p>{d.role}, {d.focus}</p><span className="dc-tagc">Sample profile</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="dc-sec" aria-labelledby="h-how">
          <div className="dc-wrap">
            <h2 id="h-how">How a visit works</h2>
            <p className="dc-intro">No surprises. Here is what happens from the moment you ask.</p>
            <ol className="dc-steps">
              {visitSteps.map((s) => (<li key={s.title}><div><h3>{s.title}</h3><p>{s.text}</p></div></li>))}
            </ol>
          </div>
        </section>

        <section className="dc-sec dc-mist" id="visit" aria-labelledby="h-visit">
          <div className="dc-wrap">
            <h2 id="h-visit">Visit us</h2>
            <p className="dc-intro">Sample opening hours and a placeholder address for the concept.</p>
            <div className="dc-visit">
              <div>
                <h3 style={{ fontSize: "1.1rem", display: "flex", gap: ".5rem", alignItems: "center", marginBottom: ".6rem" }}><Clock aria-hidden="true" size={22} strokeWidth={1.75} />Opening hours</h3>
                <table className="dc-hours">
                  <caption className="sr-only" style={{ position: "absolute", left: "-9999px" }}>Opening hours</caption>
                  <tbody>{hours.map(([d, t]) => (<tr key={d}><th scope="row">{d}</th><td>{t}</td></tr>))}</tbody>
                </table>
                <p style={{ marginTop: "1rem", display: "flex", gap: ".5rem" }}><MapPin aria-hidden="true" size={22} strokeWidth={1.75} style={{ flex: "none", marginTop: 3 }} /><span>{clinic.address}<br />Phone: {clinic.phone}</span></p>
              </div>
              <div className="dc-map" role="img" aria-label="Placeholder for a map"><span>Map goes here<br /><small>Placeholder for the concept</small></span></div>
            </div>
          </div>
        </section>

        <section className="dc-sec dc-faq" id="faq" aria-labelledby="h-faq">
          <div className="dc-wrap">
            <h2 id="h-faq">Common questions</h2>
            <div style={{ maxWidth: "46rem" }}>
              {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="dc-sec dc-book" id="book" aria-labelledby="h-book">
          <div className="dc-wrap">
            <div>
              <h2 id="h-book">Request an appointment</h2>
              <p className="dc-intro" style={{ marginBottom: "1.5rem" }}>Tell us what you need and when suits you. We’ll call to confirm.</p>
              <p style={{ display: "flex", gap: ".6rem", alignItems: "center", color: "#cfe6e2", marginBottom: "1.5rem" }}><HeartHandshake aria-hidden="true" size={24} strokeWidth={1.75} />No payment, no commitment.</p>
            </div>
            <AppointmentForm />
          </div>
        </section>
      </main>

      <footer className="dc-foot">
        <div className="dc-wrap">
          <a className="dc-brand" href="#top"><Leaf /><span>Greenleaf<small>Dental Clinic</small></span></a>
          <p className="dc-legal">A concept website designed and built by <Link href="/">The Yellow Works</Link>. Greenleaf Dental Clinic, its dentists, hours and address are fictional. <a href="/privacy">Privacy policy</a></p>
        </div>
      </footer>

      <div className="dc-bar"><a className="dc-btn dc-btn-go" href="#book">Request appointment</a></div>
    </>
  );
}
