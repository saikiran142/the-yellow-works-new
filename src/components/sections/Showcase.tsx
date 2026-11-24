"use client";

import { useId, useState } from "react";
import { showcase } from "@/config/content";

/** Concept websites only, always labelled. Built as lightweight markup, not iframes. */
export function Showcase() {
  const [i, setI] = useState(0);
  const [phone, setPhone] = useState(false);
  const id = useId();
  const s = showcase[i];
  const rows = phone ? [...s.rows, ...s.rows] : s.rows;

  return (
    <section className="sec show" id="work">
      <div className="w">
        <h2 className="h2">What your website could look like.</h2>
        <p className="lead">Three concept websites, one for each industry we start with. They are concept projects, not client work.</p>
        <div className="sh-top">
          <div className="tabs" role="tablist" aria-label="Industry" style={{ margin: 0 }}>
            {showcase.map((x, n) => (
              <button key={x.tab} role="tab" id={`${id}-t${n}`} aria-selected={n === i} aria-controls={`${id}-p`} onClick={() => setI(n)}>{x.tab}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
            <span className="tag t-c">Concept project</span>
            <button className="btn b-d" aria-pressed={phone} style={{ minHeight: "2.5rem", padding: ".5rem 1rem" }} onClick={() => setPhone((p) => !p)}>{phone ? "Desktop view" : "Phone view"}</button>
          </div>
        </div>
        <div className={`bframe${phone ? " ph2" : ""}`} id={`${id}-p`} role="tabpanel" aria-labelledby={`${id}-t${i}`} style={{ ["--bf" as string]: s.accent }}>
          <div className="bbar"><span className="dots"><i /><i /><i /></span><span className="url">{s.url}</span></div>
          <div className="sv">
            <div className="nm">{s.name}</div>
            <div className="hhx" style={{ ["--hx" as string]: s.text }}>{s.hero}</div>
            <div className="rw">
              {rows.map((t, n) => (
                <div key={`${t}-${n}`} style={{ display: "flex", alignItems: "flex-end", padding: ".6rem", font: "600 clamp(.7rem,1.3vw,.95rem) var(--yw-font-body)" }}>{t}</div>
              ))}
            </div>
            <div className="rw" style={{ gridTemplateColumns: "1fr" }}><div style={{ background: "var(--yw-dusk)", height: 40 }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
