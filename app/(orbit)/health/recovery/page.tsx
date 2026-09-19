"use client";

import dynamic from "next/dynamic";
import { Wind, Sparkles, Waves, Snowflake, Move } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { RecoveryScoreCard } from "@/components/health/RecoveryScoreCard";
import { DAILY_SUMMARY, RECOVERY_SESSIONS, RECOVERY_TREND, type RecoverySessionType } from "@/lib/constants/health";
import { fadeUp } from "@/lib/motion/variants";

const RecoveryTrendChart = dynamic(() => import("@/components/health/RecoveryTrendChart").then((m) => m.RecoveryTrendChart), {
  loading: () => <div className="h-[220px] animate-pulse rounded-4xl bg-white/[0.03]" />,
});

const SESSION_ICON: Record<RecoverySessionType, typeof Wind> = {
  Breathing: Wind,
  Meditation: Sparkles,
  Stretching: Move,
  "Cold Shower": Snowflake,
  Mobility: Waves,
};

const RECOMMENDATIONS = [
  "Your HRV dips on days with under 7 hours of sleep — protect tonight's bedtime.",
  "A 10-minute breathing session tends to raise tomorrow's recovery score.",
  "Stress has stayed low this week — a good window for a harder training day.",
];

export default function HealthRecoveryPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Recovery</h1>
        <p className="mt-1 text-sm text-mist-400">WHOOP-style readiness — score, vitals, and trend.</p>
      </div>

      <RecoveryScoreCard
        score={DAILY_SUMMARY.recoveryScore}
        heartRate={DAILY_SUMMARY.heartRate}
        restingHeartRate={DAILY_SUMMARY.restingHeartRate}
        hrv={DAILY_SUMMARY.hrv}
        stressLevel={DAILY_SUMMARY.stressLevel}
        index={0}
      />

      <RecoveryTrendChart data={RECOVERY_TREND} index={1} />

      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Recovery sessions</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RECOVERY_SESSIONS.map((session, i) => {
            const Icon = SESSION_ICON[session.type];
            return (
              <motion.div key={session.id} custom={i} variants={fadeUp} initial="hidden" animate="show">
                <GlassSurface intensity="subtle" className="flex h-full flex-col gap-3 rounded-3xl p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]">
                      <Icon className="h-4.5 w-4.5 text-violet-300" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{session.type}</p>
                      <p className="text-[11px] text-mist-500">{session.durationMinutes} min</p>
                    </div>
                  </div>
                  <p className="text-xs text-mist-400">{session.description}</p>
                </GlassSurface>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Card index={2} variant="widget" className="flex flex-col gap-3 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Recommendations</p>
        <ul className="flex flex-col gap-2.5">
          {RECOMMENDATIONS.map((rec, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-mist-200">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" />
              {rec}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
