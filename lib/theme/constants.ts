export type ThemePresetId = "cosmic" | "midnight" | "obsidian" | "nebula";

export interface ThemePreset {
  id: ThemePresetId;
  label: string;
  description: string;
  ink: { 950: string; 900: string; 850: string; 800: string; 700: string };
}

export const THEMES: ThemePreset[] = [
  {
    id: "cosmic",
    label: "Cosmic",
    description: "Orbit's default — a violet-black void.",
    ink: { 950: "#050507", 900: "#0a0a0f", 850: "#0e0e16", 800: "#13131d", 700: "#1c1c29" },
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "A deeper, cooler blue-black.",
    ink: { 950: "#030308", 900: "#06060f", 850: "#0a0a18", 800: "#10101f", 700: "#191933" },
  },
  {
    id: "obsidian",
    label: "Obsidian",
    description: "Neutral near-black — Nothing OS-inspired.",
    ink: { 950: "#050505", 900: "#0a0a0a", 850: "#0f0f0f", 800: "#161616", 700: "#212121" },
  },
  {
    id: "nebula",
    label: "Nebula",
    description: "A warm, visionOS-style dark glass.",
    ink: { 950: "#08060a", 900: "#0f0a12", 850: "#150e1a", 800: "#1c1322", 700: "#2a1c33" },
  },
];

export type AccentId = "violet" | "cyan" | "rose" | "amber";

export interface AccentPreset {
  id: AccentId;
  label: string;
  hex: { 400: string; 500: string; 600: string };
}

export const ACCENTS: AccentPreset[] = [
  { id: "violet", label: "Violet", hex: { 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed" } },
  { id: "cyan", label: "Cyan", hex: { 400: "#5eead4", 500: "#2dd4bf", 600: "#0d9488" } },
  { id: "rose", label: "Rose", hex: { 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48" } },
  { id: "amber", label: "Amber", hex: { 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706" } },
];

// The 12 built-in wallpapers — each a three-hue mesh CosmicBackground
// paints behind the whole app (see components/motion/CosmicBackground.tsx).
export type WallpaperId =
  | "cosmos"
  | "midnight"
  | "solar"
  | "monochrome"
  | "aurora"
  | "ocean"
  | "nebula"
  | "carbon"
  | "sunset"
  | "frost"
  | "emerald"
  | "eclipse";

export interface WallpaperPreset {
  id: WallpaperId;
  label: string;
  hues: [string, string, string];
}

export const WALLPAPERS: WallpaperPreset[] = [
  { id: "cosmos", label: "Cosmos", hues: ["#7c3aed", "#6366f1", "#2dd4bf"] },
  { id: "midnight", label: "Midnight", hues: ["#4f46e5", "#1d4ed8", "#0891b2"] },
  { id: "solar", label: "Solar", hues: ["#f59e0b", "#f43f5e", "#8b5cf6"] },
  { id: "monochrome", label: "Monochrome", hues: ["#64667f", "#8385a8", "#a6a8c4"] },
  { id: "aurora", label: "Aurora", hues: ["#2dd4bf", "#8b5cf6", "#6366f1"] },
  { id: "ocean", label: "Ocean", hues: ["#0e7490", "#0369a1", "#2dd4bf"] },
  { id: "nebula", label: "Nebula", hues: ["#fb7185", "#a78bfa", "#818cf8"] },
  { id: "carbon", label: "Carbon", hues: ["#27272a", "#3f3f46", "#52525b"] },
  { id: "sunset", label: "Sunset", hues: ["#f97316", "#f43f5e", "#fbbf24"] },
  { id: "frost", label: "Frost", hues: ["#38bdf8", "#7dd3fc", "#a5f3fc"] },
  { id: "emerald", label: "Emerald", hues: ["#10b981", "#2dd4bf", "#6366f1"] },
  { id: "eclipse", label: "Eclipse", hues: ["#2e1065", "#000000", "#164e63"] },
];

export interface AppearanceState {
  currentTheme: ThemePresetId;
  accentColor: AccentId;
  wallpaper: WallpaperId;
  glassIntensity: number;
  animationIntensity: number;
  reduceMotion: boolean;
  highContrast: boolean;
  fontScale: number;
  cursorSpotlight: boolean;
}

export const DEFAULT_APPEARANCE: AppearanceState = {
  currentTheme: "cosmic",
  accentColor: "violet",
  wallpaper: "cosmos",
  glassIntensity: 1,
  animationIntensity: 1,
  reduceMotion: false,
  highContrast: false,
  fontScale: 100,
  cursorSpotlight: true,
};

export const APPEARANCE_STORAGE_KEY = "orbit-appearance";
