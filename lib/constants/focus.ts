export type PresetId = "pomodoro" | "deep-work" | "flow";

export interface FocusPreset {
  id: PresetId;
  label: string;
  workMinutes: number;
  breakMinutes: number;
  description: string;
}

export const FOCUS_PRESETS: FocusPreset[] = [
  { id: "pomodoro", label: "Pomodoro", workMinutes: 25, breakMinutes: 5, description: "Short bursts with frequent breaks." },
  { id: "deep-work", label: "Deep Work", workMinutes: 50, breakMinutes: 10, description: "Extended focus for complex tasks." },
  { id: "flow", label: "Flow State", workMinutes: 90, breakMinutes: 20, description: "Long, uninterrupted deep flow." },
];

export type AmbientSceneId = "cosmos" | "rainfall" | "forest" | "ocean" | "night-sky" | "fireplace";

export interface AmbientScene {
  id: AmbientSceneId;
  label: string;
  hues: [string, string, string];
}

export const AMBIENT_SCENES: AmbientScene[] = [
  { id: "cosmos", label: "Cosmos", hues: ["#7c3aed", "#6366f1", "#2dd4bf"] },
  { id: "rainfall", label: "Rainfall", hues: ["#334155", "#0ea5e9", "#64748b"] },
  { id: "forest", label: "Forest Canopy", hues: ["#166534", "#15803d", "#4d7c0f"] },
  { id: "ocean", label: "Ocean Deep", hues: ["#075985", "#0e7490", "#155e75"] },
  { id: "night-sky", label: "Night Sky", hues: ["#1e1b4b", "#312e81", "#4c1d95"] },
  { id: "fireplace", label: "Fireplace", hues: ["#7c2d12", "#c2410c", "#b45309"] },
];

export interface Track {
  id: string;
  title: string;
  artist: string;
  durationSec: number;
}

export const MOCK_TRACKS: Track[] = [
  { id: "t1", title: "Rainfall on Glass", artist: "Orbit Ambient", durationSec: 218 },
  { id: "t2", title: "Low Orbit", artist: "Nightwave", durationSec: 264 },
  { id: "t3", title: "Deep Focus Drift", artist: "Cascade", durationSec: 301 },
  { id: "t4", title: "Analog Warmth", artist: "Studio Loft", durationSec: 187 },
];

export interface FocusQuote {
  text: string;
  author: string;
}

export const FOCUS_QUOTES: FocusQuote[] = [
  { text: "Focus is the art of knowing what to ignore.", author: "James Clear" },
  { text: "The successful warrior is the average person with laser-like focus.", author: "Bruce Lee" },
  { text: "Where focus goes, energy flows.", author: "Tony Robbins" },
  { text: "Concentrate all your thoughts upon the work at hand.", author: "Alexander Graham Bell" },
  { text: "Deep work is the superpower of the 21st century.", author: "Cal Newport" },
];

export interface FocusSession {
  id: string;
  presetId: PresetId;
  presetLabel: string;
  date: string;
  durationMinutes: number;
  completed: boolean;
}

// Seeded history spanning the last week, so Sessions/Stats aren't empty on
// first load — real sessions completed in the overlay are appended
// alongside these via `useFocusSessions`.
export const SEED_SESSIONS: FocusSession[] = [
  { id: "seed-1", presetId: "pomodoro", presetLabel: "Pomodoro", date: "2026-09-03T09:15:00", durationMinutes: 25, completed: true },
  { id: "seed-2", presetId: "deep-work", presetLabel: "Deep Work", date: "2026-09-04T10:00:00", durationMinutes: 50, completed: true },
  { id: "seed-3", presetId: "pomodoro", presetLabel: "Pomodoro", date: "2026-09-05T08:30:00", durationMinutes: 25, completed: true },
  { id: "seed-4", presetId: "pomodoro", presetLabel: "Pomodoro", date: "2026-09-05T14:00:00", durationMinutes: 25, completed: true },
  { id: "seed-5", presetId: "deep-work", presetLabel: "Deep Work", date: "2026-09-07T09:00:00", durationMinutes: 50, completed: true },
  { id: "seed-6", presetId: "flow", presetLabel: "Flow State", date: "2026-09-07T15:30:00", durationMinutes: 90, completed: true },
  { id: "seed-7", presetId: "pomodoro", presetLabel: "Pomodoro", date: "2026-09-08T11:00:00", durationMinutes: 25, completed: true },
  { id: "seed-8", presetId: "deep-work", presetLabel: "Deep Work", date: "2026-09-08T16:00:00", durationMinutes: 18, completed: false },
];

export const DAILY_FOCUS_GOAL_MINUTES = 120;
