import Link from "next/link";
import { BookOpen, Baby, CalendarCheck, Check, Clock, Compass, GraduationCap, HandHelping, Lightbulb, MapPin, MessageSquareText, Ruler, ShieldCheck, Smile, Sparkles, Stethoscope, Target, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { EnquiryFormView } from "./EnquiryForm";
import { fontClass } from "./fonts";
import { themeToStyle } from "./theme";
import type { CardItem, IconKey, Section, SiteConfig } from "./types";

const icons: Record<IconKey, LucideIcon> = {
  check: Check, zap: Zap, compass: Compass, calendar: CalendarCheck, message: MessageSquareText, hand: HandHelping,
  smile: Smile, shield: ShieldCheck, sparkles: Sparkles, ruler: Ruler, steth: Stethoscope, baby: Baby, book: BookOpen,
  graduation: GraduationCap, target: Target, users: Users, lightbulb: Lightbulb, clock: Clock, pin: MapPin,
};
const Ic = ({ k, size = 24 }: { k: IconKey; size?: number }) => { const I = icons[k]; return <I aria-hidden="true" size={size} strokeWidth={1.75} />; };
const tone = (t?: "plain" | "tint") => (t === "tint" ? " pf-tint" : "");

function Hero({ s }: { s: Extract<Section, { type: "hero" }> }) {
  return (
    <section className="pf-hero" aria-labelledby="h1" id="top">
      <div className="pf-wrap">
        <div>
          {s.eyebrow && <span className="pf-eyebrow">{s.eyebrow}</span>}
          <h1 id="h1">{s.headline[0]}<em>{s.headline[1]}</em></h1>
          <p className="pf-lead">{s.lead}</p>
          <div className="pf-ctas">
            {s.ctas.map((c) => (<a key={c.label} className={`pf-btn ${c.style === "outline" ? "pf-line" : "pf-go"}`} href={c.href}>{c.label}</a>))}
          </div>
        </div>
        {s.cards && s.cards.length > 0 && (
          <div className="pf-hero-art" aria-hidden="true">
            {s.cards.slice(0, 2).map((c, i) => (
              <div key={c.title} className={`pf-hero-card${i === 1 ? " pf-hero-b" : ""}`}>
                {c.icon && <Ic k={c.icon} size={22} />}<span>{c.title}</span><strong>{c.value}</strong><small>{c.note}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Card({ c }: { c: CardItem }) {
  return (
    <article className={`pf-card${c.featured ? " pf-feat" : ""}`}>
      {c.featured && <span className="pf-tagp">{c.featuredLabel ?? "Most popular"}</span>}
      {c.icon && <span className="pf-ic"><Ic k={c.icon} /></span>}
      <div><h3>{c.title}</h3>{c.price && <p className="pf-price">{c.price}{c.priceNote && <small>{c.priceNote}</small>}</p>}<p>{c.text}</p></div>
      {c.perks && <ul className="pf-perks">{c.perks.map((p) => (<li key={p}><Check aria-hidden="true" size={18} strokeWidth={2.5} />{p}</li>))}</ul>}
      {c.cta && <a className={`pf-btn ${c.featured ? "pf-go" : "pf-line"}`} href={c.cta.href}>{c.cta.label}</a>}
    </article>
  );
}

function Block({ s }: { s: Section }) {
  switch (s.type) {
    case "band":
      return <section className="pf-band" aria-label="What you get"><div className="pf-wrap"><ul>{s.items.map((i) => (<li key={i}><Check aria-hidden="true" size={20} strokeWidth={2.5} />{i}</li>))}</ul></div></section>;
    case "cards":
      return (
        <section className={`pf-sec${tone(s.tone)}`} id={s.id} aria-labelledby={`h-${s.id}`}>
          <div className="pf-wrap">
            <h2 id={`h-${s.id}`}>{s.title}</h2>{s.intro && <p className="pf-intro">{s.intro}</p>}
            <div className="pf-cards">{s.items.map((c) => (<Card key={c.title} c={c} />))}</div>
            {s.footnote && <p className="pf-foot-note">{s.footnote}</p>}
          </div>
        </section>
      );
    case "profiles":
      return (
        <section className={`pf-sec${tone(s.tone)}`} id={s.id} aria-labelledby={`h-${s.id}`}>
          <div className="pf-wrap">
            <h2 id={`h-${s.id}`}>{s.title}</h2>{s.intro && <p className="pf-intro">{s.intro}</p>}
            <div className="pf-people">{s.people.map((p) => (
              <article className="pf-person" key={p.name}>
                <span className="pf-av" style={{ background: p.color }} aria-hidden="true">{p.initials}</span>
                <div><h3>{p.name}</h3><p>{p.role}</p><span className="pf-samplet">Sample profile</span></div>
              </article>
            ))}</div>
          </div>
        </section>
      );
    case "steps":
      return (
        <section className={`pf-sec${tone(s.tone)}`} id={s.id} aria-labelledby={`h-${s.id}`}>
          <div className="pf-wrap">
            <h2 id={`h-${s.id}`}>{s.title}</h2>{s.intro && <p className="pf-intro">{s.intro}</p>}
            <ol className="pf-steps">{s.steps.map((x) => (<li key={x.title}><div><h3>{x.title}</h3><p>{x.text}</p></div></li>))}</ol>
          </div>
        </section>
      );
    case "schedule":
      return (
        <section className={`pf-sec${tone(s.tone)}`} id={s.id} aria-labelledby={`h-${s.id}`}>
          <div className="pf-wrap">
            <h2 id={`h-${s.id}`}>{s.title}</h2>{s.intro && <p className="pf-intro">{s.intro}</p>}
            <div className="pf-days">{s.days.map((d) => (
              <div className="pf-day" key={d.day}><h3>{d.day}</h3><ul>{d.items.map(([t, l]) => (<li key={t + l}><time>{t}</time><span>{l}</span></li>))}</ul></div>
            ))}</div>
          </div>
        </section>
      );
    case "gallery":
      return (
        <section className="pf-sec" id={s.id} aria-labelledby={`h-${s.id}`}>
          <div className="pf-wrap">
            <h2 id={`h-${s.id}`}>{s.title}</h2>{s.intro && <p className="pf-intro">{s.intro}</p>}
            <div className="pf-gal" role="img" aria-label="Placeholders for photographs">{Array.from({ length: s.count ?? 4 }).map((_, i) => (<div key={i}>Photo<br />placeholder</div>))}</div>
          </div>
        </section>
      );
    case "hours":
      return (
        <section className={`pf-sec${tone(s.tone)}`} id={s.id} aria-labelledby={`h-${s.id}`}>
          <div className="pf-wrap">
            <h2 id={`h-${s.id}`}>{s.title}</h2>{s.intro && <p className="pf-intro">{s.intro}</p>}
            <table className="pf-hours"><tbody>{s.rows.map(([l, v]) => (<tr key={l}><th scope="row">{l}</th><td>{v}</td></tr>))}</tbody></table>
          </div>
        </section>
      );
    case "faq":
      return (
        <section className={`pf-sec pf-faq${tone(s.tone)}`} id="faq" aria-labelledby="h-faq">
          <div className="pf-wrap">
            <h2 id="h-faq">{s.title}</h2>
            <div style={{ maxWidth: "46rem" }}>{s.items.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}</div>
          </div>
        </section>
      );
    case "enquiry":
      return (
        <section className="pf-sec pf-book" id={s.id} aria-labelledby={`h-${s.id}`}>
          <div className="pf-wrap">
            <div><h2 id={`h-${s.id}`}>{s.title}</h2><p className="pf-intro">{s.intro}</p>{s.reassurance && <p style={{ fontWeight: 600 }}>{s.reassurance}</p>}</div>
            <EnquiryFormView cfg={s.form} />
          </div>
        </section>
      );
    default:
      return null;
  }
}

/** Renders a whole site from its config. No site-specific code lives here or in the sections. */
export function SiteRenderer({ site }: { site: SiteConfig }) {
  const hero = site.sections.find((s) => s.type === "hero");
  return (
    <div className={`pf ${fontClass(site.theme.fontPair)}`} style={themeToStyle(site.theme)} data-site={site.slug}>
      {site.conceptBanner && <p className="pf-concept" role="note">{site.conceptBanner} <Link href="/">The Yellow Works</Link></p>}
      <header className="pf-hdr">
        <div className="pf-wrap">
          <a className="pf-brand" href="#top"><span className="pf-mark" aria-hidden="true">{site.name.charAt(0)}</span><span>{site.name}<small>{site.descriptor}</small></span></a>
          <nav className="pf-nav" aria-label="Main">{site.nav.map((n) => (<a key={n.href} href={n.href}>{n.label}</a>))}</nav>
          <a className="pf-btn pf-go pf-hdr-cta" href={site.cta.href}>{site.cta.label}</a>
        </div>
      </header>
      <main id="main">
        {site.sections.map((s, i) => (s.type === "hero" ? <Hero key={i} s={s} /> : <Block key={i} s={s} />))}
        {!hero && <span id="top" />}
      </main>
      <footer className="pf-foot">
        <div className="pf-wrap">
          <a className="pf-brand" href="#top"><span className="pf-mark" aria-hidden="true">{site.name.charAt(0)}</span><span>{site.name}<small>{site.descriptor}</small></span></a>
          <p style={{ marginTop: "0.75rem" }}>{site.contact.address} · {site.contact.phone}</p>
          <p className="pf-legal">{site.footerNote} <Link href="/privacy">Privacy policy</Link></p>
        </div>
      </footer>
      <div className="pf-bar"><a className="pf-btn pf-go" href={site.cta.href}>{site.cta.label}</a></div>
    </div>
  );
}
