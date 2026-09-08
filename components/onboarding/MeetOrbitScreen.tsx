"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion } from "framer-motion";
import { Sparkles, CloudSun, Briefcase } from "lucide-react";
import { FeatureCard } from "@/components/onboarding/FeatureCard";
import { Button } from "@/components/ui/Button";

const FEATURES = [
  { icon: Sparkles, title: "AI Assistant", description: "Ask Orbit anything, anytime.", depth: 18 },
  { icon: CloudSun, title: "SkyCast Weather", description: "Live forecasts, beautifully presented.", depth: 28 },
  { icon: Briefcase, title: "Workspace OS", description: "Your projects, focused and organized.", depth: 12 },
];

interface MeetOrbitScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export function MeetOrbitScreen({ onContinue, onBack }: MeetOrbitScreenProps) {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    function handleMove(e: PointerEvent) {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mx, my, reduceMotion]);

  return (
    <div className="flex flex-col items-center gap-12 px-4 text-center">
      <div>
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Meet Orbit</h1>
        <p className="mt-2 text-sm text-mist-400">Three ways Orbit stays ahead of your day.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} mx={mx} my={my} />
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
