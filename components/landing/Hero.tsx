"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { AIOrb } from "@/components/motion/AIOrb";
import { Button } from "@/components/ui/Button";
import { StarfieldBackground } from "@/components/landing/StarfieldBackground";

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <StarfieldBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <AIOrb size="lg" className="h-28 w-28" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-6 font-display text-2xl font-semibold tracking-[0.3em] text-white"
      >
        ORBIT
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl"
      >
        An operating system for your{" "}
        <span className="text-gradient-accent">everyday life</span>.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-4 max-w-xl text-sm text-mist-400 sm:text-base"
      >
        Weather, focus, finance, and AI — orchestrated into one calm, liquid-glass workspace.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mt-8"
      >
        <Button variant="primary" size="lg" onClick={onEnter} className="gap-1.5 rounded-full px-8 shadow-glow-accent-lg">
          Enter Orbit
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6, duration: 0.6 }, y: { delay: 1.6, duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-mist-500"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-mist-500 to-transparent" />
      </motion.div>
    </section>
  );
}
