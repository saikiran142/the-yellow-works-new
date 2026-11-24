"use client";

import { useId } from "react";
import { days, timelines, timesOfDay } from "@/config/demo-realty";
import { useEnquirySubmit } from "@/platform/use-enquiry-submit";

/**
 * Site-visit request. Uses the shared submit flow from the platform, tagged `demo-realty`.
 * The property (if any) is carried in the message. Labelled as a concept so nobody is misled.
 */
export function SiteVisitForm({ property }: { property?: string }) {
  const id = useId();
  const { errors, status, message, nameRef, phoneRef, onSubmit } = useEnquirySubmit({
    source: "demo-realty",
    type: "realty",
    build: (f) => {
      const day = String(f.get("day") ?? "");
      const time = String(f.get("time") ?? "");
      const timeline = String(f.get("timeline") ?? "");
      const note = String(f.get("note") ?? "");
      return {
        business: property ?? "General enquiry",
        city: `${day}, ${time}`,
        message: `Site visit request. Property: ${property ?? "not chosen"}. Day: ${day}. Time: ${time}. Timeline: ${timeline}. ${note}`.trim(),
      };
    },
  });

  return (
    <form className={`dr-form${status === "sent" ? " sent" : ""}`} noValidate onSubmit={onSubmit} aria-label="Schedule a site visit">
      <div className="dr-fields" style={{ display: "grid", gap: "1rem" }}>
        {property && <p className="dr-for">Visit: <strong>{property}</strong></p>}
        <div className="dr-field">
          <label htmlFor={`${id}-n`}>Your name</label>
          <input ref={nameRef} className="dr-input" id={`${id}-n`} name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-ne` : undefined} />
          {errors.name && <p className="dr-err" id={`${id}-ne`}>{errors.name}</p>}
        </div>
        <div className="dr-field">
          <label htmlFor={`${id}-p`}>Mobile number</label>
          <input ref={phoneRef} className="dr-input" id={`${id}-p`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10 digits" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-pe` : undefined} />
          {errors.phone && <p className="dr-err" id={`${id}-pe`}>{errors.phone}</p>}
        </div>
        <div className="dr-two">
          <div className="dr-field">
            <label htmlFor={`${id}-d`}>Preferred day</label>
            <select className="dr-input" id={`${id}-d`} name="day" defaultValue="Any day">
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="dr-field">
            <label htmlFor={`${id}-t`}>Preferred time</label>
            <select className="dr-input" id={`${id}-t`} name="time" defaultValue="Morning">
              {timesOfDay.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="dr-field">
          <label htmlFor={`${id}-l`}>When are you looking to buy?</label>
          <select className="dr-input" id={`${id}-l`} name="timeline" defaultValue="Just exploring">
            {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="dr-field">
          <label htmlFor={`${id}-m`}>Anything we should know? (optional)</label>
          <textarea className="dr-input" id={`${id}-m`} name="note" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-me` : undefined} />
          {errors.message && <p className="dr-err" id={`${id}-me`}>{errors.message}</p>}
        </div>
        <div className="dr-hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p className="dr-consent">This is a concept website, not a real agency. Your details are used only to reply to this request. See the <a href="/privacy">privacy policy</a>.</p>
        <button className="dr-btn dr-go" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : status === "error" ? "Try again" : "Request a site visit"}</button>
        <div role="status" aria-live="polite">{status === "error" && <p className="dr-err">{message}</p>}</div>
      </div>
      <div className="dr-ok" role="status" aria-live="polite">
        <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#d9a441" /><path d="M19 33l9 9 17-19" fill="none" stroke="#12203f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <h3>Visit requested</h3>
        <p>Thank you. A real agency would now call you to confirm the visit. This is a concept project, so no one will call.</p>
      </div>
    </form>
  );
}
