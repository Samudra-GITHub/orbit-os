/** Cubic-bezier easing curves for the non-spring transitions covered by
 *  `durations.ts` (page fades, blur-in reveals). */
export const easings = {
  /** Apple-style deceleration — the default for fades and reveals. */
  outSmooth: [0.16, 1, 0.3, 1],
  /** A slight overshoot, for playful pops (chip/badge entrances). */
  springy: [0.34, 1.56, 0.64, 1],
  /** Sharp acceleration in, for portal/flash transitions that need to
   *  start slow and end fast. */
  inSharp: [0.7, 0, 0.84, 0],
} as const;

export type EasingName = keyof typeof easings;
