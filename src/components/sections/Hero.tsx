import { HeroStage } from "@/components/three/HeroStage";
import { tickerItems } from "@/config/content";

/** Headline, copy and CTAs are server-rendered and visible from first paint. They never wait for the scene. */
export function Hero() {
  return (
    <>
      <section className="hero dark" id="top">
        <div className="w">
          <div>
            <p className="tagline">The digital growth studio for local business</p>
            <h1>Make your business <span className="sw">the one they choose.</span></h1>
            <p className="sub">We build bold, fast and mobile-friendly websites for clinics, gyms and real-estate businesses. Get discovered, build trust and turn more website visitors into genuine enquiries.</p>
            <div className="ctas">
              <a className="btn b-y" href="#contact">Let’s build your website</a>
              <a className="btn b-o" href="#work">Explore our work</a>
            </div>
          </div>
          <HeroStage />
        </div>
      </section>
      <div className="tick-w" aria-hidden="true">
        <div className="tick">
          <div className="run">
            {[0, 1].map((k) => (
              <span key={k}>
                {tickerItems.map((t) => (
                  <span key={t} style={{ display: "contents" }}>{t} <i /></span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
