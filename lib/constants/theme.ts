import { colors, semanticColors } from "@/styles/colors";
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from "@/styles/typography";
import { spacing, layout } from "@/styles/spacing";
import { radius } from "@/styles/radius";
import { shadows } from "@/styles/shadows";
import { springs, magneticStrength } from "@/lib/motion/springs";
import { durations } from "@/lib/motion/durations";
import { easings } from "@/lib/motion/easings";

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
  motion: { springs, durations, easings, magneticStrength },
} as const;

export type Theme = typeof theme;
