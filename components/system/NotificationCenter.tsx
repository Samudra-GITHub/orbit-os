"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { NotificationCard } from "@/components/system/NotificationCard";
import { useNotifications } from "@/components/providers/NotificationProvider";

interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
}

/** The glass side panel. Reads/writes notification state via context —
 *  NotificationBell (the trigger) and this panel never need to pass state
 *  through props. */
export function NotificationCenter({ open, onClose }: NotificationCenterProps) {
  const { notifications, unreadCount, markAllRead, dismiss } = useNotifications();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40"
          />
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-4 top-20 z-50 w-[calc(100vw-2rem)] max-w-sm sm:right-6"
          >
            <GlassSurface
              intensity="overlay"
              interactive={false}
              className="flex max-h-[75vh] flex-col overflow-hidden rounded-4xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="font-medium text-white">Notifications</p>
                  <p className="text-xs text-mist-400">
                    {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      aria-label="Mark all as read"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-mist-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    aria-label="Close notifications"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-mist-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 overflow-y-auto p-2">
                {notifications.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-mist-500">No notifications right now.</p>
                ) : (
                  <AnimatePresence initial={false}>
                    {notifications.map((entry) => (
                      <NotificationCard key={entry.id} entry={entry} onDismiss={dismiss} />
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </GlassSurface>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
