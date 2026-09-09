import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting(date: Date = new Date()) {
  const hour = date.getHours();
  if (hour < 5) return "Still up?";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Winding down?";
}

/** Scales an ambient-motion keyframe array's *deviation* from its resting
 *  value (0 for position/rotation, 1 for scale) by `intensity` — Settings >
 *  Accessibility's Animation Intensity slider. 100% reproduces the array
 *  unchanged; 50%/150% shrink or widen the same motion without changing
 *  its shape. Used by any ambient (non-interactive) animation loop that
 *  wants to respect the slider — `CosmicBackground`'s drift, `AIOrb`'s
 *  breathing — rather than every component re-deriving this math. */
export function scaleDrift(values: number[], intensity: number, rest = 0) {
  return values.map((v) => rest + (v - rest) * intensity);
}
