import { colors, semanticColors } from "@/styles/colors";
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from "@/styles/typography";
import { spacing, layout } from "@/styles/spacing";
import { radius } from "@/styles/radius";
import { shadows } from "@/styles/shadows";
import { spring, duration, easing, magnetic } from "@/styles/motion";

export const THEME_MODE = "dark" as const;

export const theme = {
  mode: THEME_MODE,
  colors,
  semanticColors,
  typography: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing },
  spacing,
  layout,
  radius,
  shadows,
  motion: { spring, duration, easing, magnetic },
} as const;

export type Theme = typeof theme;
