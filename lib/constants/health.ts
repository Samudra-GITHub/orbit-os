export type Mood = "Happy" | "Calm" | "Productive" | "Tired" | "Stressed" | "Excited";
export type StressLevel = "Low" | "Moderate" | "High";
export type WorkoutIntensity = "Low" | "Medium" | "High";
export type RecoverySessionType = "Breathing" | "Meditation" | "Stretching" | "Cold Shower" | "Mobility";

/** Single source of truth for mood emoji + heatmap tint — imported by
 *  `HealthHero`, `MoodTracker`, and `MoodCalendar` so all three agree. */
export const MOOD_META: Record<Mood, { emoji: string; color: string }> = {
  Happy: { emoji: "😊", color: "#4ade80" },
  Calm: { emoji: "😌", color: "var(--color-cyan-400)" },
  Productive: { emoji: "⚡", color: "var(--color-violet-400)" },
  Tired: { emoji: "😴", color: "#818cf8" },
  Stressed: { emoji: "😣", color: "#fb7185" },
  Excited: { emoji: "🤩", color: "#fbbf24" },
};

export interface DailySummary {
  healthScore: number;
  steps: number;
  stepsGoal: number;
  caloriesBurned: number;
  caloriesGoal: number;
  exerciseMinutes: number;
  exerciseGoal: number;
  standHours: number;
  standGoal: number;
  sleepHours: number;
  sleepMinutes: number;
  sleepGoal: number;
  waterIntakeL: number;
  waterGoalL: number;
  recoveryScore: number;
  mood: Mood;
  stressLevel: StressLevel;
  heartRate: number;
  restingHeartRate: number;
  hrv: number;
}

export const DAILY_SUMMARY: DailySummary = {
  healthScore: 89,
  steps: 8421,
  stepsGoal: 10000,
  caloriesBurned: 645,
  caloriesGoal: 700,
  exerciseMinutes: 54,
  exerciseGoal: 45,
  standHours: 11,
  standGoal: 12,
  sleepHours: 7,
  sleepMinutes: 38,
  sleepGoal: 8,
  waterIntakeL: 2.3,
  waterGoalL: 3,
  recoveryScore: 82,
  mood: "Happy",
  stressLevel: "Low",
  heartRate: 68,
  restingHeartRate: 60,
  hrv: 61,
};

export interface DayActivity {
  date: string;
  steps: number;
  calories: number;
  exerciseMinutes: number;
  sleepHours: number;
  waterL: number;
  recoveryScore: number;
}

// Last 7 days, ending on "today" (2026-09-09).
export const WEEKLY_ACTIVITY: DayActivity[] = [
  { date: "2026-09-03", steps: 6210, calories: 480, exerciseMinutes: 32, sleepHours: 6.8, waterL: 2.1, recoveryScore: 71 },
  { date: "2026-09-04", steps: 9840, calories: 710, exerciseMinutes: 58, sleepHours: 7.2, waterL: 2.6, recoveryScore: 78 },
  { date: "2026-09-05", steps: 5120, calories: 390, exerciseMinutes: 20, sleepHours: 6.1, waterL: 1.8, recoveryScore: 64 },
  { date: "2026-09-06", steps: 11230, calories: 830, exerciseMinutes: 66, sleepHours: 7.6, waterL: 2.9, recoveryScore: 85 },
  { date: "2026-09-07", steps: 8760, calories: 620, exerciseMinutes: 48, sleepHours: 8.1, waterL: 3.0, recoveryScore: 88 },
  { date: "2026-09-08", steps: 7340, calories: 560, exerciseMinutes: 40, sleepHours: 7.4, waterL: 2.4, recoveryScore: 76 },
  { date: "2026-09-09", steps: 8421, calories: 645, exerciseMinutes: 54, sleepHours: 7.63, waterL: 2.3, recoveryScore: 82 },
];

export interface SleepStage {
  deep: number;
  rem: number;
  light: number;
  awake: number;
}

export interface SleepNight {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  durationMinutes: number;
  qualityScore: number;
  stages: SleepStage;
}

