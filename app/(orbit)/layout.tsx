import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageTransition } from "@/components/effects/PageTransition";

/**
 * The single shared shell for every "app" screen (dashboard, weather,
 * workspace, ai) — AppShell (sidebar/topbar/command center) is instantiated
 * exactly once here and never remounts as users navigate between these
 * sections, which is what lets PageTransition cross-fade content in.
 */
export default function OrbitLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <PageTransition>{children}</PageTransition>
    </AppShell>
  );
}
