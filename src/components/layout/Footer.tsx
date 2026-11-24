import Image from "next/image";
import { site, placeholders } from "@/config/site";

export function Footer() {
  return (
    <footer className="foot dark">
      <div className="w">
        <div className="cols">
          <div>
            <Image src="/brand/lockup-horizontal-reversed.svg" alt={site.name} width={320} height={72} style={{ height: 44, width: "auto" }} unoptimized />
            <p style={{ marginTop: "1rem" }}>{site.tagline}</p>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#services">Services</a><a href="#industries">Industries</a><a href="#work">Our work</a><a href="#why">About</a><a href="#contact">Contact</a>
          </div>
          <div>
            <h3>Industries</h3>
            <a href="#industries">Clinic websites</a><a href="#industries">Gym websites</a><a href="#industries">Real-estate websites</a>
          </div>
          <div>
            <h3>Contact</h3>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href="#contact">{site.whatsappNumber ?? placeholders.whatsapp}</a>
            {/* Social links render only when configured. None are configured yet. */}
          </div>
        </div>
        <div className="word" aria-hidden="true">The <span className="sw">Yellow</span> Works</div>
        <div className="legal">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span><a href="/privacy">Privacy policy</a></span>
        </div>
      </div>
    </footer>
  );
}
