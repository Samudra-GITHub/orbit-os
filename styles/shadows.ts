/**
 * Ambient + glow shadow tokens. The CSS versions in `styles/globals.css`
 * use `color-mix()` against the live theme; these are static rgba
 * approximations for JS-side consumers that can't evaluate CSS functions
 * (canvas, inline SVG filters, chart libraries).
 */

export const shadows = {
  glass: "0 1px 1px 0 rgba(255, 255, 255, 0.06) inset, 0 8px 32px -8px rgba(0, 0, 0, 0.6)",
  glassLg: "0 1px 1px 0 rgba(255, 255, 255, 0.08) inset, 0 24px 64px -16px rgba(0, 0, 0, 0.7)",
  glowAccent: "0 0 24px -4px rgba(139, 92, 246, 0.6)",
  glowAccentLg: "0 0 28px -6px rgba(139, 92, 246, 0.7)",
  glowCyan: "0 0 24px -4px rgba(45, 212, 191, 0.55)",
  glowIndigo: "0 0 24px -4px rgba(99, 102, 241, 0.55)",
  glowCommand: "0 8px 32px -4px rgba(139, 92, 246, 0.5)",
  glowWhite: "0 0 24px -4px rgba(255, 255, 255, 0.4)",
} as const;

export type Shadows = typeof shadows;
