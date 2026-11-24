import type { Metadata } from "next";
import { Sora, Source_Sans_3 } from "next/font/google";
import "@/styles/demo-clinic.css";

// The demo has its own type, separate from The Yellow Works.
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap", weight: ["600", "700"] });
const source = Source_Sans_3({ subsets: ["latin"], variable: "--font-source", display: "swap", weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Greenleaf Dental Clinic (concept project)",
  description: "A concept website for a fictional dental clinic, made by The Yellow Works to show what a clinic website can do.",
  alternates: { canonical: "/demos/clinic" },
  // Demo work stays out of search results.
  robots: { index: false, follow: false },
  openGraph: { title: "Greenleaf Dental Clinic (concept project)", description: "A concept clinic website by The Yellow Works." },
};

export default function ClinicDemoLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${sora.variable} ${source.variable} dc`}>{children}</div>;
}
