"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CloudSun, CloudRain, Sun, Gauge } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

const HOURLY = [22, 24, 25, 24, 21, 20, 19, 23];

const CONDITIONS = [
  { icon: Sun, temp: 26, label: "Clear" },
  { icon: CloudSun, temp: 24, label: "Partly cloudy" },
  { icon: CloudRain, temp: 20, label: "Light rain" },
];

function buildSparkPoints(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = 100 / (values.length - 1);
  return values.map((v, i) => ({ x: i * stepX, y: 40 - ((v - min) / span) * 32 - 4 }));
}

/** Cycles through a few weather conditions to demonstrate SkyCast's live
 *  morph — the temperature, icon, and gradient crossfade rather than cut. */
export function SkyCastShowcase() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const points = buildSparkPoints(HOURLY);
  const sparkPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % CONDITIONS.length), 3200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const condition = CONDITIONS[index];

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">SkyCast, live</h2>
        <p className="mt-2 max-w-md text-sm text-mist-400">
          Real forecasts, hourly curves, and air quality — morphing smoothly as conditions change.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <GlassSurface intensity="raised" className="flex flex-col gap-6 rounded-4xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Bengaluru</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="mt-2 flex items-end gap-2"
                >
                  <span className="text-gradient-accent font-display text-5xl font-semibold">{condition.temp}°</span>
                  <span className="mb-1.5 text-sm text-mist-300">{condition.label}</span>
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.4 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20"
              >
                <condition.icon className="h-9 w-9 text-cyan-300" strokeWidth={1.5} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 text-xs text-cyan-300">
            <Gauge className="h-3.5 w-3.5" />
            AQI 42 · Good
          </div>

          <div className="border-t border-white/10 pt-4">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-16 w-full overflow-visible">
              <path d={sparkPath} fill="none" className="stroke-cyan-400/60" strokeWidth="1.5" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="1.5" className="fill-cyan-300" />
              ))}
            </svg>
            <div className="mt-1 flex justify-between text-[10px] text-mist-500">
              <span>Now</span>
              <span>+7h</span>
            </div>
          </div>
        </GlassSurface>
      </motion.div>
    </section>
  );
}
