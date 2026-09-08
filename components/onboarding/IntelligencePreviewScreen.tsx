"use client";

import { CalendarClock, CloudSun, Timer, Wallet, Sparkles } from "lucide-react";
import { WidgetPreviewCard } from "@/components/onboarding/WidgetPreviewCard";
import { Button } from "@/components/ui/Button";
import { GlassSurface } from "@/components/ui/GlassSurface";
import type { OnboardingProfile } from "@/lib/constants/onboarding";

const WIDGETS = [
  { icon: CloudSun, title: "Weather", value: "22° · Partly cloudy" },
  { icon: CalendarClock, title: "Calendar", value: "4 events today" },
  { icon: Timer, title: "Focus", value: "2 sessions planned" },
  { icon: Wallet, title: "Finance", value: "12% under budget" },
];

interface IntelligencePreviewScreenProps {
  profile: OnboardingProfile;
  onContinue: () => void;
  onBack: () => void;
}

export function IntelligencePreviewScreen({ profile, onContinue, onBack }: IntelligencePreviewScreenProps) {
  const name = profile.name.trim() || "there";

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-8 px-4 text-center">
      <div>
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Orbit is already working</h1>
        <p className="mt-2 text-sm text-mist-400">A glimpse of what it noticed for you.</p>
      </div>

      <GlassSurface intensity="default" interactive={false} className="flex w-full max-w-md items-start gap-3 p-5 text-left">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <p className="text-sm text-white/90">
          Hi {name} — I&rsquo;ve set up your day: 4 events, clear weather, and two open focus windows. Here&rsquo;s
          what I&rsquo;m tracking.
        </p>
      </GlassSurface>

      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        {WIDGETS.map((w, i) => (
          <WidgetPreviewCard key={w.title} {...w} index={i} />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" size="lg" onClick={onContinue} className="rounded-full px-8">
          Continue
        </Button>
      </div>
    </div>
  );
}
