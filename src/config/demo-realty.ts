/**
 * Haven Properties: a fictional concept real-estate agency made by The Yellow Works to show what a property website can do.
 * Everything here is sample content. No real agency, project, locality, price, person, address or phone number.
 */
export const agency = {
  name: "Haven Properties",
  phone: "[AGENCY_PHONE]",
  address: "[AGENCY_ADDRESS]",
  path: "/demos/real-estate",
} as const;

export type PropertyType = "Apartment" | "Villa" | "Plot";

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  locality: string;
  /** Sample price, labelled as sample wherever shown. */
  price: string;
  beds?: number;
  baths?: number;
  area: string;
  status: string;
  summary: string;
  highlights: string[];
  amenities: string[];
}

export const properties: Property[] = [
  {
    id: "greenfield-heights",
    name: "Greenfield Heights",
    type: "Apartment",
    locality: "[LOCALITY]",
    price: "₹ 85 lakh onwards",
    beds: 3, baths: 2, area: "1,450 sq ft",
    status: "Ready to move",
    summary: "A bright 3-bedroom apartment in a quiet gated community, close to schools and daily shopping.",
    highlights: ["East-facing balcony", "Two covered parking spaces", "Reserved water supply"],
    amenities: ["Gated entry", "Lift", "Power backup", "Children’s play area", "Clubhouse", "Visitor parking"],
  },
  {
    id: "lakeview-residences",
    name: "Lakeview Residences",
    type: "Apartment",
    locality: "[LOCALITY]",
    price: "₹ 62 lakh onwards",
    beds: 2, baths: 2, area: "1,080 sq ft",
    status: "Under construction",
    summary: "Compact 2-bedroom homes planned around a landscaped courtyard, handover planned in phases.",
    highlights: ["Landscaped courtyard", "Planned phased handover", "Good light and cross-ventilation"],
    amenities: ["Gated entry", "Lift", "Power backup", "Jogging track", "Gym", "Visitor parking"],
  },
  {
    id: "maple-court-villa",
    name: "Maple Court Villa",
    type: "Villa",
    locality: "[LOCALITY]",
    price: "₹ 1.9 crore",
    beds: 4, baths: 4, area: "2,800 sq ft",
    status: "Ready to move",
    summary: "A 4-bedroom independent villa with a private garden and a family room that opens outdoors.",
    highlights: ["Private garden", "Separate family room", "Space for three cars"],
    amenities: ["Gated community", "24-hour security", "Park", "Clubhouse", "Power backup", "Rainwater harvesting"],
  },
  {
    id: "sunrise-plots",
    name: "Sunrise Plots",
    type: "Plot",
    locality: "[LOCALITY]",
    price: "₹ 34 lakh onwards",
    area: "200 to 400 sq yd",
    status: "Open for site visits",
    summary: "Open plots in a planned layout with wide roads and utilities laid out, ready for your own design.",
    highlights: ["Planned layout, wide roads", "Utilities laid out", "Clear plot boundaries"],
    amenities: ["Internal roads", "Street lighting", "Drainage", "Water line", "Green belt"],
  },
];

export const filters = ["All", "Apartment", "Villa", "Plot"] as const;

export const reasons = [
  { title: "Straight answers", text: "We tell you what a property is, what it costs, and what to check before you decide." },
  { title: "Visits that fit your week", text: "Pick a day and a time. We meet you there and answer questions on the spot." },
  { title: "Help with the next step", text: "From shortlisting to paperwork questions, we point you to the right people." },
] as const;

export const visitSteps = [
  { title: "Choose a property", text: "Browse homes and plots, and save the ones you like." },
  { title: "Request a site visit", text: "Tell us the day and time that suit you. It takes under a minute." },
  { title: "Visit with an advisor", text: "We confirm by phone and meet you at the property." },
] as const;

/** Fictional advisors. Initials stand in for photographs: no real people and no AI-generated faces. */
export const advisors = [
  { initials: "PR", name: "Priya Reddy", role: "Senior advisor, apartments", color: "#12203f" },
  { initials: "SV", name: "Sanjay Verma", role: "Advisor, villas and plots", color: "#2e4a8f" },
] as const;

export const faqs = [
  { q: "Is a site visit free?", a: "Sample answer: yes, requesting a visit costs nothing and there is no obligation. A real agency would state its own terms here." },
  { q: "Can I visit on a weekend?", a: "Yes. Choose a weekend day when you request your visit and we will do our best to fit it." },
  { q: "Do you help with home loans?", a: "Sample answer: we can point you to lenders and explain the usual steps. A real agency would state exactly what it offers." },
  { q: "Are the prices final?", a: "No. Every price on this concept site is a sample. On a real site each price would be checked and dated." },
] as const;

export const days = ["This Saturday", "This Sunday", "A weekday evening", "Any day"] as const;
export const timesOfDay = ["Morning", "Afternoon", "Evening"] as const;
export const timelines = ["Looking to buy soon", "Within 3 months", "Just exploring"] as const;
