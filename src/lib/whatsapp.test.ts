import { describe, expect, it } from "vitest";
import { whatsappLink, GENERIC_MESSAGE } from "./whatsapp";

describe("whatsappLink", () => {
  it("returns undefined when no number is configured", () => {
    expect(whatsappLink(undefined)).toBeUndefined();
    expect(whatsappLink("")).toBeUndefined();
  });

  it("strips formatting and encodes the generic message", () => {
    const link = whatsappLink("+91 00000 00000");
    expect(link).toBe(`https://wa.me/910000000000?text=${encodeURIComponent(GENERIC_MESSAGE)}`);
  });

  it("rejects numbers that are too short or too long", () => {
    expect(whatsappLink("12345")).toBeUndefined();
    expect(whatsappLink("1".repeat(16))).toBeUndefined();
  });
});
