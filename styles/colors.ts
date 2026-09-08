/**
 * Canonical color tokens for Orbit OS.
 * Must stay in sync with the `@theme` block in `styles/globals.css` —
 * this file exists so JS/TS consumers (charts, canvas, dynamic styles,
 * the theme provider) can read the same values Tailwind generates
 * utilities from.
 */

export const colors = {
  void: "#050505",
  ink: {
    950: "#050507",
    900: "#0a0a0f",
    850: "#0e0e16",
    800: "#13131d",
    700: "#1c1c29",
  },
  mist: {
    300: "#a6a8c4",
    400: "#8385a8",
    500: "#64667f",
  },
  violet: {
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
  },
  indigo: {
    400: "#818cf8",
    500: "#6366f1",
  },
  cyan: {
    400: "#5eead4",
    500: "#2dd4bf",
  },
  amber: {
    400: "#fbbf24",
  },
  rose: {
    400: "#fb7185",
  },
} as const;

export const semanticColors = {
  surface: colors.ink[900],
  surfaceRaised: colors.ink[800],
  border: "rgba(255, 255, 255, 0.1)",
  accent: colors.violet[500],
  accentSoft: colors.violet[400],
  secondary: colors.cyan[400],
  positive: colors.cyan[400],
  warning: colors.amber[400],
  critical: colors.rose[400],
  textPrimary: "#ffffff",
  textSecondary: colors.mist[300],
  textMuted: colors.mist[500],
} as const;

export type ColorScale = typeof colors;
export type SemanticColors = typeof semanticColors;
