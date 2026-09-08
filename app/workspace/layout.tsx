import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";

export default function WorkspaceRouteLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <WorkspaceLayout>{children}</WorkspaceLayout>
    </AppShell>
  );
}
