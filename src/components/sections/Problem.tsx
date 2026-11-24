"use client";

import { useId, useState } from "react";
import { journey, scenarios } from "@/config/content";

/** Three scenario tabs, each with a before and after slider. The slider is a range input, so it works with the keyboard, and has buttons. */
export function Problem() {
  const [tab, setTab] = useState(0);
  const [pos, setPos] = useState(50);
  const id = useId();
  const s = scenarios[tab];

  return (
    <section className="sec prob" id="problem">
      <div className="w">
        <h2 className="h2">Your customers are looking online. What are they finding?</h2>
        <p className="lead">When a website is slow, outdated or hard to use on a phone, people don’t work harder to understand you. They choose someone else.</p>
        <div className="tabs" role="tablist" aria-label="Scenario">
          {scenarios.map((x, i) => (
            <button key={x.tab} role="tab" id={`${id}-t${i}`} aria-selected={i === tab} aria-controls={`${id}-p`} onClick={() => setTab(i)}>{x.tab}</button>
          ))}
        </div>
        <div className="ba" role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${tab}`} style={{ ["--p" as string]: `${pos}%` }}>
          <div className="side after">
            <div className="mock">
              <div className="m-bar" style={{ ["--bar" as string]: s.accent, width: "34%", height: 16 }} />
              <div className="m-h">{s.after.name}</div>
              <div className="m-p">{s.after.text}</div>
              <div className="m-btn">{s.after.cta}</div>
            </div>
            <div className="m-art" style={{ ["--ac" as string]: s.accent }}>
              <div className="ch">{s.chips.map((c) => <i key={c}>{c}</i>)}</div>
            </div>
          </div>
          <div className="side before">
            <div className="mock">
              <div className="m-bar" style={{ ["--bar" as string]: "#999", width: "40%" }} />
              <div className="m-h">{s.before.name}</div>
              <div className="m-p">{s.before.text}</div>
              <div className="m-btn">{s.before.cta}</div>
            </div>
            <div className="m-art">[ image not found ]</div>
          </div>
          <span className="lbl l-b">Before: outdated</span>
          <span className="lbl l-a">After: concept</span>
          <div className="grip" />
          <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare before and after. Use the arrow keys." />
        </div>
        <div className="ba-ctl">
          <button className="btn b-d" onClick={() => setPos(100)}>Show before</button>
          <button className="btn b-y" onClick={() => setPos(0)}>Show after</button>
          <span className="tag t-c">Concept project: fictional businesses</span>
        </div>
        <div className="journey">
          {journey.map((j) => (
            <div key={j.title}>{j.title}<small>{j.text}</small></div>
          ))}
        </div>
      </div>
    </section>
  );
}
