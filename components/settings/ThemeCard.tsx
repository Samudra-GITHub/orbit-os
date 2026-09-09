"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ThemePreset } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ThemeCardProps {
  preset: ThemePreset;
  selected: boolean;
  onSelect: () => void;
}

/** One selectable theme (ink-preset) tile — a mini swatch of its four
 *  surface tones stacked as bars, so the difference between presets reads
 *  at a glance before it's applied. */
export function ThemeCard({ preset, selected, onSelect }: ThemeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col gap-3 rounded-3xl border p-4 text-left transition-colors",
        selected ? "border-violet-400/50 bg-white/[0.07]" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
      )}
    >
      <div className="flex h-14 overflow-hidden rounded-xl" style={{ backgroundColor: preset.ink[950] }}>
        <div className="flex-1" style={{ backgroundColor: preset.ink[900] }} />
        <div className="flex-1" style={{ backgroundColor: preset.ink[850] }} />
        <div className="flex-1" style={{ backgroundColor: preset.ink[800] }} />
        <div className="flex-1" style={{ backgroundColor: preset.ink[700] }} />
      </div>

      <div>
        <p className="text-sm font-medium text-white">{preset.label}</p>
        <p className="mt-0.5 text-xs text-mist-400">{preset.description}</p>
      </div>

      {selected && (
        <motion.span
          layoutId="theme-card-check"
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500"
        >
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </motion.span>
      )}
    </button>
  );
}
