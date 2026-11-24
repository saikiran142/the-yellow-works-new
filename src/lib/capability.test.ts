import { describe, expect, it } from "vitest";
import { canRunHero3D, type CapabilityInput } from "./capability";

const good: CapabilityInput = { webgl2: true, reducedMotion: false, saveData: false, finePointer: true, viewportWidth: 1440, cores: 8, memoryGb: 8 };

describe("canRunHero3D", () => {
  it("allows a capable desktop", () => expect(canRunHero3D(good)).toBe(true));
  it("blocks without WebGL2", () => expect(canRunHero3D({ ...good, webgl2: false })).toBe(false));
  it("blocks reduced motion", () => expect(canRunHero3D({ ...good, reducedMotion: true })).toBe(false));
  it("blocks Save-Data", () => expect(canRunHero3D({ ...good, saveData: true })).toBe(false));
  it("blocks a phone with a coarse pointer and narrow viewport", () => expect(canRunHero3D({ ...good, finePointer: false, viewportWidth: 390 })).toBe(false));
  it("allows a wide touch device", () => expect(canRunHero3D({ ...good, finePointer: false, viewportWidth: 1280 })).toBe(true));
  it("blocks low core count and low memory when reported", () => {
    expect(canRunHero3D({ ...good, cores: 2 })).toBe(false);
    expect(canRunHero3D({ ...good, memoryGb: 2 })).toBe(false);
  });
  it("does not block when cores and memory are not reported", () => expect(canRunHero3D({ ...good, cores: undefined, memoryGb: undefined })).toBe(true));
});
