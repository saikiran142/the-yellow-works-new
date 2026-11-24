import { describe, expect, it } from "vitest";
import { failingPairs } from "@/platform/theme";
import type { EnquirySection } from "@/platform/types";
import { sites } from "./index";

/**
 * A linter for site configs. It runs for every registered site, so a client site cannot ship with unreadable
 * colours, a nav link to nowhere, a duplicate section id, or a form message that refers to a missing field.
 */
describe.each(sites.map((s) => [s.slug, s] as const))("site config: %s", (_slug, site) => {
  const ids = site.sections.flatMap((s) => ("id" in s ? [s.id] : []));
  const allIds = new Set(["top", "faq", ...ids]);

  it("has a url-safe unique slug", () => {
    expect(site.slug).toMatch(/^[a-z0-9-]{2,40}$/);
    expect(sites.filter((s) => s.slug === site.slug)).toHaveLength(1);
  });
  it("meets WCAG AA contrast on every text pairing in its theme", () => {
    expect(failingPairs(site.theme)).toEqual([]);
  });
  it("has unique section ids", () => {
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("only links to sections that exist", () => {
    for (const l of [...site.nav, site.cta]) {
      expect(l.href.startsWith("#")).toBe(true);
      expect(allIds.has(l.href.slice(1)), `missing target ${l.href}`).toBe(true);
    }
  });
  it("has exactly one hero, first, and an enquiry section", () => {
    expect(site.sections.filter((s) => s.type === "hero")).toHaveLength(1);
    expect(site.sections[0].type).toBe("hero");
    expect(site.sections.some((s) => s.type === "enquiry")).toBe(true);
  });
  it("tags enquiries site-<slug> and its message only uses fields that exist", () => {
    for (const s of site.sections.filter((x): x is EnquirySection => x.type === "enquiry")) {
      expect(s.form.source).toBe(`site-${site.slug}`);
      const names = new Set(s.form.selects.map((x) => x.name));
      const tokens = [...s.form.messageTemplate.matchAll(/\{([a-zA-Z0-9_-]+)\}/g)].map((m) => m[1]);
      for (const t of tokens) expect(t === "note" || names.has(t), `unknown token {${t}}`).toBe(true);
      if (s.form.businessFrom) expect(names.has(s.form.businessFrom)).toBe(true);
      if (s.form.cityFrom) expect(names.has(s.form.cityFrom)).toBe(true);
    }
  });
  it("keeps placeholders for unconfirmed contact details", () => {
    expect(site.contact.phone).toMatch(/^\[.+\]$/);
    expect(site.contact.address).toMatch(/^\[.+\]$/);
  });
});
