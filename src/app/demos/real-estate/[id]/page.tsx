import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Check, Maximize2, MapPin } from "lucide-react";
import { ConceptBanner, RealtyFooter, RealtyHeader, StickyBar } from "@/components/demos/realty/Chrome";
import { PropertyArt } from "@/components/demos/realty/PropertyArt";
import { SiteVisitForm } from "@/components/demos/realty/SiteVisitForm";
import { agency, properties } from "@/config/demo-realty";

export const dynamicParams = false;

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = properties.find((x) => x.id === id);
  if (!p) return {};
  return {
    title: `${p.name} (concept project)`,
    description: `${p.type} at ${p.name}: ${p.summary} Concept listing, not a real property.`,
    alternates: { canonical: `${agency.path}/${p.id}` },
    robots: { index: false, follow: false },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = properties.find((x) => x.id === id);
  if (!p) notFound();
  const others = properties.filter((x) => x.id !== p.id).slice(0, 2);

  return (
    <>
      <ConceptBanner />
      <RealtyHeader />
      <main id="top">
        <div className="dr-wrap">
          <nav className="dr-crumbs" aria-label="Breadcrumb">
            <Link href={agency.path}>Home</Link><span aria-hidden="true"> / </span><Link href={`${agency.path}#listings`}>Properties</Link><span aria-hidden="true"> / </span><span aria-current="page">{p.name}</span>
          </nav>
        </div>

        <section className="dr-detail" aria-labelledby="h1">
          <div className="dr-wrap dr-detail-grid">
            <div>
              <div className="dr-art dr-art-big"><PropertyArt type={p.type} label={`Illustration of ${p.name}`} /><span className="dr-status">{p.status}</span></div>
              <p className="dr-type" style={{ marginTop: "1.25rem" }}>{p.type} · {p.locality}</p>
              <h1 id="h1">{p.name}</h1>
              <p className="dr-price dr-price-big">{p.price} <small>sample price</small></p>
              <ul className="dr-factlist" aria-label="Key facts">
                {p.beds ? <li><BedDouble aria-hidden="true" size={22} strokeWidth={1.75} />{p.beds} bedrooms</li> : null}
                {p.baths ? <li><Bath aria-hidden="true" size={22} strokeWidth={1.75} />{p.baths} bathrooms</li> : null}
                <li><Maximize2 aria-hidden="true" size={22} strokeWidth={1.75} />{p.area}</li>
                <li><MapPin aria-hidden="true" size={22} strokeWidth={1.75} />{p.locality}</li>
              </ul>

              <h2>About this property</h2>
              <p className="dr-body">{p.summary}</p>
              <ul className="dr-ticks">{p.highlights.map((h) => (<li key={h}><Check aria-hidden="true" size={20} strokeWidth={2.25} />{h}</li>))}</ul>

              <h2>Amenities</h2>
              <ul className="dr-amen">{p.amenities.map((a) => (<li key={a}>{a}</li>))}</ul>

              <h2>Gallery</h2>
              <div className="dr-gal" role="img" aria-label="Placeholders for property photographs">
                <div>Photo<br />placeholder</div><div>Photo<br />placeholder</div><div>Photo<br />placeholder</div><div>Photo<br />placeholder</div>
              </div>

              <h2>Location</h2>
              <div className="dr-map" role="img" aria-label="Placeholder for a map"><span>Map goes here<br /><small>Placeholder for the concept</small></span></div>
            </div>

            <aside className="dr-side" id="visit" aria-labelledby="h-visit">
              <h2 id="h-visit">Schedule a site visit</h2>
              <p className="dr-body" style={{ marginBottom: "1rem" }}>Choose a day and time. We’ll call to confirm.</p>
              <SiteVisitForm property={p.name} />
            </aside>
          </div>
        </section>

        <section className="dr-sec dr-sky" aria-labelledby="h-more">
          <div className="dr-wrap">
            <h2 id="h-more">You may also like</h2>
            <div className="dr-cards">
              {others.map((o) => (
                <article className="dr-card" key={o.id}>
                  <Link href={`${agency.path}/${o.id}`} className="dr-card-link">
                    <div className="dr-art"><PropertyArt type={o.type} label={`Illustration of ${o.name}`} /><span className="dr-status">{o.status}</span></div>
                    <div className="dr-card-body"><p className="dr-type">{o.type} · {o.locality}</p><h3>{o.name}</h3><p className="dr-price">{o.price}</p><span className="dr-more">View details</span></div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <RealtyFooter />
      <StickyBar />
    </>
  );
}