// Last 14 nights, ending 2026-09-09.
export const SLEEP_HISTORY: SleepNight[] = [
  { id: "s1", date: "2026-08-27", bedtime: "23:42", wakeTime: "06:58", durationMinutes: 436, qualityScore: 79, stages: { deep: 78, rem: 92, light: 232, awake: 34 } },
  { id: "s2", date: "2026-08-28", bedtime: "00:15", wakeTime: "07:10", durationMinutes: 415, qualityScore: 71, stages: { deep: 62, rem: 84, light: 228, awake: 41 } },
  { id: "s3", date: "2026-08-29", bedtime: "23:20", wakeTime: "06:45", durationMinutes: 445, qualityScore: 85, stages: { deep: 91, rem: 98, light: 234, awake: 22 } },
  { id: "s4", date: "2026-08-30", bedtime: "23:55", wakeTime: "07:22", durationMinutes: 447, qualityScore: 82, stages: { deep: 84, rem: 95, light: 240, awake: 28 } },
  { id: "s5", date: "2026-08-31", bedtime: "01:10", wakeTime: "07:50", durationMinutes: 400, qualityScore: 58, stages: { deep: 44, rem: 60, light: 244, awake: 52 } },
  { id: "s6", date: "2026-09-01", bedtime: "23:30", wakeTime: "07:05", durationMinutes: 455, qualityScore: 88, stages: { deep: 96, rem: 104, light: 232, awake: 23 } },
  { id: "s7", date: "2026-09-02", bedtime: "23:48", wakeTime: "06:52", durationMinutes: 424, qualityScore: 76, stages: { deep: 70, rem: 88, light: 236, awake: 30 } },
  { id: "s8", date: "2026-09-03", bedtime: "00:05", wakeTime: "06:50", durationMinutes: 405, qualityScore: 68, stages: { deep: 58, rem: 78, light: 234, awake: 35 } },
  { id: "s9", date: "2026-09-04", bedtime: "23:15", wakeTime: "06:57", durationMinutes: 432, qualityScore: 81, stages: { deep: 82, rem: 90, light: 232, awake: 28 } },
  { id: "s10", date: "2026-09-05", bedtime: "00:40", wakeTime: "07:03", durationMinutes: 383, qualityScore: 54, stages: { deep: 38, rem: 55, light: 240, awake: 50 } },
  { id: "s11", date: "2026-09-06", bedtime: "23:25", wakeTime: "07:01", durationMinutes: 456, qualityScore: 90, stages: { deep: 98, rem: 108, light: 230, awake: 20 } },
  { id: "s12", date: "2026-09-07", bedtime: "22:58", wakeTime: "07:04", durationMinutes: 486, qualityScore: 93, stages: { deep: 104, rem: 116, light: 244, awake: 22 } },
  { id: "s13", date: "2026-09-08", bedtime: "23:32", wakeTime: "06:56", durationMinutes: 444, qualityScore: 80, stages: { deep: 80, rem: 92, light: 244, awake: 28 } },
  { id: "s14", date: "2026-09-09", bedtime: "23:18", wakeTime: "06:56", durationMinutes: 458, qualityScore: 84, stages: { deep: 88, rem: 96, light: 246, awake: 28 } },
];

export interface HydrationDay {
  date: string;
  liters: number;
}

// 30 days of hydration, goal 3L/day, ending 2026-09-09.
export const HYDRATION_HISTORY: HydrationDay[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date("2026-09-09T00:00:00");
  date.setDate(date.getDate() - (29 - i));
  // A gentle wave with a couple of low-hydration dips, deterministic (no Math.random) so the
  // heatmap and streak counters render identically on server and client.
  const wave = Math.sin(i / 2.3) * 0.7 + 2.35;
  const dip = i % 9 === 3 ? -0.9 : i % 13 === 6 ? -0.6 : 0;
  const liters = Math.max(0.4, Math.round((wave + dip) * 10) / 10);
  return { date: date.toISOString().slice(0, 10), liters };
});
export const HYDRATION_GOAL_L = 3;

export interface Workout {
  id: string;
  name: string;
  date: string;
  durationMinutes: number;
  calories: number;
  intensity: WorkoutIntensity;
}

