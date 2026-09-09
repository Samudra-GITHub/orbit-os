"use client";

import { Eye, Contrast, Type, MousePointerClick, Zap } from "lucide-react";
import { AccessibilityCard } from "@/components/settings/AccessibilityCard";
import { Switch } from "@/components/ui/Switch";
import { useTheme } from "@/lib/theme";

export default function AccessibilityPage() {
  const {
    reduceMotion,
    highContrast,
    fontScale,
    cursorSpotlight,
    animationIntensity,
    setReduceMotion,
    setHighContrast,
    setFontScale,
    setCursorSpotlight,
    setAnimationIntensity,
  } = useTheme();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Accessibility</h1>
        <p className="mt-1 text-sm text-mist-400">Every setting here applies immediately, app-wide.</p>
      </div>

      <AccessibilityCard
        icon={Eye}
        title="Reduced motion"
        description="Forces every animation in Orbit into its reduced-motion state, regardless of your OS setting."
      >
        <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} label="Reduced motion" />
      </AccessibilityCard>

      <AccessibilityCard
        icon={Contrast}
        title="High contrast"
        description="Brightens secondary text and border opacity across every surface for better legibility."
      >
        <Switch checked={highContrast} onCheckedChange={setHighContrast} label="High contrast" />
      </AccessibilityCard>

      <AccessibilityCard
        icon={Type}
        title="Font scaling"
        description="Scales all text in Orbit, from 90% up to 130% of the default size."
      >
        <div className="flex w-40 items-center gap-3">
          <input
            type="range"
            min={90}
            max={130}
            step={5}
            value={fontScale}
            onChange={(e) => setFontScale(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-400"
          />
          <span className="w-10 shrink-0 text-right font-mono text-xs text-white">{fontScale}%</span>
        </div>
      </AccessibilityCard>

      <AccessibilityCard
        icon={MousePointerClick}
        title="Cursor spotlight"
        description="The ambient glow that follows your cursor across the app and glass surfaces."
      >
        <Switch checked={cursorSpotlight} onCheckedChange={setCursorSpotlight} label="Cursor spotlight" />
      </AccessibilityCard>

      <AccessibilityCard
        icon={Zap}
        title="Animation intensity"
        description="Scales how far ambient motion travels — the background's drift, the AI Orb's breathing — without turning it off entirely."
      >
        <div className="flex w-40 items-center gap-3">
          <input
            type="range"
            min={50}
            max={150}
            step={10}
            value={animationIntensity * 100}
            onChange={(e) => setAnimationIntensity(Number(e.target.value) / 100)}
            disabled={reduceMotion}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
          />
          <span className="w-10 shrink-0 text-right font-mono text-xs text-white">
            {Math.round(animationIntensity * 100)}%
          </span>
        </div>
      </AccessibilityCard>
    </div>
  );
}
