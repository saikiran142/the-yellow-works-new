import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { defaultMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

// Two families, Latin subset, only the axes and weights actually used.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap", axes: ["opsz"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap", weight: ["400", "500", "600"] });

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = { themeColor: "#16142B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <ConsentBanner />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
      </body>
    </html>
  );
}
