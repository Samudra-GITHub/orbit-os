import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { CommandCenter } from "@/components/command/CommandCenter";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";

interface AppShellProps {
  children: ReactNode;
}

/**
 * Wraps every screen: floating desktop sidebar (a bottom dock on mobile),
 * sticky translucent topbar, a max-width content container, and the global
 * command palette trigger.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh">
      <CursorSpotlight />
      <Sidebar />
      <div className="flex min-h-dvh flex-col md:pl-[104px]">
        <Topbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 pb-28 sm:px-6 md:pb-8 lg:px-10">
          {children}
        </main>
      </div>
      <CommandCenter />
    </div>
  );
}
