import { processSteps } from "@/config/content";
import { Icon } from "@/components/ui/Icon";

/** A real sequence, so numbered markers are correct here. */
export function Process() {
  return (
    <section className="sec proc" id="process">
      <div className="w">
        <h2 className="h2">How we work</h2>
        <p className="lead">Four steps, in plain language.</p>
        <ol className="steps" style={{ listStyle: "none", margin: "var(--yw-space-6) 0 0" }}>
          {processSteps.map((s, i) => (
            <li key={s.title} className="st">
              <span className="n" aria-hidden="true">{i + 1}</span>
              <div><h3>{s.title}</h3><p>{s.text}</p></div>
              <div className="ob" aria-hidden="true"><Icon name={s.icon} /></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
