/** Plain duration scale (seconds), for the handful of places a spring
 *  isn't appropriate — opacity crossfades, blur transitions, shimmer. */
export const durations = {
  instant: 0.15,
  fast: 0.25,
  base: 0.4,
  slow: 0.6,
  slower: 1,
} as const;

export type DurationName = keyof typeof durations;
