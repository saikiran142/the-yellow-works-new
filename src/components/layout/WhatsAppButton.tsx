import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";

/** Compact mobile WhatsApp button. Renders only when a real number is configured, so it never links to an invented one. */
export function WhatsAppButton() {
  const href = whatsappLink(site.whatsappNumber);
  if (!href) return null;
  return (
    <a className="wa" href={href} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp">
      <Icon name="chat" />WhatsApp
    </a>
  );
}
