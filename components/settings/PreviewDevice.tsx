"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

/**
 * A miniature Orbit dashboard, rendered live — not a static mockup. Its
 * background reads the same `--wallpaper-hue-*` variables as
 * `CosmicBackground`, and its cards are real `GlassSurface` instances, so
 * every Appearance control (theme, accent, wallpaper, glass intensity)
 * updates this preview through the exact same CSS custom properties they
 * update the real app with — nothing here is simulated separately.
 */
export function PreviewDevice() {
  return (
    <div className="relative w-full max-w-[280px] shrink-0 overflow-hidden rounded-[22px] border border-white/10 shadow-glass-lg">
      {/* mini wallpaper mesh — same recipe as CosmicBackground, scaled down */}
      <div
        aria-hidden
        className="absolute inset-0 transition-[background] duration-700 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 25% 15%, color-mix(in oklab, var(--wallpaper-hue-1) 45%, transparent), transparent),
            radial-gradient(ellipse 60% 60% at 80% 35%, color-mix(in oklab, var(--wallpaper-hue-2) 35%, transparent), transparent),
            radial-gradient(ellipse 70% 60% at 45% 95%, color-mix(in oklab, var(--wallpaper-hue-3) 35%, transparent), transparent),
            var(--color-void)
          `,
        }}
      />

      <div className="relative flex flex-col gap-2.5 p-3">
        {/* mini top bar */}
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
          <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-white/40">Orbit OS</span>
        </div>

        {/* mini hero card */}
        <GlassSurface intensity="default" interactive={false} className="rounded-xl p-2.5">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400"
            >
              <Sparkles className="h-3 w-3 text-white" strokeWidth={2} />
            </motion.div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="h-1.5 w-16 rounded-full bg-white/25" />
              <span className="h-1.5 w-10 rounded-full bg-white/15" />
            </div>
            <span className="h-5 w-9 shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
          </div>
        </GlassSurface>

        {/* two mini widgets */}
        <div className="grid grid-cols-2 gap-2">
          <GlassSurface intensity="subtle" interactive={false} className="flex flex-col gap-1.5 rounded-xl p-2.5">
            <span className="h-1.5 w-8 rounded-full bg-white/20" />
            <span className="h-3 w-12 rounded-full bg-white/30" />
            <span className="h-1 w-full rounded-full bg-white/10" />
          </GlassSurface>
          <GlassSurface intensity="subtle" interactive={false} className="flex flex-col gap-1.5 rounded-xl p-2.5">
            <span className="h-1.5 w-8 rounded-full bg-white/20" />
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded-full border-2 border-cyan-300/70" />
              <span className="h-1.5 w-8 rounded-full bg-white/15" />
            </div>
          </GlassSurface>
        </div>
      </div>
    </div>
  );
}
