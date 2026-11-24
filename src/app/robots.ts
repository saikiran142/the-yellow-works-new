import type { MetadataRoute } from "next";
import { indexingAllowed } from "@/config/site";
import { site } from "@/config/site";

/** Until the owner turns indexing on at launch, everything is disallowed. */
export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${site.url}/sitemap.xml` };
}
