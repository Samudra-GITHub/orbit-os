"use client";

import { motion } from "framer-motion";
import { Timer, Brain, Waves, Check, type LucideIcon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import type { FocusPreset, PresetId } from "@/lib/constants/focus";
import { cn } from "@/lib/utils";

const presetIcon: Record<PresetId, LucideIcon> = {
  pomodoro: Timer,
  "deep-work": Brain,
  flow: Waves,
};

interface SessionPresetCardProps {
  preset: FocusPreset;
  selected?: boolean;
  index?: number;
  onSelect: () => void;
}

/** A selectable preset tile — used both to launch a session directly from
 *  the Overview page and to pick a default on the Settings page. */
export function SessionPresetCard({ preset, selected = false, index = 0, onSelect }: SessionPresetCardProps) {
  const Icon = presetIcon[preset.id];

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="text-left"
    >
      <GlassSurface
        intensity={selected ? "raised" : "subtle"}
        className={cn("relative flex h-full flex-col gap-3 rounded-3xl p-5", selected && "ring-1 ring-violet-400/40")}
      >
        {selected && (
          <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </span>
        )}
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/25">
          <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-medium text-white">{preset.label}</p>
          <p className="mt-0.5 text-xs text-mist-400">{preset.description}</p>
        </div>
        <div className="mt-auto flex items-center gap-2 border-t border-white/[0.08] pt-3 text-xs text-mist-400">
          <span className="font-mono text-white">{preset.workMinutes}m</span> focus
          <span className="text-mist-600">·</span>
          <span className="font-mono text-white">{preset.breakMinutes}m</span> break
        </div>
      </GlassSurface>
    </motion.button>
  );
}
