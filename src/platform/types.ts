/**
 * The Yellow Works website platform: one typed description of a client website.
 * A site is DATA (this file's types) rendered by shared components. To make a new site you write a config,
 * you do not write components. See docs/PLATFORM.md and docs/CLIENT_ONBOARDING.md.
 */

/** Colours and shape. Every pair that carries text is contrast-checked by the test suite (see theme.test.ts). */
export interface Theme {
  /** One of the font pairs in fonts.ts. */
  fontPair: "friendly" | "athletic" | "modern";
  radius: "soft" | "sharp";
  colors: {
    ink: string;        // body text on surface
    muted: string;      // secondary text on surface and tint
    surface: string;    // page background
    tint: string;       // soft alternate section background
    line: string;       // hairlines and borders
    primary: string;    // brand colour: headings accents, badges, steps
    primaryInk: string; // text on primary
    accent: string;     // the one action colour: main buttons
    accentInk: string;  // text on accent
    heroBg: string;     // hero background
    heroInk: string;    // text on hero
    bookBg: string;     // enquiry section background
    bookInk: string;    // text on enquiry section
    error: string;
  };
}

export type IconKey =
  | "check" | "zap" | "compass" | "calendar" | "message" | "hand" | "smile" | "shield" | "sparkles"
  | "ruler" | "steth" | "baby" | "book" | "graduation" | "target" | "users" | "lightbulb" | "clock" | "pin";

export interface Cta { label: string; href: string; style?: "primary" | "outline" }

export interface HeroCard { title: string; value: string; note: string; icon?: IconKey }

export interface HeroSection {
  type: "hero";
  eyebrow?: string;
  /** Headline in two parts; the second part is highlighted in the brand colour. */
  headline: [string, string];
  lead: string;
  ctas: Cta[];
  /** Up to two floating interface cards (sample data only, labelled as such). */
  cards?: HeroCard[];
}

export interface BandSection { type: "band"; items: string[] }

export interface CardItem {
  icon?: IconKey;
  title: string;
  text: string;
  /** Shown large, for example a sample price. */
  price?: string;
  priceNote?: string;
  perks?: string[];
  featured?: boolean;
  featuredLabel?: string;
  cta?: Cta;
}
export interface CardsSection {
  type: "cards";
  id: string;
  title: string;
  intro?: string;
  tone?: "plain" | "tint";
  items: CardItem[];
  footnote?: string;
}

export interface Person { initials: string; name: string; role: string; color: string }
export interface ProfilesSection { type: "profiles"; id: string; title: string; intro?: string; tone?: "plain" | "tint"; people: Person[] }

export interface StepsSection { type: "steps"; id: string; title: string; intro?: string; tone?: "plain" | "tint"; steps: { title: string; text: string }[] }

export interface ScheduleSection {
  type: "schedule";
  id: string;
  title: string;
  intro?: string;
  tone?: "plain" | "tint";
  days: { day: string; items: [time: string, label: string][] }[];
}

export interface GallerySection { type: "gallery"; id: string; title: string; intro?: string; count?: number }

export interface HoursSection {
  type: "hours";
  id: string;
  title: string;
  intro?: string;
  tone?: "plain" | "tint";
  rows: [label: string, value: string][];
}

export interface FaqSection { type: "faq"; title: string; tone?: "plain" | "tint"; items: { q: string; a: string }[] }

export interface FormSelect { name: string; label: string; options: string[]; defaultValue?: string; emptyLabel?: string }

/** Everything the shared enquiry form needs. The receiver, validation and spam protection are the same for every site. */
export interface EnquiryForm {
  /** Tag stored with each enquiry so the owner knows which site it came from. Must be `site-<slug>` or an allow-listed tag. */
  source: string;
  /** One of: clinic, gym, realty, other. */
  type: "clinic" | "gym" | "realty" | "other";
  selects: FormSelect[];
  /** Message sent with the enquiry. `{name}` tokens are replaced with the matching select values and the note. */
  messageTemplate: string;
  /** Which select goes in the "business" and "city" slots of the enquiry record (so they show in the sheet). */
  businessFrom?: string;
  cityFrom?: string;
  noteLabel?: string;
  submitLabel: string;
  successTitle: string;
  successText: string;
  consent: string;
}

export interface EnquirySection {
  type: "enquiry";
  id: string;
  title: string;
  intro: string;
  reassurance?: string;
  form: EnquiryForm;
}

export type Section =
  | HeroSection | BandSection | CardsSection | ProfilesSection | StepsSection
  | ScheduleSection | GallerySection | HoursSection | FaqSection | EnquirySection;

export interface SiteSeo { title: string; description: string; noindex?: boolean }

export interface SiteConfig {
  /** URL-safe id. The site is served at /sites/<slug>. */
  slug: string;
  name: string;
  /** Short label under the name in the header. */
  descriptor: string;
  /** Concept sites carry a visible banner. Real client sites set this to undefined. */
  conceptBanner?: string;
  industry: "clinic" | "gym" | "realty" | "education" | "other";
  theme: Theme;
  nav: { label: string; href: string }[];
  /** Header and sticky-bar action. */
  cta: { label: string; href: string };
  seo: SiteSeo;
  /** Contact details shown in the footer. Placeholders until the client confirms them. */
  contact: { phone: string; address: string };
  sections: Section[];
  footerNote: string;
}