export const WORKOUTS: Workout[] = [
  { id: "w1", name: "Morning Walk", date: "2026-09-09", durationMinutes: 28, calories: 140, intensity: "Low" },
  { id: "w2", name: "Push Day", date: "2026-09-08", durationMinutes: 52, calories: 410, intensity: "High" },
  { id: "w3", name: "Yoga", date: "2026-09-07", durationMinutes: 40, calories: 160, intensity: "Low" },
  { id: "w4", name: "Cycling", date: "2026-09-06", durationMinutes: 66, calories: 560, intensity: "High" },
  { id: "w5", name: "Stretching", date: "2026-09-06", durationMinutes: 15, calories: 45, intensity: "Low" },
  { id: "w6", name: "Football", date: "2026-09-05", durationMinutes: 70, calories: 620, intensity: "High" },
  { id: "w7", name: "Running", date: "2026-09-04", durationMinutes: 34, calories: 380, intensity: "Medium" },
  { id: "w8", name: "Pull Day", date: "2026-09-03", durationMinutes: 48, calories: 370, intensity: "High" },
  { id: "w9", name: "Morning Walk", date: "2026-09-02", durationMinutes: 25, calories: 125, intensity: "Low" },
  { id: "w10", name: "Yoga", date: "2026-09-01", durationMinutes: 45, calories: 175, intensity: "Low" },
  { id: "w11", name: "Leg Day", date: "2026-08-31", durationMinutes: 58, calories: 470, intensity: "High" },
  { id: "w12", name: "Cycling", date: "2026-08-30", durationMinutes: 50, calories: 420, intensity: "Medium" },
  { id: "w13", name: "Running", date: "2026-08-29", durationMinutes: 30, calories: 340, intensity: "Medium" },
  { id: "w14", name: "Stretching", date: "2026-08-28", durationMinutes: 18, calories: 50, intensity: "Low" },
  { id: "w15", name: "Football", date: "2026-08-27", durationMinutes: 65, calories: 580, intensity: "High" },
];

export interface MoodEntry {
  date: string;
  mood: Mood;
  note?: string;
}

const MOOD_CYCLE: Mood[] = ["Happy", "Calm", "Productive", "Tired", "Stressed", "Excited", "Happy", "Productive", "Calm"];
const MOOD_NOTES: Partial<Record<Mood, string>> = {
  Happy: "Good energy all day, easy focus.",
  Calm: "Quiet morning, slow and steady.",
  Productive: "Cleared the whole task list before noon.",
  Tired: "Rough night's sleep, dragging a bit.",
  Stressed: "Deadline crunch, tight chest by evening.",
  Excited: "Big news came through today!",
};

// 30 days of mood, ending 2026-09-09.
export const MOOD_HISTORY: MoodEntry[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date("2026-09-09T00:00:00");
  date.setDate(date.getDate() - (29 - i));
  const mood = MOOD_CYCLE[i % MOOD_CYCLE.length];
  return { date: date.toISOString().slice(0, 10), mood, note: i % 3 === 0 ? MOOD_NOTES[mood] : undefined };
});

export interface RecoverySession {
  id: string;
  type: RecoverySessionType;
  durationMinutes: number;
  description: string;
}

export const RECOVERY_SESSIONS: RecoverySession[] = [
  { id: "r1", type: "Breathing", durationMinutes: 5, description: "Box breathing to lower resting heart rate before bed." },
  { id: "r2", type: "Meditation", durationMinutes: 10, description: "Guided body-scan meditation for stress relief." },
  { id: "r3", type: "Stretching", durationMinutes: 12, description: "Full-body mobility flow for post-workout recovery." },
  { id: "r4", type: "Cold Shower", durationMinutes: 3, description: "Cold exposure to boost alertness and HRV." },
  { id: "r5", type: "Mobility", durationMinutes: 15, description: "Hip and shoulder mobility drills for desk-day stiffness." },
];

export interface RecoveryTrendPoint {
  date: string;
  score: number;
  hrv: number;
  restingHeartRate: number;
}

export const RECOVERY_TREND: RecoveryTrendPoint[] = [
  { date: "2026-09-03", score: 71, hrv: 52, restingHeartRate: 63 },
  { date: "2026-09-04", score: 78, hrv: 57, restingHeartRate: 62 },
  { date: "2026-09-05", score: 64, hrv: 48, restingHeartRate: 65 },
  { date: "2026-09-06", score: 85, hrv: 63, restingHeartRate: 59 },
  { date: "2026-09-07", score: 88, hrv: 66, restingHeartRate: 58 },
  { date: "2026-09-08", score: 76, hrv: 55, restingHeartRate: 61 },
  { date: "2026-09-09", score: 82, hrv: 61, restingHeartRate: 60 },
];

export interface HealthInsight {
  text: string;
}

export const HEALTH_INSIGHTS: HealthInsight[] = [
  { text: "Sleep improved 18% this week compared to last." },
  { text: "Hydration streak reached 5 days — keep it going." },
  { text: "Recovery score dropped after a poor night's sleep on Sep 5." },
  { text: "Your walking average increased by 1,200 steps this week." },
  { text: "You're sleeping 42 minutes more than last week on average." },
  { text: "Hydration goal completed 4 days in a row." },
  { text: "Recovery tends to improve on days you stretch." },
];
