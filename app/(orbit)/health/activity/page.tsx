"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Flame, Footprints } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ActivityRings } from "@/components/health/ActivityRings";
import { DAILY_SUMMARY, WEEKLY_ACTIVITY, WORKOUTS } from "@/lib/constants/health";
import { computeWorkoutStreak } from "@/lib/health/computeStats";

const WorkoutTimeline = dynamic(
  () => import("@/components/health/WorkoutTimeline").then((m) => m.WorkoutTimeline),
  { loading: () => <div className="h-40 animate-pulse rounded-3xl bg-white/[0.03]" /> }
);

const NOW = new Date("2026-09-09T12:00:00");

interface TooltipPayloadItem {
  value: number;
}

function ChartTooltip({ active, payload, label, unit }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string; unit: string }) {
  if (!active || !payload?.length) return null;
  const date = label ? new Date(`${label}T00:00:00`).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "";
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">{date}</p>
      <p className="mt-1 font-mono text-sm text-white">
        {payload[0].value.toLocaleString("en-IN")} {unit}
      </p>
    </div>
  );
}

export default function HealthActivityPage() {
  const rings = useMemo(
    () => ({
      move: { value: DAILY_SUMMARY.caloriesBurned, goal: DAILY_SUMMARY.caloriesGoal },
      exercise: { value: DAILY_SUMMARY.exerciseMinutes, goal: DAILY_SUMMARY.exerciseGoal },
      stand: { value: DAILY_SUMMARY.standHours, goal: DAILY_SUMMARY.standGoal },
    }),
    []
  );

  const streak = useMemo(() => computeWorkoutStreak(WORKOUTS.map((w) => w.date), NOW), []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Activity</h1>
          <p className="mt-1 text-sm text-mist-400">Move, exercise, and stand — Apple-Fitness-style.</p>
        </div>
        {streak > 0 && <Badge variant="positive">{streak} day streak</Badge>}
      </div>

      <Card index={0} variant="widget" className="flex items-center justify-center rounded-4xl py-8">
        <ActivityRings {...rings} size={220} />
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card index={1} variant="widget" className="flex flex-col gap-4 rounded-4xl">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mist-400">
            <Footprints className="h-3.5 w-3.5 text-cyan-300" /> Weekly steps
          </p>
          <div style={{ height: 200 }} role="img" aria-label="Steps for the last 7 days, shown as a bar chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_ACTIVITY} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-mist-500)", fontSize: 11 }}
                  tickFormatter={(d: string) => new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                />
                <Tooltip content={<ChartTooltip unit="steps" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="steps" radius={[6, 6, 0, 0]} fill="url(#steps-gradient)" animationDuration={800} />
                <defs>
                  <linearGradient id="steps-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-cyan-400)" />
                    <stop offset="100%" stopColor="var(--color-violet-400)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card index={2} variant="widget" className="flex flex-col gap-4 rounded-4xl">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mist-400">
            <Flame className="h-3.5 w-3.5 text-amber-300" /> Calories burned
          </p>
          <div style={{ height: 200 }} role="img" aria-label="Calories burned for the last 7 days, shown as a bar chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_ACTIVITY} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-mist-500)", fontSize: 11 }}
                  tickFormatter={(d: string) => new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                />
                <Tooltip content={<ChartTooltip unit="kcal" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="calories" radius={[6, 6, 0, 0]} fill="url(#calories-gradient)" animationDuration={800} />
                <defs>
                  <linearGradient id="calories-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Workout timeline</p>
        <WorkoutTimeline workouts={WORKOUTS} />
      </div>
    </div>
  );
}
