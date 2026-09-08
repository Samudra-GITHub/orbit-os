"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AIOrb } from "@/components/motion/AIOrb";
import { Button } from "@/components/ui/Button";
import type { OnboardingProfile } from "@/lib/constants/onboarding";

interface LaunchSequenceScreenProps {
  profile: OnboardingProfile;
  onEnter: () => void;
  onBack: () => void;
}

export function LaunchSequenceScreen({ profile, onEnter, onBack }: LaunchSequenceScreenProps) {
  const name = profile.name.trim() || "there";
  const reduceMotion = useReducedMotion();
  const [launching, setLaunching] = useState(false);

  function handleEnter() {
    setLaunching(true);
    setTimeout(onEnter, reduceMotion ? 0 : 550);
  }

  return (
    <div className="relative flex flex-col items-center gap-8 px-4 text-center">
      {/* faint dashboard silhouette behind the orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.06]"
      >
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 w-24 rounded-2xl bg-white" />
          ))}
        </div>
      </div>

      {/* portal glow ring */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.4, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          className="pointer-events-none absolute h-40 w-40 rounded-full border border-violet-400/40"
        />
      )}

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <AIOrb size="lg" className="h-32 w-32" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Welcome, {name}.</h1>
        <p className="mt-2 text-sm text-mist-400">Orbit is ready when you are.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <Button variant="ghost" onClick={onBack} disabled={launching}>
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleEnter}
          disabled={launching}
          className="gap-1.5 rounded-full px-8 shadow-glow-accent-lg"
        >
          Enter Orbit
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {launching && (
          <motion.div
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 30, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.84, 0] }}
            className="pointer-events-none fixed left-1/2 top-1/2 z-50 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
