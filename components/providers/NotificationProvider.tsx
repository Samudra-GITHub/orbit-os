"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { NOTIFICATIONS, type NotificationCategory, type NotificationEntry } from "@/lib/constants/notifications";

const MUTED_STORAGE_KEY = "orbit-notification-muted";

interface NotificationContextValue {
  notifications: NotificationEntry[];
  unreadCount: number;
  mutedCategories: NotificationCategory[];
  isMuted: (category: NotificationCategory) => boolean;
  toggleCategory: (category: NotificationCategory) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

/** Single source of truth for notification state — the bell badge, the
 *  wiggle animation, and the panel all read from here so they can never
 *  drift out of sync with each other. Settings > Notifications' per-module
 *  toggles mute categories here, and every consumer's `notifications`/
 *  `unreadCount` filters them out automatically. */
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [allNotifications, setAllNotifications] = useState<NotificationEntry[]>(NOTIFICATIONS);
  const [mutedCategories, setMutedCategories] = useState<NotificationCategory[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(MUTED_STORAGE_KEY);
      if (raw) setMutedCategories(JSON.parse(raw));
    } catch {
      // Corrupt or inaccessible storage — every category stays enabled.
    }
  }, []);

  function toggleCategory(category: NotificationCategory) {
    setMutedCategories((prev) => {
      const next = prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category];
      try {
        window.localStorage.setItem(MUTED_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage full or unavailable — mute still applies for this session.
      }
      return next;
    });
  }

  const notifications = useMemo(
    () => allNotifications.filter((n) => !mutedCategories.includes(n.category)),
    [allNotifications, mutedCategories]
  );
  const unreadCount = notifications.filter((n) => n.unread).length;

  function markAllRead() {
    setAllNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function dismiss(id: string) {
    setAllNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  function isMuted(category: NotificationCategory) {
    return mutedCategories.includes(category);
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, mutedCategories, isMuted, toggleCategory, markAllRead, dismiss }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within a NotificationProvider");
  return ctx;
}
