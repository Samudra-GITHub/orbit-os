"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Footprints, Flame, Timer, Heart } from "lucide-react";
import { HealthHero } from "@/components/health/HealthHero";
import { VitalCard } from "@/components/health/VitalCard";
import { SleepCard } from "@/components/health/SleepCard";
import { HydrationTracker } from "@/components/health/HydrationTracker";
import { RecoveryScoreCard } from "@/components/health/RecoveryScoreCard";
import { MoodTracker } from "@/components/health/MoodTracker";
import { InsightCard } from "@/components/health/InsightCard";
import { Card } from "@/components/ui/Card";
import { useMood } from "@/lib/hooks/useMood";
import { DAILY_SUMMARY, SLEEP_HISTORY } from "@/lib/constants/health";

const ActivityRings = dynamic(
  () => import("@/components/health/ActivityRings").then((m) => m.ActivityRings),
  { loading: () => <div className="mx-auto h-[180px] w-[180px] animate-pulse rounded-full bg-white/[0.03]" /> }
);

export default function HealthDashboardPage() {
  const lastNight = useMemo(() => SLEEP_HISTORY.at(-1)!, []);
  const { todayEntry, setMood } = useMood();
  const rings = useMemo(
    () => ({
      move: { value: DAILY_SUMMARY.caloriesBurned, goal: DAILY_SUMMARY.caloriesGoal },
      exercise: { value: DAILY_SUMMARY.exerciseMinutes, goal: DAILY_SUMMARY.exerciseGoal },
      stand: { value: DAILY_SUMMARY.standHours, goal: DAILY_SUMMARY.standGoal },
    }),
    []
  );

  return (
    <div className="flex flex-col gap-5">
      <HealthHero summary={DAILY_SUMMARY} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card index={1} variant="widget" className="flex items-center justify-center rounded-4xl lg:col-span-1">
          <ActivityRings {...rings} />
        </Card>

        <div className="grid grid-cols-2 gap-3 lg:col-span-2">
          <VitalCard icon={Footprints} label="Steps" value={DAILY_SUMMARY.steps.toLocaleString("en-IN")} index={1} />
          <VitalCard icon={Flame} label="Calories" value={`${DAILY_SUMMARY.caloriesBurned}`} unit="kcal" index={2} accent="text-amber-300" />
          <VitalCard icon={Timer} label="Exercise" value={`${DAILY_SUMMARY.exerciseMinutes}`} unit="min" index={3} accent="text-emerald-300" />
          <VitalCard icon={Heart} label="Heart rate" value={`${DAILY_SUMMARY.heartRate}`} unit="bpm" index={4} accent="text-rose-300" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SleepCard night={lastNight} index={2} />
        <HydrationTracker index={3} compact />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecoveryScoreCard
          score={DAILY_SUMMARY.recoveryScore}
          heartRate={DAILY_SUMMARY.heartRate}
          restingHeartRate={DAILY_SUMMARY.restingHeartRate}
          hrv={DAILY_SUMMARY.hrv}
          stressLevel={DAILY_SUMMARY.stressLevel}
          index={4}
        />
        <InsightCard index={5} />
      </div>

      <MoodTracker todayEntry={todayEntry} onSetMood={setMood} index={6} />
    </div>
  );
}
