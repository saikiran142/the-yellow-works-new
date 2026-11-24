import { pipeline } from "@/config/content";

/** Everything not built yet is labelled "Coming next". The CRM is not implied to be available. */
export function Vision() {
  return (
    <section className="sec vis" id="vision">
      <div className="w">
        <h2 className="h2">Your website is the beginning. Growth is the bigger picture.</h2>
        <p className="lead">We are working toward smarter lead management, follow-ups and business automation. None of that is available yet: what you can buy today is the website.</p>
        <ul className="pipe" aria-label="Where a visitor goes">
          <li className="tok" aria-hidden="true" />
          {pipeline.map((p) => (
            <li key={p.label} className="stg">
              {p.label}
              <span className={`tag${p.live ? "" : " t-n"}`}>{p.live ? "Available now" : "Coming next"}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
