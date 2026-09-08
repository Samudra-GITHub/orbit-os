/**
 * Radius system from the Orbit Design Bible.
 * Mirrored as `--radius-*` theme tokens in `styles/globals.css` so Tailwind's
 * `rounded-*` utilities resolve to these exact values.
 */

export const radius = {
  none: "0px",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.75rem",
  "4xl": "2rem",
  full: "9999px",
} as const;

export type Radius = typeof radius;
