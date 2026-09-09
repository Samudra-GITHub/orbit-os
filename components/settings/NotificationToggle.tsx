"use client";

import { Switch } from "@/components/ui/Switch";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { CATEGORY_META, NOTIFICATIONS, type NotificationCategory } from "@/lib/constants/notifications";

interface NotificationToggleProps {
  category: NotificationCategory;
}

/** One module's notification row: toggle + a live preview of what that
 *  category's notification looks like, sourced from the same
 *  `NotificationProvider` that drives the real bell/panel — muting a
 *  category here genuinely removes it from both. */
export function NotificationToggle({ category }: NotificationToggleProps) {
  const { isMuted, toggleCategory } = useNotifications();
  const meta = CATEGORY_META[category];
  const sample = NOTIFICATIONS.find((n) => n.category === category);
  const muted = isMuted(category);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${meta.chip}`}>
          <meta.icon className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{meta.label}</p>
          {sample && (
            <p className="mt-0.5 max-w-sm truncate text-xs text-mist-400">
              {muted ? "Muted" : sample.message}
            </p>
          )}
        </div>
      </div>

      <Switch checked={!muted} onCheckedChange={() => toggleCategory(category)} label={`${meta.label} notifications`} />
    </div>
  );
}
