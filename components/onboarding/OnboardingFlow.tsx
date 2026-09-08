"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
import { AwakeningScreen } from "@/components/onboarding/AwakeningScreen";
import { MeetOrbitScreen } from "@/components/onboarding/MeetOrbitScreen";
import { PersonalizationScreen } from "@/components/onboarding/PersonalizationScreen";
import { IntelligencePreviewScreen } from "@/components/onboarding/IntelligencePreviewScreen";
import { ModulePreviewScreen } from "@/components/onboarding/ModulePreviewScreen";
import { LaunchSequenceScreen } from "@/components/onboarding/LaunchSequenceScreen";
import { DEFAULT_ONBOARDING_PROFILE, ONBOARDING_TOTAL_STEPS, type OnboardingProfile } from "@/lib/constants/onboarding";

/**
 * Single-route, six-step cinematic onboarding. Steps live as in-memory
 * state (no URL segments) so the cosmic background and particle layer stay
 * mounted continuously across the whole sequence instead of hard-reloading.
 */
export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<OnboardingProfile>(DEFAULT_ONBOARDING_PROFILE);
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  function next() {
    setStep((s) => Math.min(ONBOARDING_TOTAL_STEPS, s + 1));
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
  }
  function finish() {
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden py-10">
      <ProgressIndicator total={ONBOARDING_TOTAL_STEPS} current={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -16, scale: 1.01 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-1 items-center justify-center"
        >
          {step === 1 && <AwakeningScreen onContinue={next} />}
          {step === 2 && <MeetOrbitScreen onContinue={next} onBack={back} />}
          {step === 3 && (
            <PersonalizationScreen profile={profile} onChange={setProfile} onContinue={next} onBack={back} />
          )}
          {step === 4 && <IntelligencePreviewScreen profile={profile} onContinue={next} onBack={back} />}
          {step === 5 && <ModulePreviewScreen onContinue={next} onBack={back} />}
          {step === 6 && <LaunchSequenceScreen profile={profile} onEnter={finish} onBack={back} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
