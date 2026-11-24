import type { Metadata } from "next";
import { indexingAllowed, site } from "@/config/site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: websites for clinics, gyms and real-estate businesses`, template: `%s | ${site.name}` },
  description: `The Yellow Works designs bold, fast, mobile-friendly websites for local businesses${site.city ? ` in ${site.city}` : ""}, so they get discovered, build trust and turn visitors into genuine enquiries.`,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: site.url,
    title: `${site.name}: ${site.tagline}`,
    description: site.positioning,
    images: [{ url: "/brand/png/og-1200x630.png", width: 1200, height: 630, alt: `${site.name}. ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image", title: `${site.name}: ${site.tagline}`, description: site.positioning, images: ["/brand/png/og-1200x630.png"] },
  icons: { icon: [{ url: "/brand/favicon.svg", type: "image/svg+xml" }, { url: "/brand/favicon.ico", sizes: "any" }], apple: "/brand/png/apple-touch-icon-180.png" },
  // Kept out of search results until NEXT_PUBLIC_ALLOW_INDEXING=true is set at launch.
  robots: indexingAllowed ? { index: true, follow: true } : { index: false, follow: false },
};

/** Organization only. No address, phone or reviews are invented; add LocalBusiness data only once verified. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/png/mark-color-1024.png`,
    email: site.email,
    slogan: site.tagline,
    // Phone only because the owner supplied and confirmed it. No address, so no LocalBusiness data yet.
    ...(site.whatsappNumber
      ? { contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: site.whatsappNumber.replace(/[^\d+]/g, ""), areaServed: "IN", availableLanguage: "English" } }
      : {}),
    ...(site.city ? { areaServed: { "@type": "City", name: site.city } } : {}),
  };
}
