"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { springs } from "@/lib/motion/springs";
import { useTheme } from "@/lib/theme";

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Global motion defaults, mounted once at the app root (inside
 * `ThemeProvider`, so it can read the Accessibility "Reduced motion"
 * override). `reducedMotion="user"` makes every `motion.*` component
 * automatically honor the OS accessibility setting at the engine level —
 * Framer Motion suppresses transform/layout animation on every visual
 * element when this resolves true, independently of each component's own
 * `useReducedMotion()` checks (which stay in place as defense-in-depth for
 * the few components that branch on it to change *what* renders, not just
 * animate it). When the user forces "Reduced motion" on in Settings
 * regardless of their OS setting, this flips to `"always"`, applying that
 * same engine-level suppression app-wide. `transition` provides Orbit's
 * spring as the fallback for any animation that doesn't specify its own.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const { reduceMotion } = useTheme();

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "user"} transition={springs.default}>
      {children}
    </MotionConfig>
  );
}
