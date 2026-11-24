import { describe, expect, it } from "vitest";
import { normalisePhone, validateEnquiry } from "./validation";

const ok = { name: "Asha", business: "", type: "clinic", city: "", phone: "98XXXXXXXX".replace(/X/g, "1"), message: "" };

describe("normalisePhone", () => {
  it("strips +91, 91 and leading 0 and punctuation", () => {
    expect(normalisePhone("+91 98111 11111")).toBe("9811111111");
    expect(normalisePhone("919811111111")).toBe("9811111111");
    expect(normalisePhone("09811111111")).toBe("9811111111");
    expect(normalisePhone("98111-11111")).toBe("9811111111");
  });
});

describe("validateEnquiry", () => {
  it("accepts a valid enquiry", () => expect(validateEnquiry(ok)).toEqual({}));
  it("requires a name", () => expect(validateEnquiry({ ...ok, name: " " }).name).toBeTruthy());
  it("rejects a short number and numbers not starting 6 to 9", () => {
    expect(validateEnquiry({ ...ok, phone: "98765" }).phone).toBeTruthy();
    expect(validateEnquiry({ ...ok, phone: "1234567890" }).phone).toBeTruthy();
  });
  it("caps message length", () => expect(validateEnquiry({ ...ok, message: "a".repeat(1001) }).message).toBeTruthy());
  it("says how to fix each error without apologising", () => {
    const e = validateEnquiry({ ...ok, name: "", phone: "1" });
    expect(e.name).not.toMatch(/sorry/i);
    expect(e.phone).toMatch(/10-digit/);
  });
});
