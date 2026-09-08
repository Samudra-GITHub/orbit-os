/**
 * Motion tokens. Spring-based only — no linear/ease-only transitions on
 * interactive elements, per the Design Bible.
 */

export const spring = {
  default: { type: "spring", stiffness: 260, damping: 22, mass: 0.9 },
  snappy: { type: "spring", stiffness: 400, damping: 28, mass: 0.6 },
  gentle: { type: "spring", stiffness: 180, damping: 24, mass: 1 },
} as const;

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  slower: 0.6,
} as const;

export const easing = {
  outSmooth: [0.16, 1, 0.3, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

export const magnetic = {
  strength: 0.3,
  strengthStrong: 0.5,
} as const;

export type Spring = typeof spring;
