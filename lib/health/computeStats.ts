import type { HydrationDay, MoodEntry, SleepNight } from "@/lib/constants/health";

export function daysUntil(dateStr: string, now: Date) {
  const target = new Date(`${dateStr}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function formatDurationHM(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
}

export function computeHydrationStreak(history: HydrationDay[], goalL: number) {
  let streak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].liters >= goalL) streak++;
    else break;
  }
  return streak;
}

export interface WeekPoint {
  date: string;
  amount: number;
}

/** Last 7 entries of a { date }-keyed history, mapped to a chart-friendly shape. */
export function lastNDays<T extends { date: string }>(history: T[], n: number) {
  return history.slice(-n);
}

export function computeSleepDebt(nights: SleepNight[], goalHours: number, n = 7) {
  const recent = nights.slice(-n);
  const totalGoalMinutes = goalHours * 60 * recent.length;
  const totalSleptMinutes = recent.reduce((sum, night) => sum + night.durationMinutes, 0);
  return Math.max(0, Math.round((totalGoalMinutes - totalSleptMinutes) / 60 * 10) / 10);
}

export function computeBedtimeConsistency(nights: SleepNight[], n = 7) {
  const recent = nights.slice(-n).map((night) => {
    const [h, m] = night.bedtime.split(":").map(Number);
    // Normalize past-midnight bedtimes (e.g. 00:40) onto the same continuous
    // scale as evening bedtimes (23:30) by treating anything before 12:00 as "+24h".
    return h < 12 ? h + 24 + m / 60 : h + m / 60;
  });
  const avg = recent.reduce((sum, v) => sum + v, 0) / recent.length;
  const variance = recent.reduce((sum, v) => sum + (v - avg) ** 2, 0) / recent.length;
  const stdDevMinutes = Math.sqrt(variance) * 60;
  return { avgBedtimeDecimal: avg % 24, consistencyMinutes: Math.round(stdDevMinutes) };
}

export function computeMoodStreak(history: MoodEntry[]) {
  if (history.length === 0) return { mood: null as null | MoodEntry["mood"], streak: 0 };
  const current = history[history.length - 1].mood;
  let streak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].mood === current) streak++;
    else break;
  }
  return { mood: current, streak };
}

export function computeMoodCounts(history: MoodEntry[]) {
  const counts: Record<string, number> = {};
  for (const entry of history) counts[entry.mood] = (counts[entry.mood] ?? 0) + 1;
  return counts;
}

function toLocalDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function computeWorkoutStreak(workoutDates: string[], now: Date) {
  const dateSet = new Set(workoutDates);
  let streak = 0;
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // Local date key, not `toISOString` — that converts to UTC first and can
  // shift the date by a day depending on the runtime's timezone offset.
  while (dateSet.has(toLocalDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
