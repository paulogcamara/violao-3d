export type DeviceTier = "low" | "mid" | "high";

let cached: DeviceTier | null = null;

export function getDeviceTier(): DeviceTier {
  if (cached) return cached;
  if (typeof window === "undefined") return "high";

  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad/.test(ua);
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 4;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (isMobile || coarsePointer || cores <= 4 || memory <= 2) cached = "low";
  else if (cores <= 8 || memory <= 4) cached = "mid";
  else cached = "high";

  return cached;
}

export function getMaxDpr(): number {
  const tier = getDeviceTier();
  if (tier === "low") return 1;
  if (tier === "mid") return 1.25;
  return 1.5;
}

export function shouldEnablePostFX(): boolean {
  return getDeviceTier() !== "low";
}
