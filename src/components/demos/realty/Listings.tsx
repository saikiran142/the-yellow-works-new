"use client";

import Link from "next/link";
import { useState } from "react";
import { agency, filters, properties, type PropertyType } from "@/config/demo-realty";
import { PropertyArt } from "./PropertyArt";

/** Filter chips (real buttons with aria-pressed) over the sample properties. */
export function Listings() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = properties.filter((p) => filter === "All" || p.type === (filter as PropertyType));

  return (
    <div>
      <div className="dr-chips" role="group" aria-label="Filter by property type">
        {filters.map((f) => (
          <button key={f} type="button" className="dr-chip" aria-pressed={f === filter} onClick={() => setFilter(f)}>{f === "All" ? "All properties" : `${f}s`}</button>
        ))}
      </div>
      <p className="dr-count" role="status" aria-live="polite">{shown.length} {shown.length === 1 ? "property" : "properties"} shown. Prices are samples.</p>
      <div className="dr-cards">
        {shown.map((p) => (
          <article className="dr-card" key={p.id}>
            <Link href={`${agency.path}/${p.id}`} className="dr-card-link">
              <div className="dr-art"><PropertyArt type={p.type} label={`Illustration of ${p.name}`} /><span className="dr-status">{p.status}</span></div>
              <div className="dr-card-body">
                <p className="dr-type">{p.type} · {p.locality}</p>
                <h3>{p.name}</h3>
                <p className="dr-price">{p.price}</p>
                <p className="dr-facts">{p.beds ? `${p.beds} bed · ${p.baths} bath · ` : ""}{p.area}</p>
                <span className="dr-more">View details</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
