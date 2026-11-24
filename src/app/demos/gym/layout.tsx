import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "@/styles/demo-gym.css";

// The demo has its own type, separate from The Yellow Works and the clinic demo.
const display = Barlow_Condensed({ subsets: ["latin"], variable: "--font-barlow-c", display: "swap", weight: ["800"] });
const body = Barlow({ subsets: ["latin"], variable: "--font-barlow", display: "swap", weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "IronCore Fitness (concept project)",
  description: "A concept website for a fictional gym, made by The Yellow Works to show what a gym website can do.",
  alternates: { canonical: "/demos/gym" },
  // Demo work stays out of search results.
  robots: { index: false, follow: false },
  openGraph: { title: "IronCore Fitness (concept project)", description: "A concept gym website by The Yellow Works." },
};

export default function GymDemoLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable} dg`}>{children}</div>;
}
