import type { SiteConfig } from "@/platform/types";
import { brightpath } from "./brightpath";

/**
 * Every site the platform can serve. To add a client site: write its config file, add it here.
 * A client deployment can keep only its own entry (see docs/CLIENT_ONBOARDING.md).
 */
export const sites: SiteConfig[] = [brightpath];

export const getSite = (slug: string) => sites.find((s) => s.slug === slug);
