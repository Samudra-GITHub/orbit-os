import type { ReactNode } from "react";
import { FloatingParticles } from "@/components/onboarding/FloatingParticles";

/**
 * No AppShell here — onboarding is a full-bleed cinematic experience with
 * no sidebar/topbar. The cosmic background is already provided globally by
 * the root layout; this only adds the onboarding-specific particle layer.
 */
export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <FloatingParticles />
      {children}
    </div>
  );
}
