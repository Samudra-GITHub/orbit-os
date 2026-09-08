import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/layout/PageTransition";

/**
 * The single shared shell for every "app" screen (dashboard, weather,
 * workspace, ai) — AppShell (sidebar/topbar/command center) is instantiated
 * exactly once here and never remounts as users navigate between these
 * sections, which is what lets PageTransition cross-fade content and lets
 * framer-motion's layoutId shared elements (e.g. the weather widget
 * morphing into the weather page) bridge across the navigation.
 */
export default function OrbitLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <PageTransition>{children}</PageTransition>
    </AppShell>
  );
}
