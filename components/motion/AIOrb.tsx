"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn, scaleDrift } from "@/lib/utils";
import { aiOrbHalo, aiOrbRing } from "@/lib/motion/variants";
import { useTheme } from "@/lib/theme";

export type AIOrbSize = "sm" | "md" | "lg";

/** `idle` is the state used by every current Orbit surface; `listening` /
 *  `thinking` / `success` are wired up (see `lib/motion/variants.ts`) and
 *  ready for when Orbit gets real voice/AI interaction to drive them. */
export type AIOrbState = "idle" | "listening" | "thinking" | "success";

interface AIOrbProps {
  size?: AIOrbSize;
  state?: AIOrbState;
  className?: string;
}

const sizeStyles: Record<AIOrbSize, string> = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-20 w-20",
};

const iconSizeStyles: Record<AIOrbSize, string> = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-9 w-9",
};

/**
 * The Orbit AI presence. Halo and ring motion come from the shared
 * `aiOrbHalo`/`aiOrbRing` variants keyed by `state` — Orbit's motion
 * engine is the single place those four states are defined, so a future
 * voice feature just needs to pass `state="listening"` etc. rather than
 * teach this component new animation.
 */
export function AIOrb({ size = "md", state = "idle", className }: AIOrbProps) {
  const reduceMotion = useReducedMotion();
  const { animationIntensity } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn("relative flex shrink-0 items-center justify-center", sizeStyles[size], className)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={reduceMotion ? undefined : { y: scaleDrift([0, -6, 0], animationIntensity) }}
      transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* breathing glow halo — state-driven */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/50 to-cyan-400/50 blur-md"
        variants={aiOrbHalo}
        animate={reduceMotion ? undefined : hovered && state === "idle" ? "listening" : state}
      />

      {/* hover ripple */}
      {hovered && !reduceMotion && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-white/40"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}

      {/* rotating dashed ring — speeds up per state */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full border border-dashed border-white/25"
        variants={aiOrbRing}
        animate={reduceMotion ? undefined : state}
      />

      <motion.div
        animate={reduceMotion ? undefined : { rotate: scaleDrift([0, 8, -4, 0], animationIntensity) }}
        transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 shadow-glow-accent"
      >
        <Sparkles className={cn("text-white", iconSizeStyles[size])} strokeWidth={2} />
      </motion.div>
    </motion.div>
  );
}
