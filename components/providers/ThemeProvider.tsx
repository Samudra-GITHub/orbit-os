"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { THEME_MODE } from "@/lib/constants/theme";

type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  mode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Dark theme only for now. `mode` is already threaded through context and
 * stamped as `data-theme` on a wrapper element so a future light mode only
 * needs to (1) make `mode` stateful here and (2) add `:root[data-theme="light"]`
 * overrides in `styles/globals.css` — no consumer of `useTheme()` changes.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const mode: ThemeMode = THEME_MODE;
  const value = useMemo<ThemeContextValue>(() => ({ mode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={mode} className="contents">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
