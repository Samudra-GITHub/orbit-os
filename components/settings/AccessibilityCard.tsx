import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

interface AccessibilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}

/** A consistent row for one accessibility control — icon, title,
 *  description, and a control slot (a `Switch` or slider) on the right.
 *  `GlassSurface`'s own className only ever affects its outer surface (its
 *  children render inside one non-flex wrapper it owns), so the real
 *  row layout lives on this inner div, not on GlassSurface's className. */
export function AccessibilityCard({ icon: Icon, title, description, children }: AccessibilityCardProps) {
  return (
    <GlassSurface intensity="subtle" interactive={false} className="rounded-3xl p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
            <Icon className="h-4 w-4 text-violet-300" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="mt-0.5 max-w-sm text-xs text-mist-400">{description}</p>
          </div>
        </div>
        <div className="shrink-0 sm:pl-4">{children}</div>
      </div>
    </GlassSurface>
  );
}
