"use client";

import { Sparkles } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

interface GlassIntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

/** Scales `--glass-intensity` live — the preview panel is a real
 *  `GlassSurface`, so dragging the slider shows the exact blur/opacity
 *  change every glass surface in the app will get, with no separate
 *  simulated preview to keep in sync. */
export function GlassIntensitySlider({ value, onChange }: GlassIntensitySliderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs text-mist-400">
          <span>Subtle</span>
          <span className="font-mono text-white">{Math.round(value * 100)}%</span>
          <span>Intense</span>
        </div>
        <input
          type="range"
          min={0.6}
          max={1.4}
          step={0.05}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-400"
        />
      </div>

      <GlassSurface intensity="raised" interactive={false} className="flex h-20 w-full shrink-0 items-center justify-center rounded-2xl sm:w-40">
        <Sparkles className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
      </GlassSurface>
    </div>
  );
}
