"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { THEME_MODE } from "@/lib/constants/theme";
import {
  ACCENTS,
  APPEARANCE_STORAGE_KEY,
  DEFAULT_APPEARANCE,
  THEMES,
  WALLPAPERS,
  type AccentId,
  type AppearanceState,
  type ThemePresetId,
  type WallpaperId,
} from "@/lib/theme/constants";

type ThemeMode = "dark" | "light";

interface ThemeContextValue extends AppearanceState {
  mode: ThemeMode;
  setTheme: (id: ThemePresetId) => void;
  setAccentColor: (id: AccentId) => void;
  setWallpaper: (id: WallpaperId) => void;
  setGlassIntensity: (value: number) => void;
  setAnimationIntensity: (value: number) => void;
  setReduceMotion: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
  setFontScale: (value: number) => void;
  setCursorSpotlight: (value: boolean) => void;
  resetAppearance: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Orbit's theme engine — the single reusable `ThemeProvider` every module
 * (Dashboard, SkyCast, Workspace, AI Workspace, Finance, the landing page,
 * and anything built after this sprint) reads from. Dark-mode-only per the
 * Design Bible, but the appearance layer underneath — theme ink preset,
 * accent hue, wallpaper, glass intensity, animation intensity, and
 * accessibility overrides — is fully dynamic.
 *
 * Every setting is applied by writing CSS custom properties/attributes
 * onto `<html>` rather than through React props, so changing a value here
 * updates the whole app instantly with zero per-module wiring: any
 * component anywhere that reads `var(--color-violet-500)`,
 * `var(--wallpaper-hue-1)`, `var(--glass-intensity)`, etc. (directly, or
 * via a Tailwind utility built on that token) re-renders in place. This is
 * the same `--var` trick `GlassSurface`'s cursor spotlight already used.
 *
 * State starts at `DEFAULT_APPEARANCE` on every render (server *and*
 * first client paint) to avoid a hydration mismatch, then a `useEffect`
 * reads the persisted value from localStorage once mounted.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode: ThemeMode = THEME_MODE;
  const [appearance, setAppearance] = useState<AppearanceState>(DEFAULT_APPEARANCE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(APPEARANCE_STORAGE_KEY);
      if (raw) setAppearance({ ...DEFAULT_APPEARANCE, ...JSON.parse(raw) });
    } catch {
      // Corrupt or inaccessible storage — fall back to defaults silently.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;

    const themePreset = THEMES.find((t) => t.id === appearance.currentTheme) ?? THEMES[0];
    root.style.setProperty("--color-ink-950", themePreset.ink[950]);
    root.style.setProperty("--color-ink-900", themePreset.ink[900]);
    root.style.setProperty("--color-ink-850", themePreset.ink[850]);
    root.style.setProperty("--color-ink-800", themePreset.ink[800]);
    root.style.setProperty("--color-ink-700", themePreset.ink[700]);

    const accentPreset = ACCENTS.find((a) => a.id === appearance.accentColor) ?? ACCENTS[0];
    root.style.setProperty("--color-violet-400", accentPreset.hex[400]);
    root.style.setProperty("--color-violet-500", accentPreset.hex[500]);
    root.style.setProperty("--color-violet-600", accentPreset.hex[600]);

    const wallpaperPreset = WALLPAPERS.find((w) => w.id === appearance.wallpaper) ?? WALLPAPERS[0];
    root.style.setProperty("--wallpaper-hue-1", wallpaperPreset.hues[0]);
    root.style.setProperty("--wallpaper-hue-2", wallpaperPreset.hues[1]);
    root.style.setProperty("--wallpaper-hue-3", wallpaperPreset.hues[2]);

    root.style.setProperty("--glass-intensity", String(appearance.glassIntensity));
    root.style.setProperty("--motion-intensity", String(appearance.animationIntensity));
    root.style.fontSize = `${appearance.fontScale}%`;
    root.setAttribute("data-contrast", appearance.highContrast ? "high" : "normal");
    root.setAttribute("data-reduce-motion", String(appearance.reduceMotion));
    root.setAttribute("data-cursor-spotlight", appearance.cursorSpotlight ? "on" : "off");

    try {
      window.localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(appearance));
    } catch {
      // Storage full or unavailable — appearance still applies for this session.
    }
  }, [appearance, hydrated]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      ...appearance,
      setTheme: (id) => setAppearance((a) => ({ ...a, currentTheme: id })),
      setAccentColor: (id) => setAppearance((a) => ({ ...a, accentColor: id })),
      setWallpaper: (id) => setAppearance((a) => ({ ...a, wallpaper: id })),
      setGlassIntensity: (glassIntensity) => setAppearance((a) => ({ ...a, glassIntensity })),
      setAnimationIntensity: (animationIntensity) => setAppearance((a) => ({ ...a, animationIntensity })),
      setReduceMotion: (reduceMotion) => setAppearance((a) => ({ ...a, reduceMotion })),
      setHighContrast: (highContrast) => setAppearance((a) => ({ ...a, highContrast })),
      setFontScale: (fontScale) => setAppearance((a) => ({ ...a, fontScale })),
      setCursorSpotlight: (cursorSpotlight) => setAppearance((a) => ({ ...a, cursorSpotlight })),
      resetAppearance: () => setAppearance(DEFAULT_APPEARANCE),
    }),
    [mode, appearance]
  );

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
