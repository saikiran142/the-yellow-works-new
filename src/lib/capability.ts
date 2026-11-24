/**
 * Decides whether the real-time 3D hero may load. The pre-rendered scene is the default;
 * 3D is an enhancement for capable devices only (WebGL2, no reduced motion, no Save-Data,
 * a precise pointer or wide viewport, and where reported at least 4 cores and 4 GB).
 */
export interface CapabilityInput {
  webgl2: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  finePointer: boolean;
  viewportWidth: number;
  cores?: number;
  memoryGb?: number;
}

export function canRunHero3D(i: CapabilityInput): boolean {
  if (!i.webgl2 || i.reducedMotion || i.saveData) return false;
  if (!i.finePointer && i.viewportWidth < 1024) return false;
  if (i.cores !== undefined && i.cores < 4) return false;
  if (i.memoryGb !== undefined && i.memoryGb < 4) return false;
  return true;
}

/** Reads the real browser. Client only. */
export function readCapability(): CapabilityInput {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  let webgl2 = false;
  try {
    webgl2 = !!document.createElement("canvas").getContext("webgl2");
  } catch {
    webgl2 = false;
  }
  return {
    webgl2,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    saveData: nav.connection?.saveData === true,
    finePointer: window.matchMedia("(pointer: fine)").matches,
    viewportWidth: window.innerWidth,
    cores: nav.hardwareConcurrency,
    memoryGb: nav.deviceMemory,
  };
}
