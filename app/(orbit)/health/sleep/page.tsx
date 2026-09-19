"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import { Moon, Gauge, BedDouble, AlarmClock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { VitalCard } from "@/components/health/VitalCard";
import { DAILY_SUMMARY, SLEEP_HISTORY } from "@/lib/constants/health";
import { computeBedtimeConsistency, computeSleepDebt, formatDurationHM } from "@/lib/health/computeStats";

const SleepChart = dynamic(() => import("@/components/health/SleepChart").then((m) => m.SleepChart), {
  loading: () => <div className="h-[200px] animate-pulse rounded-4xl bg-white/[0.03]" />,
});

const STAGE_COLORS = { deep: "#4c1d95", rem: "var(--color-violet-400)", light: "var(--color-cyan-400)", awake: "#64748b" };

interface TooltipPayloadItem {
  value: number;
  dataKey: string;
}

function StageTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const date = label ? new Date(`${label}T00:00:00`).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "";
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">{date}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-1 font-mono text-xs text-white">
          {p.dataKey}: {p.value}m
        </p>
      ))}
    </div>
  );
}

function bedtimeToDecimal(bedtime: string) {
  const [h, m] = bedtime.split(":").map(Number);
  return h < 12 ? h + 24 + m / 60 : h + m / 60;
}

function decimalToLabel(decimal: number) {
  const normalized = decimal % 24;
  const h = Math.floor(normalized);
  const m = Math.round((normalized - h) * 60);
  const displayHour = h % 24;
  return `${displayHour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export default function HealthSleepPage() {
  const last7 = useMemo(() => SLEEP_HISTORY.slice(-7), []);
  const last14 = SLEEP_HISTORY;
  const lastNight = SLEEP_HISTORY.at(-1)!;
  const debt = useMemo(() => computeSleepDebt(SLEEP_HISTORY, DAILY_SUMMARY.sleepGoal), []);
  const consistency = useMemo(() => computeBedtimeConsistency(SLEEP_HISTORY), []);

  const stageData = last7.map((n) => ({ date: n.date, ...n.stages }));
  const bedtimeData = last14.map((n) => ({ date: n.date, bedtime: bedtimeToDecimal(n.bedtime) }));

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Sleep</h1>
        <p className="mt-1 text-sm text-mist-400">Duration, quality, and consistency across the last two weeks.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <VitalCard icon={Moon} label="Duration" value={formatDurationHM(lastNight.durationMinutes)} index={0} accent="text-violet-300" />
        <VitalCard icon={Gauge} label="Quality" value={`${lastNight.qualityScore}`} unit="/100" index={1} accent="text-cyan-300" />
        <VitalCard icon={BedDouble} label="Bedtime consistency" value={`±${consistency.consistencyMinutes}`} unit="min" index={2} accent="text-emerald-300" />
        <VitalCard icon={AlarmClock} label="Sleep debt" value={`${debt}`} unit="hrs" index={3} accent={debt > 2 ? "text-rose-300" : "text-amber-300"} />
      </div>

      <SleepChart nights={last7} index={4} />

      <Card index={5} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Sleep stages (last 7 nights)</p>
        <div style={{ height: 220 }} role="img" aria-label="Sleep stage breakdown for the last 7 nights, shown as a stacked bar chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stageData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-mist-500)", fontSize: 11 }}
                tickFormatter={(d: string) => new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              />
              <Tooltip content={<StageTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="deep" stackId="stages" fill={STAGE_COLORS.deep} radius={[0, 0, 0, 0]} animationDuration={800} />
              <Bar dataKey="rem" stackId="stages" fill={STAGE_COLORS.rem} animationDuration={800} />
              <Bar dataKey="light" stackId="stages" fill={STAGE_COLORS.light} animationDuration={800} />
              <Bar dataKey="awake" stackId="stages" fill={STAGE_COLORS.awake} radius={[6, 6, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-mist-400">
          {Object.entries(STAGE_COLORS).map(([stage, color]) => (
            <span key={stage} className="flex items-center gap-1.5 capitalize">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
              {stage}
            </span>
          ))}
        </div>
      </Card>

      <Card index={6} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Bedtime timeline (last 14 nights)</p>
        <div style={{ height: 200 }} role="img" aria-label="Bedtime for the last 14 nights, shown as a scatter timeline">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="date"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-mist-500)", fontSize: 10 }}
                tickFormatter={(d: string) => new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric" })}
              />
              <YAxis
                dataKey="bedtime"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-mist-500)", fontSize: 11 }}
                tickFormatter={(v: number) => decimalToLabel(v)}
                domain={[22, 26]}
              />
              <ZAxis range={[70, 70]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as { date: string; bedtime: number };
                  return (
                    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-mist-500">
                        {new Date(`${p.date}T00:00:00`).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                      </p>
                      <p className="mt-1 font-mono text-sm text-white">{decimalToLabel(p.bedtime)}</p>
                    </div>
                  );
                }}
              />
              <Scatter data={bedtimeData} fill="var(--color-violet-400)" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
