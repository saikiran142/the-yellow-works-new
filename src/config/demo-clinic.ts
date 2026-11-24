/**
 * Greenleaf Dental Clinic: a fictional concept clinic made by The Yellow Works to show what a clinic website can do.
 * Everything here is sample content. No real clinic, person, address, phone number, price or review.
 */
export const clinic = {
  name: "Greenleaf Dental Clinic",
  descriptor: "Concept project",
  phone: "[CLINIC_PHONE]",
  address: "[CLINIC_ADDRESS]",
  path: "/demos/clinic",
} as const;

export const trustPoints = [
  "Clear explanations before any treatment",
  "Gentle, child-friendly visits",
  "Appointment reminders by message",
  "Easy to reach, easy to book",
] as const;

export const services = [
  { id: "checkup", icon: "smile", title: "Check-ups and cleaning", text: "A regular look and a thorough clean, so small problems are found early." },
  { id: "fillings", icon: "shield", title: "Fillings and repairs", text: "Careful repair of cavities and chipped teeth, explained step by step." },
  { id: "whitening", icon: "sparkles", title: "Teeth whitening", text: "A brighter smile, planned around your teeth and your comfort." },
  { id: "braces", icon: "ruler", title: "Braces and aligners", text: "Straighter teeth for teenagers and adults, with a clear plan from the start." },
  { id: "rootcanal", icon: "steth", title: "Root canal treatment", text: "Relief from tooth pain, with treatment explained before it begins." },
  { id: "children", icon: "baby", title: "Children’s dentistry", text: "Friendly first visits that help children feel at ease." },
] as const;

/** Fictional dentists. Initials stand in for photographs: no real people and no AI-generated faces. */
export const doctors = [
  { initials: "MN", name: "Dr. Meera Nair", role: "Lead dentist", focus: "General and family dentistry", color: "#12706b" },
  { initials: "AR", name: "Dr. Arjun Rao", role: "Dentist", focus: "Braces and aligners", color: "#0b3433" },
  { initials: "SK", name: "Dr. Sana Khan", role: "Dentist", focus: "Children’s dentistry", color: "#1b6b86" },
] as const;

export const visitSteps = [
  { title: "Tell us when suits you", text: "Send a request in under a minute. Choose the treatment and a time of day." },
  { title: "We confirm by phone", text: "We call or message to confirm a time, and answer any question." },
  { title: "Your visit", text: "A calm check, a clear explanation and a plan, before any treatment." },
] as const;

/** Sample opening hours, clearly sample. */
export const hours = [
  ["Monday to Friday", "9:00 to 18:00"],
  ["Saturday", "9:00 to 14:00"],
  ["Sunday", "Closed"],
] as const;

export const faqs = [
  { q: "What should I expect at my first visit?", a: "A friendly conversation about your teeth and any worries, a gentle check, and a clear explanation of what we find. Nothing is done without your agreement." },
  { q: "Do I need to bring anything?", a: "Bring any earlier dental records or X-rays you have, and a list of medicines you take. If you don’t have them, that’s fine." },
  { q: "Can children come to the clinic?", a: "Yes. Children’s visits are short and gentle, and a parent can stay with them throughout." },
  { q: "How do I change or cancel an appointment?", a: "Call or message us as early as you can and we will move it to a time that suits you." },
] as const;

export const timesOfDay = ["Morning", "Afternoon", "Evening", "Any time"] as const;
