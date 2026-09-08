import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

/** A consistent zero-data state — reused across Workspace, Weather,
 *  Projects, Notes, Finance, Health, Search, and AI Conversation so an
 *  empty screen always feels intentional, never broken. */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex h-full flex-col items-center justify-center gap-4 px-6 text-center", className)}>
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/25 to-cyan-400/25 blur-xl"
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white/[0.08] bg-white/[0.04]">
          <Icon className="h-7 w-7 text-mist-300" strokeWidth={1.5} />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-1 max-w-xs text-xs text-mist-400">{description}</p>
      </div>
      {action}
    </div>
  );
}
