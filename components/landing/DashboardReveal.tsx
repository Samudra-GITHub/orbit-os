"use client";

import { motion } from "framer-motion";
import { CloudSun, Timer, CalendarClock, Wallet } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

const PREVIEW_WIDGETS = [
  { icon: CloudSun, label: "Weather", value: "24°", sub: "Partly cloudy", span: "sm:col-span-3" },
  { icon: Timer, label: "Focus", value: "25:00", sub: "Deep work", span: "sm:col-span-3" },
  { icon: CalendarClock, label: "Timeline", value: "4 events", sub: "Today", span: "sm:col-span-3" },
  { icon: Wallet, label: "Finance", value: "$860", sub: "12% under budget", span: "sm:col-span-3" },
];

/** A static, lightweight mockup of the real dashboard's widget grid — not
 *  the live components (those carry their own timers/state and aren't
 *  appropriate to mount on a marketing page). Staggers into view once
 *  scrolled into the viewport. */
export function DashboardReveal() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Your day, at a glance</h2>
        <p className="mt-2 max-w-md text-sm text-mist-400">
          A Liquid Glass dashboard that pulls weather, focus, calendar, and finance into one bento layout.
        </p>
      </motion.div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-6">
        {PREVIEW_WIDGETS.map((w, i) => (
          <motion.div
            key={w.label}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={w.span}
          >
            <GlassSurface intensity="default" className="flex flex-col gap-3 rounded-4xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-mist-400">{w.label}</p>
                <w.icon className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
              </div>
              <p className="font-display text-3xl font-semibold text-white">{w.value}</p>
              <p className="text-xs text-mist-400">{w.sub}</p>
            </GlassSurface>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
