import type { FocusSession } from "@/lib/constants/focus";

export interface FocusStatsSummary {
  todayMinutes: number;
  weekMinutes: number;
  completedCount: number;
  totalCount: number;
  streakDays: number;
  avgSessionMinutes: number;
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Every Focus stat — today/week totals, streak, averages — derived from
 *  the same session history the Sessions page lists, so there's one
 *  source of truth instead of a separately maintained mock series. */
export function computeFocusStats(sessions: FocusSession[], now = new Date()): FocusStatsSummary {
  const completed = sessions.filter((s) => s.completed);
  const todayStr = isoDate(now);

  const todayMinutes = completed
    .filter((s) => s.date.slice(0, 10) === todayStr)
    .reduce((sum, s) => sum + s.durationMinutes, 0);

  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekMinutes = completed
    .filter((s) => new Date(s.date) >= weekAgo)
    .reduce((sum, s) => sum + s.durationMinutes, 0);

  const avgSessionMinutes = completed.length
    ? Math.round(completed.reduce((sum, s) => sum + s.durationMinutes, 0) / completed.length)
    : 0;

  const daysWithSessions = new Set(completed.map((s) => s.date.slice(0, 10)));
  let streakDays = 0;
  const cursor = new Date(now);
  if (!daysWithSessions.has(todayStr)) cursor.setDate(cursor.getDate() - 1);
  while (daysWithSessions.has(isoDate(cursor))) {
    streakDays++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    todayMinutes,
    weekMinutes,
    completedCount: completed.length,
    totalCount: sessions.length,
    streakDays,
    avgSessionMinutes,
  };
}

export interface DailyMinutes {
  day: string;
  minutes: number;
}

/** Minutes-per-day for the last 7 days (oldest first) — feeds the Stats
 * page's bar chart. */
export function computeWeeklySeries(sessions: FocusSession[], now = new Date()): DailyMinutes[] {
  const completed = sessions.filter((s) => s.completed);
  const days: DailyMinutes[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayStr = isoDate(d);
    const minutes = completed
      .filter((s) => s.date.slice(0, 10) === dayStr)
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    days.push({ day: d.toLocaleDateString("en-US", { weekday: "short" }), minutes });
  }

  return days;
}
