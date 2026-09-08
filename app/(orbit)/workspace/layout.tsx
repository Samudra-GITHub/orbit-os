import type { ReactNode } from "react";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";

export default function WorkspaceRouteLayout({ children }: { children: ReactNode }) {
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
}
