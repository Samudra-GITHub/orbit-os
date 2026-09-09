"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { cn } from "@/lib/utils";
import { ACCENTS, WALLPAPERS, type AccentId, type WallpaperId } from "@/lib/constants/onboarding";

/** Reuses the same wallpaper/accent options as onboarding's Personalization
 *  screen for a consistent story, but the morph here is confined to this
 *  section's own bounds — not the app-wide background. */
export function PersonalizationShowcase() {
  const [wallpaper, setWallpaper] = useState<WallpaperId>("cosmos");
  const [accent, setAccent] = useState<AccentId>("violet");

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Make it yours</h2>
        <p className="mt-2 max-w-md text-sm text-mist-400">Wallpapers and accent colors that morph live, no reload.</p>
      </motion.div>

      <div className="relative w-full max-w-md">
        <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 overflow-hidden rounded-[48px]">
          {WALLPAPERS.map((w) => (
            <div
              key={w.id}
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700",
                w.swatch,
                wallpaper === w.id && "opacity-20"
              )}
            />
          ))}
        </div>

        <GlassSurface intensity="raised" className="flex flex-col gap-5 rounded-4xl p-6">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-mist-500">Wallpaper</p>
            <div className="grid grid-cols-4 gap-2.5">
              {WALLPAPERS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWallpaper(w.id)}
                  aria-label={w.label}
                  aria-pressed={wallpaper === w.id}
                  className={cn(
                    "relative h-12 overflow-hidden rounded-xl bg-gradient-to-br transition-transform hover:scale-[1.03]",
                    w.swatch,
                    wallpaper === w.id ? "ring-2 ring-white/70" : "ring-1 ring-white/10"
                  )}
                >
                  {wallpaper === w.id && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Check className="h-4 w-4 text-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-mist-500">Accent color</p>
            <div className="flex gap-2.5">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAccent(a.id)}
                  aria-label={a.label}
                  aria-pressed={accent === a.id}
                  className={cn(
                    "h-8 w-8 rounded-full transition-transform hover:scale-110",
                    a.className,
                    accent === a.id && "ring-2 ring-white ring-offset-2 ring-offset-ink-900"
                  )}
                />
              ))}
            </div>
          </div>
        </GlassSurface>
      </div>
    </section>
  );
}
