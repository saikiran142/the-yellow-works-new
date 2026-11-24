import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildSiteMetadata } from "@/platform/metadata";
import { SiteRenderer } from "@/platform/SiteRenderer";
import { getSite, sites } from "@/sites";

export const dynamicParams = false;

export function generateStaticParams() {
  return sites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const site = getSite((await params).slug);
  return site ? buildSiteMetadata(site) : {};
}

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const site = getSite((await params).slug);
  if (!site) notFound();
  return <SiteRenderer site={site} />;
}
