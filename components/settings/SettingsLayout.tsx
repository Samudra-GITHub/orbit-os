"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { pageFade } from "@/lib/motion/variants";
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
        {...pageFade}
        className="min-w-0 flex-1"
      >
        {children}
      </motion.div>
    </div>
  );
}
