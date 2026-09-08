"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { CloudSun, CalendarClock, Wallet, Timer } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import type { WidgetType } from "@/lib/constants/ai";

const WEATHER = { temp: 24, condition: "Partly cloudy", humidity: 52, wind: "14 km/h" };
const CALENDAR = [
  { time: "11:30", title: "Focus block · Orbit v2" },
  { time: "14:00", title: "1:1 with Ravi" },
];
const FINANCE = { spent: 860, budget: 1400, change: "12% less than last month" };
const FOCUS = { sessionsToday: 2, target: 5, streak: 12 };

function WeatherWidget() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20">
        <CloudSun className="h-6 w-6 text-cyan-300" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-gradient-accent font-display text-2xl font-semibold">{WEATHER.temp}°</p>
        <p className="text-xs text-mist-400">
          {WEATHER.condition} · {WEATHER.humidity}% humidity · {WEATHER.wind}
        </p>
      </div>
    </div>
  );
}

function CalendarWidget() {
  return (
    <div className="flex flex-col gap-2">
      {CALENDAR.map((e) => (
        <div key={e.time} className="flex items-center gap-3 text-sm">
          <span className="font-mono text-xs text-mist-400">{e.time}</span>
          <span className="text-white">{e.title}</span>
        </div>
      ))}
    </div>
  );
}

function FinanceWidget() {
  const pct = Math.round((FINANCE.spent / FINANCE.budget) * 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-xl font-semibold text-white">${FINANCE.spent}</span>
        <span className="text-xs text-mist-400">/ ${FINANCE.budget}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
        />
      </div>
      <p className="text-xs text-cyan-300">{FINANCE.change}</p>
    </div>
  );
}

function FocusWidget() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20">
        <Timer className="h-6 w-6 text-violet-300" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-sm text-white">
          {FOCUS.sessionsToday}/{FOCUS.target} sessions today
        </p>
        <p className="text-xs text-mist-400">{FOCUS.streak}-day streak</p>
      </div>
    </div>
  );
}

const WIDGET_META: Record<WidgetType, { label: string; icon: typeof CloudSun; render: () => ReactElement }> = {
  weather: { label: "Weather", icon: CloudSun, render: WeatherWidget },
  calendar: { label: "Calendar", icon: CalendarClock, render: CalendarWidget },
  finance: { label: "Finance", icon: Wallet, render: FinanceWidget },
  focus: { label: "Focus", icon: Timer, render: FocusWidget },
};

interface WidgetMessageProps {
  type: WidgetType;
}

export function WidgetMessage({ type }: WidgetMessageProps) {
  const meta = WIDGET_META[type];
  const Content = meta.render;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassSurface intensity="subtle" className="flex max-w-sm flex-col gap-3 rounded-3xl p-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-mist-500">
          <meta.icon className="h-3.5 w-3.5 text-violet-300" />
          {meta.label}
        </div>
        <Content />
      </GlassSurface>
    </motion.div>
  );
}
