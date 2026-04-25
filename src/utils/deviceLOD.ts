/**
 * Scale a requested particle cap for the current device to keep WebGL work reasonable.
 * Returns 0 when the user prefers reduced motion (caller should skip the animation).
 */
export function getOptimalParticleCount(requestedMax: number): number {
  if (typeof window === "undefined") return 0;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return 0;
  }

  const cores = typeof navigator.hardwareConcurrency === "number"
    ? navigator.hardwareConcurrency
    : 4;
  // deviceMemory is Chrome-only, in GB
  const mem =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

  let max = Math.min(requestedMax, 1000);
  if (typeof mem === "number" && mem <= 4) {
    max = Math.floor(max * 0.55);
  } else {
    max = Math.floor(max * 0.75);
  }

  if (cores <= 4) {
    max = Math.floor(max * 0.65);
  } else if (cores >= 8) {
    max = Math.min(requestedMax, Math.floor(max * 1.1));
  }

  if (matchMedia("(max-width: 640px)").matches) {
    max = Math.floor(max * 0.5);
  }

  return Math.max(80, max);
}
