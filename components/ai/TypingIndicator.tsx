"use client";

import { motion, useReducedMotion } from "framer-motion";

export function TypingIndicator() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-mist-300"
          animate={reduceMotion ? undefined : { y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={reduceMotion ? undefined : { duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
