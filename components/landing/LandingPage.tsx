"use client";

import { useRouter } from "next/navigation";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { Hero } from "@/components/landing/Hero";
import { OrbitAwakens } from "@/components/landing/OrbitAwakens";
import { DashboardReveal } from "@/components/landing/DashboardReveal";
import { SkyCastShowcase } from "@/components/landing/SkyCastShowcase";
import { AIShowcase } from "@/components/landing/AIShowcase";
import { CommandShowcase } from "@/components/landing/CommandShowcase";
import { WorkspaceShowcase } from "@/components/landing/WorkspaceShowcase";
import { PersonalizationShowcase } from "@/components/landing/PersonalizationShowcase";
import { PerformanceShowcase } from "@/components/landing/PerformanceShowcase";
import { LaunchPortal } from "@/components/landing/LaunchPortal";

/**
 * The marketing site at `/`. Every section lives entirely on this one
 * page — no cross-route `layoutId` or Link-wrapped animated trees, both of
 * which broke Suspense-safe navigation the last time they were tried (see
 * PageTransition's history). "Enter Orbit" routes into the onboarding
 * flow, which is still the product's actual first-run experience.
 */
export function LandingPage() {
  const router = useRouter();

  function enterOrbit() {
    router.push("/onboarding");
  }

  return (
    <LenisProvider>
      <ScrollProgress />
      <Hero onEnter={enterOrbit} />
      <OrbitAwakens />
      <DashboardReveal />
      <SkyCastShowcase />
      <AIShowcase />
      <CommandShowcase />
      <WorkspaceShowcase />
      <PersonalizationShowcase />
      <PerformanceShowcase />
      <LaunchPortal onEnter={enterOrbit} />
    </LenisProvider>
  );
}
