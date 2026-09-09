"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { CloudSun, Timer, CalendarClock, Wallet, Sparkles, type LucideIcon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

interface Fragment {
  icon: LucideIcon;
  label: string;
  from: { x: number; y: number; rotate: number };
}

const FRAGMENTS: Fragment[] = [
  { icon: CloudSun, label: "Weather", from: { x: -220, y: -80, rotate: -12 } },
  { icon: Timer, label: "Focus", from: { x: 200, y: -120, rotate: 10 } },
  { icon: CalendarClock, label: "Calendar", from: { x: -180, y: 140, rotate: 8 } },
  { icon: Wallet, label: "Finance", from: { x: 220, y: 120, rotate: -8 } },
  { icon: Sparkles, label: "AI", from: { x: 0, y: -200, rotate: 0 } },
];

interface OrbitFragmentProps {
  fragment: Fragment;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}

/** Its own component (not an inline callback) so each instance can call
 *  `useTransform` — hooks must run in a component body, never inside a
 *  `.map()` in the parent. */
function OrbitFragment({ fragment, index, total, progress, reduceMotion }: OrbitFragmentProps) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 130;
  const targetX = Math.cos(angle) * radius;
  const targetY = Math.sin(angle) * radius;

  const x = useTransform(progress, [0, 1], [fragment.from.x, targetX]);
  const y = useTransform(progress, [0, 1], [fragment.from.y, targetY]);
  const rotate = useTransform(progress, [0, 1], [fragment.from.rotate * 4, 0]);
  const opacity = useTransform(progress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <motion.div style={reduceMotion ? undefined : { x, y, rotate, opacity }} animate={reduceMotion ? { opacity: 1 } : undefined} className="absolute">
      <GlassSurface intensity="default" interactive={false} className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-2xl">
        <fragment.icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
        <span className="text-[9px] text-mist-400">{fragment.label}</span>
      </GlassSurface>
    </motion.div>
  );
}

/** As this section scrolls through the viewport, five glass fragments fly
 *  in from scattered offsets and converge into a loose ring — Orbit's
 *  interface "assembling" itself. Driven by scroll progress, not time, so
 *  it plays exactly in sync with how fast the user scrolls. */
export function OrbitAwakens() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="mb-16 text-center">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Orbit awakens</h2>
        <p className="mt-2 text-sm text-mist-400">Every part of your day, assembling into one interface.</p>
      </div>

      <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
        <div className="absolute h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-400/40 blur-2xl" />
        {FRAGMENTS.map((fragment, i) => (
          <OrbitFragment
            key={fragment.label}
            fragment={fragment}
            index={i}
            total={FRAGMENTS.length}
            progress={scrollYProgress}
            reduceMotion={!!reduceMotion}
          />
        ))}
      </div>
    </section>
  );
}
