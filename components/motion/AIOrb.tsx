"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type AIOrbSize = "sm" | "md" | "lg";

/** Only "idle" is implemented visually — the rest are reserved for when
 *  Orbit gains real voice/AI interaction states. */
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
 * The Orbit AI presence — breathing glow halo, slow rotating ring, gentle
 * vertical float, and a ripple + brighter glow on hover. All loops are
 * skipped under prefers-reduced-motion. `state` is prepared for future
 * listening/thinking/success visuals; only "idle" renders today.
 */
export function AIOrb({ size = "md", state = "idle", className }: AIOrbProps) {
  void state;
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn("relative flex shrink-0 items-center justify-center", sizeStyles[size], className)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* breathing glow halo */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/50 to-cyan-400/50 blur-md"
        animate={
          reduceMotion
            ? undefined
            : { scale: hovered ? [1.15, 1.3, 1.15] : [0.98, 1.04, 0.98], opacity: [0.6, 1, 0.6] }
        }
        transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
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

      {/* slow rotating dashed ring */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full border border-dashed border-white/25"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        animate={reduceMotion ? undefined : { rotate: [0, 8, -4, 0] }}
        transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 shadow-glow-accent"
      >
        <Sparkles className={cn("text-white", iconSizeStyles[size])} strokeWidth={2} />
      </motion.div>
    </motion.div>
  );
}
