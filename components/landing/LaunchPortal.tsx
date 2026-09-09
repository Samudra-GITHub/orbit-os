"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AIOrb } from "@/components/motion/AIOrb";
import { Button } from "@/components/ui/Button";

interface LaunchPortalProps {
  onEnter: () => void;
}

/** The closing beat: the AI Orb pulses inside an expanding portal ring,
 *  and the CTA click triggers a full-screen expanding-circle flash before
 *  the caller navigates — mirrors onboarding's own launch sequence so the
 *  story lands somewhere familiar. */
export function LaunchPortal({ onEnter }: LaunchPortalProps) {
  const reduceMotion = useReducedMotion();
  const [launching, setLaunching] = useState(false);

  function handleEnter() {
    setLaunching(true);
    setTimeout(onEnter, reduceMotion ? 0 : 550);
  }

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {!reduceMotion && (
        <motion.div
          aria-hidden
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.6, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          className="pointer-events-none absolute h-48 w-48 rounded-full border border-violet-400/40"
        />
      )}

      <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7 }}>
        <AIOrb size="lg" className="h-32 w-32" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-8 max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl"
      >
        Your day is waiting.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-3 max-w-md text-sm text-mist-400"
      >
        Step into Orbit and let it get to know your day.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8"
      >
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
            animate={{ scale: 40, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.84, 0] }}
            className="pointer-events-none fixed left-1/2 top-1/2 z-50 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
