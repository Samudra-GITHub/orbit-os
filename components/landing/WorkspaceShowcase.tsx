"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { FileText, KanbanSquare, FolderOpen } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { SharedMorph } from "@/components/effects/SharedMorph";

const PANELS = [
  {
    id: "notes",
    label: "Notes",
    icon: FileText,
    content: (
      <div className="flex flex-col gap-2">
        <div className="h-3 w-2/3 rounded bg-white/10" />
        <div className="h-2 w-full rounded bg-white/[0.06]" />
        <div className="h-2 w-5/6 rounded bg-white/[0.06]" />
      </div>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: KanbanSquare,
    content: (
      <div className="flex gap-2">
        {["Ideas", "Building", "Done"].map((col) => (
          <div key={col} className="flex-1 rounded-xl bg-white/[0.04] p-2">
            <div className="mb-1.5 h-1.5 w-8 rounded-full bg-white/15" />
            <div className="h-6 rounded-lg bg-white/[0.07]" />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "files",
    label: "Files",
    icon: FolderOpen,
    content: (
      <div className="flex flex-col gap-1.5">
        {["Launch Brief.doc", "Roadmap.sheet", "Hero Shot.png"].map((f) => (
          <div key={f} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-mist-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            {f}
          </div>
        ))}
      </div>
    ),
  },
];

const CYCLE_MS = 2600;

/** Auto-cycles between Notes, Projects, and Files — a single glass panel
 *  morphs its content and header rather than three separate cards
 *  cutting between each other. */
export function WorkspaceShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % PANELS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [inView, reduceMotion]);

  const panel = PANELS[index];

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">One workspace, everything in it</h2>
        <p className="mt-2 max-w-md text-sm text-mist-400">Notes, projects, and files — all Liquid Glass, all Orbit.</p>
      </motion.div>

      <div className="flex w-full max-w-md flex-col gap-4">
        <div className="flex justify-center gap-2">
          {PANELS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setIndex(i)}
              aria-label={p.label}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                i === index ? "border-violet-400/40 bg-white/10 text-white" : "border-white/10 text-mist-400"
              }`}
            >
              <p.icon className="h-3 w-3" />
              {p.label}
            </button>
          ))}
        </div>

        <SharedMorph id="workspace-panel">
          <GlassSurface intensity="raised" interactive={false} className="min-h-[220px] rounded-4xl p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-mist-500">
                  <panel.icon className="h-3.5 w-3.5 text-cyan-300" />
                  {panel.label}
                </div>
                {panel.content}
              </motion.div>
            </AnimatePresence>
          </GlassSurface>
        </SharedMorph>
      </div>
    </section>
  );
}
