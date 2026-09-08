"use client";

import { CloudSun, Wallet, HeartPulse, Briefcase, Music2 } from "lucide-react";
import { ModuleCard } from "@/components/onboarding/ModuleCard";
import { Button } from "@/components/ui/Button";

const MODULES = [
  { icon: CloudSun, title: "SkyCast", description: "Live weather, beautifully forecasted." },
  { icon: Briefcase, title: "Workspace", description: "Projects and tasks, organized." },
  { icon: Wallet, title: "Finance", description: "Spending, budgets, and subscriptions at a glance." },
  { icon: HeartPulse, title: "Health", description: "Steps, sleep, and resting heart rate." },
  { icon: Music2, title: "Music", description: "Keep your soundtrack going." },
];

interface ModulePreviewScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export function ModulePreviewScreen({ onContinue, onBack }: ModulePreviewScreenProps) {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Everything, in one place</h1>
        <p className="mt-2 text-sm text-mist-400">Explore the modules Orbit brings together.</p>
      </div>

      <div className="flex w-full snap-x gap-4 overflow-x-auto px-4 pb-4">
        {MODULES.map((m, i) => (
          <ModuleCard key={m.title} {...m} index={i} />
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
