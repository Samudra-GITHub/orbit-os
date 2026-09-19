"use client";

import { motion } from "framer-motion";
import { springs } from "@/lib/motion/springs";
import { Check } from "lucide-react";
import type { AccentPreset } from "@/lib/theme";

interface AccentPickerProps {
  accents: AccentPreset[];
  selected: string;
  onSelect: (id: AccentPreset["id"]) => void;
}

/** A row of accent-hue swatches — selecting one re-tints `--color-violet-*`
 *  (and everything derived from it: buttons, glows, the hero gradient)
 *  app-wide via `ThemeProvider`. */
export function AccentPicker({ accents, selected, onSelect }: AccentPickerProps) {
  return (
    <div className="flex flex-wrap gap-3.5">
      {accents.map((accent) => {
        const isSelected = accent.id === selected;
        return (
          <button
            key={accent.id}
            type="button"
            aria-label={accent.label}
            aria-pressed={isSelected}
            onClick={() => onSelect(accent.id)}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className="relative flex h-11 w-11 items-center justify-center rounded-full transition-shadow"
              style={{
                backgroundColor: accent.hex[500],
                boxShadow: isSelected
                  ? `0 0 0 3px var(--color-ink-900), 0 0 0 5px ${accent.hex[400]}`
                  : `0 0 20px -4px ${accent.hex[500]}99`,
              }}
            >
              {isSelected && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={springs.picker}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90"
                >
                  <Check className="h-3 w-3 text-ink-900" strokeWidth={3} />
                </motion.span>
              )}
            </span>
            <span className="text-[11px] text-mist-400">{accent.label}</span>
          </button>
        );
      })}
    </div>
  );
}
