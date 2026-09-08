"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  total: number;
  current: number;
}

export function ProgressIndicator({ total, current }: ProgressIndicatorProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      className="fixed left-1/2 top-6 z-30 flex -translate-x-1/2 items-center gap-2 sm:top-8"
    >
      {Array.from({ length: total }).map((_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <motion.span
            key={stepNum}
            animate={{ width: isActive ? 28 : 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={cn(
              "h-1.5 rounded-full transition-colors duration-300",
              isActive
                ? "bg-gradient-to-r from-violet-400 to-cyan-400"
                : isDone
                  ? "bg-white/50"
                  : "bg-white/15"
            )}
          />
        );
      })}
    </div>
  );
}
