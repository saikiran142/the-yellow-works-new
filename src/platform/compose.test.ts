import { describe, expect, it } from "vitest";
import { composeEnquiry } from "./compose";
import type { EnquiryForm } from "./types";

const form: EnquiryForm = {
  source: "site-test", type: "other", selects: [], submitLabel: "Send", successTitle: "Done", successText: "Thanks", consent: "c",
  messageTemplate: "Trial request. Subject: {subject}. Time: {time}. {note}",
  businessFrom: "subject", cityFrom: "time",
};

describe("composeEnquiry", () => {
  it("fills tokens, the note, and the business and city slots", () => {
    const r = composeEnquiry(form, { subject: "Maths", time: "Evening" }, "Class 9");
    expect(r.message).toBe("Trial request. Subject: Maths. Time: Evening. Class 9");
    expect(r.business).toBe("Maths");
    expect(r.city).toBe("Evening");
  });
  it("says 'not stated' for missing values and tidies whitespace", () => {
    const r = composeEnquiry(form, { subject: "" }, "");
    expect(r.message).toBe("Trial request. Subject: not stated. Time: not stated.");
    expect(r.business).toBe("");
  });
  it("leaves the slots empty when not configured", () => {
    const r = composeEnquiry({ ...form, businessFrom: undefined, cityFrom: undefined }, { subject: "X" }, "");
    expect(r.business).toBe("");
    expect(r.city).toBe("");
  });
});
