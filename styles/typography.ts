/**
 * Typography tokens. Font CSS variables (`--font-geist`, `--font-jetbrains-mono`)
 * are registered by `next/font` in `app/layout.tsx`; SF Pro Display is never
 * downloaded — it's a system fallback that resolves natively on Apple devices.
 */

export const fontFamily = {
  sans: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
  display:
    "-apple-system, BlinkMacSystemFont, 'SF Pro Display', var(--font-geist), ui-sans-serif, sans-serif",
  mono: "var(--font-jetbrains-mono), ui-monospace, 'SFMono-Regular', monospace",
} as const;

export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  tight: 1.15,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export const letterSpacing = {
  tight: "-0.02em",
  normal: "0em",
  wide: "0.05em",
  widest: "0.2em",
} as const;

export type FontFamily = typeof fontFamily;
