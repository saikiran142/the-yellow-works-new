import type { EnquiryForm } from "./types";

/**
 * Builds the enquiry record from the form's values, using the site's config.
 * Pure, so it is tested without a browser. `{token}` placeholders in the template are replaced with the
 * matching select value; `{note}` is the free-text note. Unknown tokens become "not stated".
 */
export function composeEnquiry(form: EnquiryForm, values: Record<string, string>, note: string) {
  const get = (k: string) => (values[k] && values[k].trim() !== "" ? values[k] : "not stated");
  const message = form.messageTemplate
    .replace(/\{note\}/g, note.trim())
    .replace(/\{([a-zA-Z0-9_-]+)\}/g, (_, k: string) => get(k))
    .replace(/\s+/g, " ")
    .trim();
  return {
    business: form.businessFrom ? values[form.businessFrom] ?? "" : "",
    city: form.cityFrom ? values[form.cityFrom] ?? "" : "",
    message,
  };
}
