"use client";

import { motion } from "framer-motion";
import { springs } from "@/lib/motion/springs";
import { Check } from "lucide-react";
import type { WallpaperPreset } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface WallpaperPickerProps {
  wallpapers: WallpaperPreset[];
  selected: string;
  onSelect: (id: WallpaperPreset["id"]) => void;
}

/** The 12-wallpaper gallery — each tile previews its own three-hue mesh
 *  gradient, the same recipe `CosmicBackground` paints behind the whole
 *  app, so the preview matches what selecting it will actually look like. */
export function WallpaperPicker({ wallpapers, selected, onSelect }: WallpaperPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {wallpapers.map((wallpaper) => {
        const isSelected = wallpaper.id === selected;
        const [hue1, hue2, hue3] = wallpaper.hues;
        return (
          <button
            key={wallpaper.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(wallpaper.id)}
            className="flex flex-col gap-2"
          >
            <div
              className={cn(
                "relative h-20 overflow-hidden rounded-2xl border transition-colors",
                isSelected ? "border-violet-400/60" : "border-white/10"
              )}
              style={{
                background: `
                  radial-gradient(ellipse 70% 60% at 25% 20%, color-mix(in oklab, ${hue1} 55%, transparent), transparent),
                  radial-gradient(ellipse 60% 60% at 75% 40%, color-mix(in oklab, ${hue2} 45%, transparent), transparent),
                  radial-gradient(ellipse 70% 60% at 50% 90%, color-mix(in oklab, ${hue3} 45%, transparent), transparent),
                  var(--color-void)
                `,
              }}
            >
              {isSelected && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={springs.picker}
                  className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500"
                >
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </motion.span>
              )}
            </div>
            <span className="text-xs text-mist-300">{wallpaper.label}</span>
          </button>
        );
      })}
    </div>
  );
}
