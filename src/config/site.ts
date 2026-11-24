/**
 * Business facts. Only confirmed values live here. Anything unconfirmed is a named placeholder
 * and is read from environment variables, so nothing invented can reach the page.
 */
const env = (v: string | undefined) => (v && v.trim() !== "" ? v.trim() : undefined);

export const site = {
  name: "The Yellow Works",
  tagline: "Good businesses deserve to be seen.",
  positioning: "We design digital experiences that get local businesses noticed, trusted and chosen.",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://theyellowworks.com",
  email: "contact@theyellowworks.com",
  locale: "en-IN",
  /** Undefined until the owner confirms the number (decision D-12). */
  whatsappNumber: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  /** Undefined until the owner confirms the target city (decision D-12). */
  city: env(process.env.NEXT_PUBLIC_TARGET_CITY),
} as const;

export const placeholders = {
  whatsapp: "[WHATSAPP_NUMBER]",
  city: "[TARGET_CITY]",
  timeline: "[TIMELINE_PLACEHOLDER]",
  updatePolicy: "[UPDATE_POLICY_PLACEHOLDER]",
  supportTerms: "[SUPPORT_TERMS_PLACEHOLDER]",
} as const;

/** Search engines are kept out until the owner sets NEXT_PUBLIC_ALLOW_INDEXING=true at launch. */
export const indexingAllowed = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

/** Privacy-friendly analytics. Nothing loads unless a provider and domain are configured AND the visitor accepts. */
export const analytics = {
  provider: env(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER), // "plausible" is the only adapter built
  domain: env(process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN),
} as const;
export const analyticsConfigured = analytics.provider === "plausible" && !!analytics.domain;
