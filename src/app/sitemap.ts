import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Only real, valuable pages. /privacy is a legal page and stays out. Add /services/, /clinic-websites/ and others only when they have real content. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
}
