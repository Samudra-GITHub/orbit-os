"use client";

import { motion } from "framer-motion";
import { springs } from "@/lib/motion/springs";
import { Check } from "lucide-react";
import type { AmbientScene, AmbientSceneId } from "@/lib/constants/focus";
import { cn } from "@/lib/utils";

interface AmbientScenePickerProps {
  scenes: AmbientScene[];
  selected: AmbientSceneId;
  onSelect: (id: AmbientSceneId) => void;
  compact?: boolean;
}

/** A gallery of ambient scenes — each tile previews the same three-hue
 *  mesh gradient `FocusModeOverlay` paints as its full-screen background,
 *  so the preview matches what selecting it actually looks like. */
export function AmbientScenePicker({ scenes, selected, onSelect, compact = false }: AmbientScenePickerProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-3", compact ? "sm:grid-cols-6" : "sm:grid-cols-4")}>
      {scenes.map((scene) => {
        const isSelected = scene.id === selected;
        const [h1, h2, h3] = scene.hues;
        return (
          <button
            key={scene.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(scene.id)}
            className="flex flex-col gap-1.5"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border transition-colors",
                compact ? "h-12" : "h-16",
                isSelected ? "border-violet-400/60" : "border-white/10"
              )}
              style={{
                background: `
                  radial-gradient(ellipse 70% 60% at 25% 20%, color-mix(in oklab, ${h1} 55%, transparent), transparent),
                  radial-gradient(ellipse 60% 60% at 75% 40%, color-mix(in oklab, ${h2} 45%, transparent), transparent),
                  radial-gradient(ellipse 70% 60% at 50% 90%, color-mix(in oklab, ${h3} 45%, transparent), transparent),
                  var(--color-void)
                `,
              }}
            >
              {isSelected && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={springs.picker}
                  className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500"
                >
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </motion.span>
              )}
            </div>
            {!compact && <span className="text-xs text-mist-300">{scene.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
