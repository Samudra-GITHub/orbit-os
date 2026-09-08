import type { ReactNode } from "react";
import { AIWorkspace } from "@/components/ai/AIWorkspace";

export default function AIRouteLayout({ children }: { children: ReactNode }) {
  return <AIWorkspace>{children}</AIWorkspace>;
}
