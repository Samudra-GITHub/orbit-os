export const WALLPAPERS = [
  { id: "cosmos", label: "Cosmos", swatch: "from-violet-500 to-cyan-400" },
  { id: "midnight", label: "Midnight", swatch: "from-indigo-500 to-ink-900" },
  { id: "solar", label: "Solar", swatch: "from-amber-400 to-rose-400" },
  { id: "monochrome", label: "Monochrome", swatch: "from-white to-mist-500" },
] as const;

export const ACCENTS = [
  { id: "violet", label: "Violet", className: "bg-violet-500" },
  { id: "cyan", label: "Cyan", className: "bg-cyan-400" },
  { id: "rose", label: "Rose", className: "bg-rose-400" },
  { id: "amber", label: "Amber", className: "bg-amber-400" },
] as const;

export type WallpaperId = (typeof WALLPAPERS)[number]["id"];
export type AccentId = (typeof ACCENTS)[number]["id"];

export interface OnboardingProfile {
  name: string;
  city: string;
  wallpaper: WallpaperId;
  accent: AccentId;
}

export const DEFAULT_ONBOARDING_PROFILE: OnboardingProfile = {
  name: "",
  city: "Bengaluru",
  wallpaper: "cosmos",
  accent: "violet",
};

export const ONBOARDING_TOTAL_STEPS = 6;
