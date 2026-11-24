import { placeholders } from "./site";

/** Page copy and structured content, kept apart from presentation. */

export const navigation = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Our work", href: "#work" },
  { label: "About", href: "#why" },
  { label: "Contact", href: "#contact" },
] as const;

/** Hero headline endings. The first is server-rendered; typing cycles through all three. */
export const heroPhrases = ["the one they choose.", "the name locals trust.", "easy to find, hard to forget."] as const;

export const tickerItems = ["CLINICS", "GYMS", "REAL ESTATE", "LOCAL BRANDS", "GROWING BUSINESSES"] as const;

export type IndustryKey = "clinic" | "gym" | "realty";

export interface Industry {
  key: IndustryKey;
  label: string;
  /** Headline split so the highlighter swipe sits on the last part. */
  headline: [string, string];
  body: string;
  features: string[];
  tint: string;
  on: string;
  phone: { title: string; rows: string[]; slots: string[]; cta: string; note: string };
  object: string;
}

export const industries: Industry[] = [
  {
    key: "clinic",
    label: "Clinics",
    headline: ["Build trust before ", "the first visit."],
    body: "A clear, calm website for your clinic: who you are, what you treat, and an easy way to ask for an appointment.",
    features: ["Doctor profiles", "Services and treatments", "Appointment requests", "Location", "WhatsApp enquiry", "Contact details"],
    tint: "var(--yw-mist)",
    on: "var(--yw-dusk)",
    phone: { title: "Book an appointment", rows: ["Mon", "Tue", "Wed"], slots: ["9:30", "10:15", "11:00"], cta: "Request appointment", note: "Appointment requested" },
    object: "/3d/icon-appointment-card.png",
  },
  {
    key: "gym",
    label: "Gyms",
    headline: ["Turn interest into ", "memberships."],
    body: "Show your plans, trainers and classes, and make a trial one tap away.",
    features: ["Membership plans", "Trainer profiles", "Class schedules", "Trial requests", "Fitness gallery", "Enquiry forms"],
    tint: "var(--yw-butter)",
    on: "var(--yw-dusk)",
    phone: { title: "Join a gym", rows: ["Monthly", "Annual"], slots: ["Trial", "Plan"], cta: "Start a free trial", note: "Trial booked" },
    object: "/3d/icon-kettlebell.png",
  },
  {
    key: "realty",
    label: "Real estate",
    headline: ["Put properties in front of ", "the right buyers."],
    body: "Showcase listings and projects, and turn interest into booked site visits.",
    features: ["Property showcases", "Project galleries", "Property enquiry forms", "Site-visit requests", "Location details", "Contact options"],
    tint: "var(--yw-slate)",
    on: "var(--yw-paper)",
    phone: { title: "Schedule a site visit", rows: ["Fri", "Sat", "Sun"], slots: ["11:00", "2:30"], cta: "Request site visit", note: "Site visit Saturday 11:00" },
    object: "/3d/icon-appointment-card.png",
  },
];

/** Fictional businesses, clearly labelled as concept work wherever shown. */
export const scenarios = [
  {
    tab: "A patient looking for a clinic",
    accent: "var(--yw-mist)",
    before: { name: "Greenleaf Dental Clinic", text: "Welcome to our clinic. We offer many services. Click here to see more.", cta: "Contact Us" },
    after: { name: "Greenleaf Dental Clinic", text: "Gentle, modern dental care. Book a check-up in under a minute.", cta: "Request appointment" },
    chips: ["9:30", "10:15", "11:00", "2:45"],
  },
  {
    tab: "A customer looking for a gym",
    accent: "var(--yw-butter)",
    before: { name: "IronCore Fitness", text: "We have a gym. Equipment and trainers available. Call for prices.", cta: "Click Here" },
    after: { name: "IronCore Fitness", text: "Find your plan, meet your trainer, start with a free trial.", cta: "Start a free trial" },
    chips: ["Monthly", "Annual", "Trial"],
  },
  {
    tab: "A buyer looking for a property",
    accent: "var(--yw-slate)",
    before: { name: "Haven Properties", text: "Properties for sale. See list below. Contact the office.", cta: "Enquire" },
    after: { name: "Haven Properties", text: "Find the right home. Book a site visit for Saturday.", cta: "Schedule a site visit" },
    chips: ["Fri", "Sat", "Sun"],
  },
] as const;

export const journey = [
  { title: "Search", text: "They look for what they need, on their phone." },
  { title: "Trust", text: "A clear, fast site tells them you are real and capable." },
  { title: "Enquire", text: "One obvious step: a form, a call or a WhatsApp message." },
] as const;

