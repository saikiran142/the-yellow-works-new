import { describe, expect, it } from "vitest";
import { buildSiteMetadata } from "./metadata";
import type { SiteConfig } from "./types";

const base = { slug: "demo-x", name: "Demo X", seo: { title: "Demo X", description: "A demo." } } as unknown as SiteConfig;

describe("buildSiteMetadata", () => {
  it("sets title, description, canonical and Open Graph", () => {
    const m = buildSiteMetadata(base);
    expect(m.title).toBe("Demo X");
    expect(m.alternates?.canonical).toBe("/sites/demo-x");
    expect(m.openGraph?.url).toBe("/sites/demo-x");
  });
  it("keeps sites out of search unless indexing is explicitly turned on", () => {
    expect(buildSiteMetadata(base).robots).toEqual({ index: false, follow: false });
    expect(buildSiteMetadata({ ...base, seo: { ...base.seo, noindex: false } }).robots).toEqual({ index: true, follow: true });
  });
});
