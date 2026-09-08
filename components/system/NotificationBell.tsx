"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NotificationCenter } from "@/components/system/NotificationCenter";
import { useNotifications } from "@/components/providers/NotificationProvider";

/** Self-contained: the bell button and its panel travel together, the way
 *  CommandCenter bundles its own trigger + overlay. Topbar just mounts
 *  this once with no prop plumbing. */
export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Button
        variant="icon"
        size="md"
        magnetic={false}
        aria-label="Notifications"
        className="relative"
        onClick={() => setOpen((o) => !o)}
      >
        <motion.span
          animate={!reduceMotion && unreadCount > 0 ? { rotate: [0, -12, 10, -8, 0] } : undefined}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        >
          <Bell className="h-4 w-4" />
        </motion.span>
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan-400 shadow-glow-cyan" />
        )}
      </Button>

      <NotificationCenter open={open} onClose={() => setOpen(false)} />
    </>
  );
}
