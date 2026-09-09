"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springs } from "@/lib/motion/springs";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/** A Liquid Glass toggle switch — spring-driven thumb, accent-gradient
 *  track when on. The shared control behind every on/off setting in
 *  Settings (notification categories, accessibility flags). */
export function Switch({ checked, onCheckedChange, label, disabled, className }: SwitchProps) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 disabled:pointer-events-none disabled:opacity-40",
        checked ? "border-transparent bg-gradient-to-r from-violet-500 to-cyan-400" : "border-white/15 bg-white/10",
        className
      )}
    >
      <motion.span
        aria-hidden
        className="h-5 w-5 rounded-full bg-white shadow-glow-white"
        animate={{ x: checked ? 22 : 4 }}
        transition={reduceMotion ? { duration: 0 } : springs.snappy}
      />
    </button>
  );
}
