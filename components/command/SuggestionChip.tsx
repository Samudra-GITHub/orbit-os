"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuggestionChipProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

export const SuggestionChip = forwardRef<HTMLButtonElement, SuggestionChipProps>(function SuggestionChip(
  { icon: Icon, label, active, onClick, onMouseEnter },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      role="option"
      aria-selected={active}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={cn(
        "flex items-center gap-2 rounded-full border px-3.5 py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
        active
          ? "border-violet-400/40 bg-white/10 text-white"
          : "border-white/10 bg-white/5 text-mist-300 hover:border-white/20 hover:text-white"
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-violet-300" strokeWidth={1.75} />
      {label}
    </motion.button>
  );
});
