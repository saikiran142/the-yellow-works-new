import type { Metadata } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import "@/styles/demo-realty.css";

// The demo has its own type, separate from The Yellow Works and the other demos.
const display = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "optional", weight: ["800"] });
const body = Work_Sans({ subsets: ["latin"], variable: "--font-work", display: "optional", weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Haven Properties (concept project)",
  description: "A concept website for a fictional real-estate agency, made by The Yellow Works to show what a property website can do.",
  alternates: { canonical: "/demos/real-estate" },
  // Demo work stays out of search results.
  robots: { index: false, follow: false },
  openGraph: { title: "Haven Properties (concept project)", description: "A concept property website by The Yellow Works." },
};

export default function RealtyDemoLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable} dr`}>{children}</div>;
}
