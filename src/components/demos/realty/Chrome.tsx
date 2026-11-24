import Link from "next/link";
import { agency } from "@/config/demo-realty";

export function Mark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#12203f" />
      <path d="M8 21L20 10l12 11v10H8z" fill="#d9a441" />
      <rect x="17" y="22" width="6" height="9" rx="1" fill="#12203f" />
    </svg>
  );
}

export function ConceptBanner() {
  return <p className="dr-concept" role="note">Concept project by <Link href="/">The Yellow Works</Link>. Haven Properties is a fictional agency.</p>;
}

export function RealtyHeader({ ctaHref = "#visit", ctaLabel = "Schedule a site visit" }: { ctaHref?: string; ctaLabel?: string }) {
  return (
    <header className="dr-hdr">
      <div className="dr-wrap">
        <Link className="dr-brand" href={agency.path}><Mark /><span>Haven<small>Properties</small></span></Link>
        <nav className="dr-nav" aria-label="Main">
          <Link href={`${agency.path}#listings`}>Properties</Link>
          <Link href={`${agency.path}#how`}>How it works</Link>
          <Link href={`${agency.path}#advisors`}>Advisors</Link>
          <Link href={`${agency.path}#faq`}>Questions</Link>
        </nav>
        <a className="dr-btn dr-go" href={ctaHref}>{ctaLabel}</a>
      </div>
    </header>
  );
}

export function RealtyFooter() {
  return (
    <footer className="dr-foot">
      <div className="dr-wrap">
        <Link className="dr-brand" href={agency.path}><Mark /><span>Haven<small>Properties</small></span></Link>
        <p style={{ marginTop: "0.75rem" }}>{agency.address} · {agency.phone}</p>
        <p className="dr-legal">A concept website designed and built by <Link href="/">The Yellow Works</Link>. Haven Properties, its projects, prices, advisors and address are fictional. <Link href="/privacy">Privacy policy</Link></p>
      </div>
    </footer>
  );
}

export function StickyBar({ href = "#visit", label = "Schedule a site visit" }: { href?: string; label?: string }) {
  return <div className="dr-bar"><a className="dr-btn dr-go" href={href}>{label}</a></div>;
}
