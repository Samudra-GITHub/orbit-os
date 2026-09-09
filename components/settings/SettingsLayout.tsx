"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";

/**
 * Two-panel shell for every Settings screen — a sub-nav rail (desktop) /
 * pill row (mobile) alongside the routed page content, which cross-fades
 * on path change. Mirrors `FinanceLayout`: content scrolls with the page
 * via AppShell's own scroll container, not a nested pane.
 */
export function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <SettingsSidebar />
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="min-w-0 flex-1"
      >
        {children}
      </motion.div>
    </div>
  );
}
