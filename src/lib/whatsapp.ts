/**
 * Builds a click-to-chat link with a generic prefilled message.
 * Returns undefined when no number is configured, so no link to a made-up number can ever render.
 */
export const GENERIC_MESSAGE = "Hello, I'd like to know more about a website for my business.";

export function whatsappLink(number: string | undefined, message: string = GENERIC_MESSAGE): string | undefined {
  if (!number) return undefined;
  const digits = number.replace(/\D/g, "");
  // WhatsApp expects an international number with no plus sign or spaces. 10 to 15 digits.
  if (digits.length < 10 || digits.length > 15) return undefined;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
