"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { FocusTimer } from "@/components/focus/FocusTimer";
import { MusicWidget } from "@/components/focus/MusicWidget";
import { QuoteCard } from "@/components/focus/QuoteCard";
import { Button } from "@/components/ui/Button";
import { useFocusTimer } from "@/lib/hooks/useFocusTimer";
import { useFocusSettings } from "@/lib/hooks/useFocusSettings";
import type { AmbientScene, FocusPreset } from "@/lib/constants/focus";

interface FocusModeOverlayProps {
  open: boolean;
  preset: FocusPreset;
  scene: AmbientScene;
  onClose: () => void;
  onComplete: (actualMinutes: number) => void;
}

/**
 * The full-screen Focus Mode takeover — fixed above the entire app
 * (sidebar, topbar, command center) so starting a session feels like
 * leaving Orbit's chrome behind entirely. Mounted once from the Overview
 * page and toggled via `open`; `AnimatePresence` handles the crossfade in
 * and out, matching `CommandOverlay`'s established pattern for full-screen
 * takeovers elsewhere in Orbit.
 */
export function FocusModeOverlay({ open, preset, scene, onClose, onComplete }: FocusModeOverlayProps) {
  const reduceMotion = useReducedMotion();
  const { settings } = useFocusSettings();
  const [h1, h2, h3] = scene.hues;

  const { secondsLeft, running, progress, isComplete, toggle, reset } = useFocusTimer({
    totalSeconds: preset.workMinutes * 60,
    onComplete: () => onComplete(preset.workMinutes),
  });

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 20% 15%, color-mix(in oklab, ${h1} 40%, transparent), transparent),
              radial-gradient(ellipse 65% 60% at 80% 30%, color-mix(in oklab, ${h2} 32%, transparent), transparent),
              radial-gradient(ellipse 70% 65% at 50% 95%, color-mix(in oklab, ${h3} 32%, transparent), transparent),
              var(--color-void)
            `,
          }}
        >
          <div className="bg-cosmic-noise pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" />

          <button
            onClick={handleClose}
            aria-label="Exit Focus Mode"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70">
            {scene.label}
          </span>

          {isComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <CheckCircle2 className="h-16 w-16 text-cyan-300" strokeWidth={1.5} />
              <div>
                <p className="font-display text-2xl font-semibold text-white">Session complete</p>
                <p className="mt-1 text-sm text-white/60">
                  {preset.workMinutes} minutes of {preset.label.toLowerCase()}. Nice work.
                </p>
              </div>
              <Button variant="primary" size="lg" onClick={handleClose} className="mt-2">
                Done
              </Button>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-10 px-4">
              <FocusTimer
                secondsLeft={secondsLeft}
                progress={progress}
                running={running}
                presetLabel={preset.label}
                size="xl"
                onToggle={toggle}
                onReset={reset}
                transparent
              />
              <QuoteCard transparent />
            </div>
          )}

          {settings.soundEnabled && (
            <div className="absolute bottom-6 left-1/2 w-full max-w-xs -translate-x-1/2 px-4">
              <MusicWidget transparent />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
