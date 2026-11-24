import type { SiteConfig } from "@/platform/types";

/**
 * BrightPath Learning Centre: a fictional tuition centre. This whole website is the data below.
 * It was made with NO new component, style or page code: it is the proof that the platform works for a
 * new industry. Everything is sample content (no real centre, teacher, price, result or address).
 */
export const brightpath: SiteConfig = {
  slug: "brightpath",
  name: "BrightPath",
  descriptor: "Learning Centre",
  conceptBanner: "Concept project by",
  industry: "education",
  theme: {
    fontPair: "friendly",
    radius: "soft",
    colors: {
      ink: "#1f1b3a", muted: "#4b4870", surface: "#ffffff", tint: "#f3f0ff", line: "#d9d3f5",
      primary: "#4a3aa8", primaryInk: "#ffffff", accent: "#ff7a59", accentInk: "#1f1b3a",
      heroBg: "#2b2370", heroInk: "#ffffff", bookBg: "#4a3aa8", bookInk: "#ffffff", error: "#b3261e",
    },
  },
  nav: [
    { label: "Subjects", href: "#subjects" },
    { label: "Teachers", href: "#teachers" },
    { label: "Batches", href: "#batches" },
    { label: "Questions", href: "#faq" },
  ],
  cta: { label: "Book a free demo class", href: "#demo" },
  seo: {
    title: "BrightPath Learning Centre (concept project)",
    description: "A concept website for a fictional tuition centre, made with The Yellow Works website platform.",
  },
  contact: { phone: "[CENTRE_PHONE]", address: "[CENTRE_ADDRESS]" },
  footerNote: "A concept website made with The Yellow Works website platform. BrightPath, its teachers, batches and address are fictional.",
  sections: [
    {
      type: "hero",
      eyebrow: "Small-batch tuition, classes 6 to 10",
      headline: ["Learning that ", "sticks."],
      lead: "Friendly teachers, small batches and a clear plan for every child. Try a free demo class before you decide.",
      ctas: [
        { label: "Book a free demo class", href: "#demo" },
        { label: "See subjects", href: "#subjects", style: "outline" },
      ],
      cards: [
        { title: "Sample batch", value: "Maths, Class 9", note: "Mon, Wed, Fri · 17:30", icon: "book" },
        { title: "Demo class", value: "Saturday, 10:00", note: "Requested", icon: "calendar" },
      ],
    },
    { type: "band", items: ["Batches of 12 or fewer", "Weekly progress notes", "Doubt-clearing sessions", "Free demo class"] },
    {
      type: "cards",
      id: "subjects",
      title: "What we teach",
      intro: "Core subjects for classes 6 to 10, taught with plenty of practice and clear explanations.",
      items: [
        { icon: "target", title: "Mathematics", text: "Concepts first, then practice until it feels easy." },
        { icon: "lightbulb", title: "Science", text: "Physics, chemistry and biology with simple experiments and diagrams." },
        { icon: "book", title: "English", text: "Reading, writing and speaking with confidence." },
        { icon: "graduation", title: "Study skills", text: "Notes, revision and exam habits that last beyond one term." },
      ],
    },
    {
      type: "profiles",
      id: "teachers",
      title: "Your teachers",
      intro: "Teachers who know each child by name. These are sample profiles for the concept.",
      tone: "tint",
      people: [
        { initials: "AK", name: "Anita Kulkarni", role: "Mathematics", color: "#4a3aa8" },
        { initials: "RS", name: "Rohit Sen", role: "Science", color: "#2b2370" },
        { initials: "FA", name: "Farah Ali", role: "English and study skills", color: "#8a3fa0" },
      ],
    },
    {
      type: "steps",
      id: "how",
      title: "How it works",
      intro: "Three simple steps from curiosity to a plan that fits your child.",
      steps: [
        { title: "Try a free demo class", text: "Your child joins a real class, with no obligation." },
        { title: "A short level check", text: "A friendly check shows where to start and what to strengthen." },
        { title: "Your learning plan", text: "We suggest a batch and share a plan you can follow at home." },
      ],
    },
    {
      type: "schedule",
      id: "batches",
      title: "Sample batches",
      intro: "A sample weekly timetable. Real batches would be planned around your child’s school day.",
      tone: "tint",
      days: [
        { day: "Monday", items: [["17:30", "Maths 9"], ["19:00", "Science 8"]] },
        { day: "Tuesday", items: [["17:30", "English 7"], ["19:00", "Maths 10"]] },
        { day: "Wednesday", items: [["17:30", "Maths 9"], ["19:00", "Science 10"]] },
        { day: "Thursday", items: [["17:30", "English 8"], ["19:00", "Study skills"]] },
        { day: "Friday", items: [["17:30", "Maths 9"], ["19:00", "Science 9"]] },
        { day: "Saturday", items: [["10:00", "Demo classes"], ["11:30", "Doubt clearing"]] },
      ],
    },
    {
      type: "faq",
      title: "Common questions",
      items: [
        { q: "Is the demo class really free?", a: "Sample answer: yes, with no obligation. A real centre would state its own terms here." },
        { q: "What classes do you teach?", a: "Classes 6 to 10 in this sample, in Maths, Science and English." },
        { q: "How big are the batches?", a: "Twelve students or fewer, so every child gets attention." },
        { q: "How will I know how my child is doing?", a: "A short progress note every week, and a call whenever you want one." },
      ],
    },
    {
      type: "enquiry",
      id: "demo",
      title: "Book a free demo class",
      intro: "Tell us the class and subject, and when suits you. We’ll message to fix a time.",
      reassurance: "No payment. No commitment.",
      form: {
        source: "site-brightpath",
        type: "other",
        selects: [
          { name: "class", label: "Class", options: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"], defaultValue: "Class 9" },
          { name: "subject", label: "Subject", options: ["Mathematics", "Science", "English", "Study skills"], defaultValue: "Mathematics" },
          { name: "time", label: "Best time", options: ["Weekday evening", "Saturday morning", "Any time"], defaultValue: "Any time" },
        ],
        messageTemplate: "Demo class request. Class: {class}. Subject: {subject}. Preferred time: {time}. {note}",
        businessFrom: "subject",
        cityFrom: "time",
        submitLabel: "Book my demo class",
        successTitle: "Demo class requested",
        successText: "Thank you. A real centre would now message you to fix the class. This is a concept project, so no one will be in touch.",
        consent: "This is a concept website, not a real centre. Your details are used only to reply to this request.",
      },
    },
  ],
};
