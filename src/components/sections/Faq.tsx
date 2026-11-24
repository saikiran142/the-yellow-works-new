"use client";

import { useId, useState } from "react";
import { faqs } from "@/config/content";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

/** Accessible accordion: real buttons inside headings with aria-expanded. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(2);
  const base = useId();
  const wa = whatsappLink(site.whatsappNumber);

  return (
    <section className="sec faq" id="faq">
      <div className="w">
        <div className="sticky">
          <h2 className="h2">Questions, answered.</h2>
          <p className="lead">Short, honest answers. Ask us anything else.</p>
        </div>
        <div>
          <div className="acc">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className="item" key={f.q}>
                  <h3>
                    <button className="q" id={`${base}-q${i}`} aria-expanded={isOpen} aria-controls={`${base}-a${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                      {f.q}<span className="pm" aria-hidden="true" />
                    </button>
                  </h3>
                  <div className={`a${isOpen ? " open" : ""}`} id={`${base}-a${i}`} role="region" aria-labelledby={`${base}-q${i}`}>
                    <div><p>{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="wacard">
            <b>Still have a question? Message us on WhatsApp</b>
            <a className="btn b-d" href={wa ?? "#contact"} {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Message us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
