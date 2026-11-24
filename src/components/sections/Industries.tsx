"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { industries, type IndustryKey } from "@/config/content";
import { Icon } from "@/components/ui/Icon";

/** Desktop: copy scrolls on the left while the right stays pinned and the tint shifts mint, coral, cobalt. Mobile: stacked tinted panels, no pinning. */
export function Industries() {
  const [active, setActive] = useState<IndustryKey>("clinic");
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const current = industries.find((i) => i.key === active) ?? industries[0];

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.getAttribute("data-i") as IndustryKey); }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const p = current.phone;
  return (
    <section className="ind" id="industries" style={{ ["--tint" as string]: current.tint, ["--on" as string]: current.on }}>
      <div className="w">
        <div className="ind-c">
          <h2 className="sr">Industries we serve</h2>
          {industries.map((ind) => (
            <section key={ind.key} data-i={ind.key} ref={(el) => { refs.current[ind.key] = el; }}>
              <div className="k">{ind.label}</div>
              <h3 style={{ fontSize: "var(--yw-text-h2)", margin: "0 0 var(--yw-space-4)", maxWidth: "14ch" }}>{ind.headline[0]}<span className="sw">{ind.headline[1]}</span></h3>
              <p>{ind.body}</p>
              <div className="chips">
                {ind.features.map((f, i) => (
                  <span key={f} className="chip">
                    {ind.key === "clinic" && i === 0 && <Icon name="user" />}
                    {ind.key === "clinic" && i === 2 && <Icon name="calendar" />}
                    {f}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="ind-s" aria-hidden="true">
          <Image className="obj" src={current.object} alt="" width={900} height={900} sizes="(min-width: 1024px) 18vw, 0px" />
          <div className="ph">
            <div className="scr">
              <h4>{p.title}</h4>
              <div style={{ color: "#16142b99", fontSize: 12 }}>Sample screen, not real data</div>
              <div className="row">{p.rows.map((r, i) => <span key={r} className={i === 1 ? "on" : ""}>{r}</span>)}</div>
              <div className="row">{p.slots.map((r, i) => <span key={r} className={i === 1 ? "on" : ""}>{r}</span>)}</div>
              <div className="go">{p.cta}</div>
              <div className="note">
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: current.tint, display: "grid", placeItems: "center", color: current.on }}><Icon name="check" style={{ width: 14, height: 14 }} /></span>
                {p.note}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
