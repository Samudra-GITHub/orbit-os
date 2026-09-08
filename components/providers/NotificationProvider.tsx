"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { NOTIFICATIONS, type NotificationEntry } from "@/lib/constants/notifications";

interface NotificationContextValue {
  notifications: NotificationEntry[];
  unreadCount: number;
  markAllRead: () => void;
  dismiss: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

/** Single source of truth for notification state — the bell badge, the
 *  wiggle animation, and the panel all read from here so they can never
 *  drift out of sync with each other. */
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationEntry[]>(NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function dismiss(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within a NotificationProvider");
  return ctx;
}
