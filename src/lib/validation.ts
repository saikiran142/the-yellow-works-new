/**
 * Enquiry form validation. Pure functions so they can be unit tested and, in Phase 3,
 * mirrored by the server-side schema (the server remains the source of truth).
 */
export interface EnquiryInput {
  name: string;
  business: string;
  type: string;
  city: string;
  phone: string;
  message: string;
}

export type EnquiryErrors = Partial<Record<"name" | "phone" | "message", string>>;

/** Accepts 10-digit Indian mobile numbers, with or without +91 / 91 / 0 and spaces or dashes. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function validateEnquiry(i: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (i.name.trim().length < 2) errors.name = "Enter your name so we know who to reply to.";
  const phone = normalisePhone(i.phone);
  if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a 10-digit mobile number, for example 98XXXXXXXX.";
  if (i.message.length > 1000) errors.message = "Shorten your message to 1,000 characters or fewer.";
  return errors;
}
