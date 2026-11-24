import type { Metadata } from "next";
import type { SiteConfig } from "./types";

/** One place that turns a site config into page metadata, so no site forgets a title, description or canonical URL. */
export function buildSiteMetadata(site: SiteConfig): Metadata {
  const path = `/sites/${site.slug}`;
  return {
    title: site.seo.title,
    description: site.seo.description,
    alternates: { canonical: path },
    robots: site.seo.noindex === false ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: { title: site.seo.title, description: site.seo.description, url: path, siteName: site.name },
  };
}
