"use client";

import { useState } from "react";
import { services } from "@/config/content";
import { Icon, type IconName } from "@/components/ui/Icon";

const tileClass = ["t1", "t2", "t3", "t4", "t5", "t6"] as const;
const iconFor: Record<string, IconName | undefined> = { pin: "pin", gauge: "gauge", chat: "chat", wrench: "wrench" };

/** Bento grid: varied tile sizes, one Dusk and one yellow tile set the rhythm. Tiles expand to "what you get". */
export function Services() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="sec serv" id="services">
      <div className="w">
        <h2 className="h2">Everything your business needs to be found, trusted and chosen.</h2>
        <p className="lead">Described by what it does for you, not by the technology.</p>
        <div className="bento">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            const icon = iconFor[s.icon];
            return (
              <div key={s.id} className={`tile ${tileClass[i]}`}>
                {icon && <Icon name={icon} style={{ width: 32, height: 32 }} />}
                <h3>{s.title}</h3>
                <p style={s.id === "design" ? { color: "var(--yw-text-on-dark-muted)", maxWidth: "44ch" } : undefined}>{s.text}</p>
                {s.id === "design" && (
                  <div className="mini" aria-hidden="true">
                    <div className="bb"><i /><i /><i /></div>
                    <div className="bv"><div className="hh" /><div /><div className="dd" /></div>
                  </div>
                )}
                <button className="more" aria-expanded={isOpen} aria-controls={`get-${s.id}`} onClick={() => setOpen(isOpen ? null : s.id)}>What you get</button>
                <div id={`get-${s.id}`} className={`get${isOpen ? " open" : ""}`}>
                  <ul>{s.get.map((g) => <li key={g}>{g}</li>)}</ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
