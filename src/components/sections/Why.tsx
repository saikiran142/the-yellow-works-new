import { whyPoints } from "@/config/content";
import { Icon } from "@/components/ui/Icon";

/** One oversized statement, then an asymmetric list. Deliberately not a card grid. */
export function Why() {
  return (
    <section className="sec why" id="why">
      <div className="w">
        <h2 className="big">Not just built to look good. Built to <span className="sw">work.</span></h2>
        <ul>
          {whyPoints.map((p) => (
            <li key={p.title}>
              <Icon name={p.icon} />
              <div><b>{p.title}</b><span>{p.text}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
