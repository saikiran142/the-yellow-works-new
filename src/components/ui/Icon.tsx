import { Activity, ArrowRight, Calendar, Check, Code, Flag, Gauge, Globe, MapPin, Menu, MessageCircle, Pencil, Search, Smartphone, User, Wrench, X } from "lucide-react";
import type { LucideProps } from "lucide-react";

/** Interface icons: Lucide only, one stroke width (1.75 at 24 px), round caps. Never mix icon sets. */
const map = {
  activity: Activity,
  arrow: ArrowRight,
  calendar: Calendar,
  check: Check,
  code: Code,
  flag: Flag,
  gauge: Gauge,
  browser: Globe,
  pin: MapPin,
  menu: Menu,
  chat: MessageCircle, // generic bubble. WhatsApp's own mark is used only from its official brand kit.
  pencil: Pencil,
  search: Search,
  phone: Smartphone,
  user: User,
  wrench: Wrench,
  close: X,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: IconName } & Omit<LucideProps, "ref">) {
  const C = map[name];
  return <C className="ico" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} />;
}
