"use client";

import { HardDrive, ShieldCheck, EyeOff, RotateCcw } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/lib/theme";

const PRIVACY_POINTS = [
  {
    icon: HardDrive,
    title: "Local-only storage",
    description: "Your appearance and notification preferences are saved in this browser's local storage — never sent to a server.",
  },
  {
    icon: ShieldCheck,
    title: "No account data leaves this device",
    description: "Orbit runs entirely on mock data in this build. There is no backend, no analytics, and nothing is transmitted.",
  },
  {
    icon: EyeOff,
    title: "No third-party tracking",
    description: "No ad networks, trackers, or third-party scripts are loaded anywhere in Orbit.",
  },
];

export default function PrivacyPage() {
  const { resetAppearance } = useTheme();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Privacy</h1>
        <p className="mt-1 text-sm text-mist-400">How Orbit handles your data.</p>
      </div>

      <div className="flex flex-col gap-3">
        {PRIVACY_POINTS.map((point) => (
          <GlassSurface key={point.title} intensity="subtle" interactive={false} className="rounded-3xl p-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15">
                <point.icon className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{point.title}</p>
                <p className="mt-0.5 text-xs text-mist-400">{point.description}</p>
              </div>
            </div>
          </GlassSurface>
        ))}
      </div>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-3xl p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">Reset personalization data</p>
            <p className="mt-0.5 text-xs text-mist-400">
              Clears your saved theme, accent, wallpaper, and accessibility settings from this browser.
            </p>
          </div>
          <Button variant="outline" size="sm" magnetic={false} onClick={resetAppearance} className="shrink-0">
            <RotateCcw className="h-3.5 w-3.5" /> Reset to defaults
          </Button>
        </div>
      </GlassSurface>
    </div>
  );
}
