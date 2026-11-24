/**
 * IronCore Fitness: a fictional concept gym made by The Yellow Works to show what a gym website can do.
 * Everything here is sample content. No real gym, person, address, phone number, price or review.
 */
export const gym = {
  name: "IronCore Fitness",
  phone: "[GYM_PHONE]",
  address: "[GYM_ADDRESS]",
  path: "/demos/gym",
} as const;

export const features = [
  "Beginner-friendly inductions",
  "Coaches on the floor at every session",
  "Classes for every level",
  "Open early, open late",
] as const;

/** Sample prices, clearly labelled as sample in the page. */
export const plans = [
  { id: "start", name: "Start", price: "₹1,200", per: "per month", note: "Gym floor access, off-peak hours", perks: ["Gym floor", "Free induction", "Locker"], featured: false },
  { id: "train", name: "Train", price: "₹2,000", per: "per month", note: "Everything in Start, any time, plus classes", perks: ["Gym floor, any time", "All group classes", "Locker and shower", "Free induction"], featured: true },
  { id: "coach", name: "Coach", price: "₹3,200", per: "per month", note: "Everything in Train, plus personal coaching", perks: ["Everything in Train", "4 coaching sessions a month", "A plan built for your goal"], featured: false },
] as const;

/** Fictional coaches. Initials stand in for photographs: no real people and no AI-generated faces. */
export const coaches = [
  { initials: "RK", name: "Ravi Kumar", focus: "Strength and conditioning", color: "#b8f23a" },
  { initials: "NS", name: "Nisha Shah", focus: "Group classes and mobility", color: "#7ad7f0" },
  { initials: "DM", name: "Dev Mehta", focus: "Fat loss and beginners", color: "#ff9b54" },
] as const;

/** Sample weekly timetable. */
export const timetable = [
  { day: "Monday", sessions: [["6:30", "Strength basics"], ["18:30", "HIIT 45"]] },
  { day: "Tuesday", sessions: [["7:00", "Mobility flow"], ["19:00", "Strength basics"]] },
  { day: "Wednesday", sessions: [["6:30", "HIIT 45"], ["18:30", "Boxing fitness"]] },
  { day: "Thursday", sessions: [["7:00", "Strength basics"], ["19:00", "Mobility flow"]] },
  { day: "Friday", sessions: [["6:30", "HIIT 45"], ["18:30", "Boxing fitness"]] },
  { day: "Saturday", sessions: [["8:00", "Open class"], ["10:00", "Beginners’ induction"]] },
] as const;

export const goals = ["Get fitter", "Build strength", "Lose weight", "I’m new to the gym", "Not sure yet"] as const;
export const times = ["Early morning", "Morning", "Evening", "Any time"] as const;

export const faqs = [
  { q: "I’ve never been to a gym. Is that okay?", a: "Yes. Your free trial includes an induction with a coach who shows you around and helps you plan your first weeks." },
  { q: "What should I bring to my trial?", a: "Comfortable clothes, trainers, a water bottle and a towel." },
  { q: "Can I pause or cancel my membership?", a: "Sample answer: tell us before your next payment date and we will pause or cancel it. A real gym would put its own terms here." },
  { q: "Are there classes for beginners?", a: "Yes. Strength basics and Mobility flow are good places to start, and the Saturday induction is for first-timers." },
] as const;
