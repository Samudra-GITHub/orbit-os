import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AIWorkspace } from "@/components/ai/AIWorkspace";

export default function AIRouteLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <AIWorkspace>{children}</AIWorkspace>
    </AppShell>
  );
}