export const services = [
  { id: "design", title: "Website design and development", text: "A fast, good-looking website that makes people want to get in touch, on every phone and screen.", get: ["Pages designed around your services", "Mobile-first layout", "Clear enquiry buttons"], icon: "browser" },
  { id: "landing", title: "Landing page development", text: "One focused page for one job: a campaign, an offer or a new service.", get: ["One clear message", "Fast to load", "Built to collect enquiries"], icon: "none" },
  { id: "seo", title: "Local SEO foundations", text: "Help the people nearby find you when they search.", get: ["Search-friendly structure", "Page titles and descriptions", "Search Console set-up"], icon: "pin" },
  { id: "speed", title: "Website optimisation", text: "Faster pages, tidier images, smoother phones.", get: ["Speed and image tuning", "Accessibility checks"], icon: "gauge" },
  { id: "leads", title: "Lead capture and WhatsApp integration", text: "Make it easy to ask: enquiry forms and a WhatsApp button that opens a ready-to-send message.", get: ["Enquiry form with clear errors", "WhatsApp message button", "Enquiries sent to you"], icon: "chat" },
  { id: "care", title: "Website maintenance and support", text: "Updates, fixes and a person to ask when something needs changing.", get: [placeholders.supportTerms], icon: "wrench" },
] as const;

export const showcase = [
  { tab: "Clinic", accent: "var(--yw-mist)", text: "var(--yw-dusk)", url: "greenleaf-dental.example", name: "Greenleaf Dental Clinic", hero: "Gentle, modern dental care", rows: ["Check-ups", "Whitening", "Emergency visits"] },
  { tab: "Gym", accent: "var(--yw-butter)", text: "var(--yw-dusk)", url: "ironcore-fitness.example", name: "IronCore Fitness", hero: "Find your plan. Start free.", rows: ["Monthly plan", "Meet the trainers", "Class schedule"] },
  { tab: "Real estate", accent: "var(--yw-slate)", text: "var(--yw-paper)", url: "haven-properties.example", name: "Haven Properties", hero: "Homes worth a visit", rows: ["2 BHK, new build", "Villa with garden", "Plot near the highway"] },
] as const;

export const whyPoints = [
  { title: "Customer-focused design", text: "Every page starts from what your customer is trying to do.", icon: "user" },
  { title: "Mobile-first experience", text: "Designed on a phone first, then scaled up.", icon: "phone" },
  { title: "Clear calls to action", text: "One obvious next step on every screen.", icon: "arrow" },
  { title: "Search-friendly foundations", text: "Built so search engines can read and rank it.", icon: "search" },
  { title: "Easy enquiry options", text: "A form, a call or WhatsApp, whichever they prefer.", icon: "chat" },
  { title: "Reusable, maintainable build", text: "Clean building blocks make updates quicker and cheaper.", icon: "wrench" },
] as const;

export const processSteps = [
  { title: "Discover", text: "We learn about your business, your customers and what you want the website to do.", icon: "search" },
  { title: "Design", text: "You see how your site will look and feel on a phone and on a computer before we build it.", icon: "pencil" },
  { title: "Develop", text: "We build it to be fast, easy to use and ready to collect enquiries.", icon: "code" },
  { title: "Launch and grow", text: "We put it live, check that everything works, and help you improve it over time.", icon: "flag" },
] as const;

export const pipeline = [
  { label: "Website visit", live: true },
  { label: "Enquiry", live: true },
  { label: "Lead captured", live: false },
  { label: "Follow-up", live: false },
  { label: "Customer", live: false },
] as const;

export const faqs = [
  { q: "How long does a website take?", a: placeholders.timeline },
  { q: "What information do you need from us?", a: "Your business details, services, contact information and any photos you have. We guide you through the rest." },
  { q: "Will the website work on mobile?", a: "Yes. Every site is designed for phones first, then scaled up for tablets and computers." },
  { q: "Will the website be SEO-friendly?", a: "Yes. We build in the foundations search engines look for: clean structure, fast pages, page titles and descriptions. We can’t promise a ranking." },
  { q: "Can I update my website later?", a: placeholders.updatePolicy },
  { q: "Do you provide website maintenance?", a: placeholders.supportTerms },
  { q: "Can I integrate WhatsApp?", a: "Yes. We can add a WhatsApp button that opens a ready-to-send message to your business number." },
  { q: "Can the website support appointment or enquiry forms?", a: "Yes. We can add enquiry and appointment-request forms, and have the requests sent to you." },
] as const;

export const businessTypes = [
  { key: "clinic", label: "Clinic", accent: "var(--yw-mist)", on: "var(--yw-dusk)" },
  { key: "gym", label: "Gym", accent: "var(--yw-butter)", on: "var(--yw-dusk)" },
  { key: "realty", label: "Real estate", accent: "var(--yw-slate)", on: "var(--yw-paper)" },
  { key: "other", label: "Other", accent: "var(--yw-sun)", on: "var(--yw-dusk)" },
] as const;
