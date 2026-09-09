"use client";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { NotificationToggle } from "@/components/settings/NotificationToggle";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { CATEGORY_META, type NotificationCategory } from "@/lib/constants/notifications";

const CATEGORIES = Object.keys(CATEGORY_META) as NotificationCategory[];

export default function NotificationsPage() {
  const { mutedCategories } = useNotifications();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Notifications</h1>
        <p className="mt-1 text-sm text-mist-400">
          {CATEGORIES.length - mutedCategories.length} of {CATEGORIES.length} modules notifying you — muting one here
          removes it from the bell and panel immediately.
        </p>
      </div>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Module alerts</p>
          <div className="flex flex-col gap-2.5">
            {CATEGORIES.map((category) => (
              <NotificationToggle key={category} category={category} />
            ))}
          </div>
        </div>
      </GlassSurface>
    </div>
  );
}
