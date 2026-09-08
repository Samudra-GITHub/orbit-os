"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";

export function Topbar() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="sticky top-0 z-30 border-b border-white/5 bg-ink-900/70 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <p className="font-display text-sm font-medium text-mist-300">Orbit OS</p>

        <div className="flex items-center gap-2">
          <Button variant="icon" size="md" magnetic={false} aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="icon" size="md" magnetic={false} aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar alt="Orbit user" fallback="OS" size="sm" status="online" />
        </div>
      </div>
    </motion.header>
  );
}
