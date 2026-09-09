"use client";

import { motion } from "framer-motion";
import { Layers, FileCode2, Wand2, MousePointerClick, Paintbrush, CloudSun } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

const STACK = [
  { icon: Layers, name: "Next.js", note: "App Router, streaming, server components" },
  { icon: FileCode2, name: "TypeScript", note: "End-to-end type safety" },
  { icon: Wand2, name: "Framer Motion", note: "Spring-based motion throughout" },
  { icon: MousePointerClick, name: "Lenis", note: "Smooth, GPU-friendly scrolling" },
  { icon: Paintbrush, name: "Tailwind CSS", note: "Design tokens, zero hardcoded colors" },
  { icon: CloudSun, name: "SkyCast Engine", note: "Live weather, cached and revalidated" },
];

/** A vertical timeline of the stack Orbit is actually built on — each
 *  entry reveals as it scrolls into view, left-to-right alternating for
 *  visual rhythm. */
export function PerformanceShowcase() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Built to be fast</h2>
        <p className="mt-2 max-w-md text-sm text-mist-400">
          No spinners, no janky scroll, no wasted renders — Orbit is engineered, not just styled.
        </p>
      </motion.div>

      <div className="relative flex w-full max-w-lg flex-col gap-4">
        <div aria-hidden className="absolute bottom-2 left-5 top-2 w-px bg-gradient-to-b from-violet-500/40 via-white/10 to-transparent" />
        {STACK.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-12"
          >
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/25">
              <item.icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
            </div>
            <GlassSurface intensity="subtle" className="rounded-2xl p-3.5">
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-mist-400">{item.note}</p>
            </GlassSurface>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
