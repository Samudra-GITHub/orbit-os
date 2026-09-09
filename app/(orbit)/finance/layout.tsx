"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FinanceSidebar } from "@/components/finance/FinanceSidebar";

/**
 * Two-panel shell for every Finance screen: a sub-nav rail (desktop) /
 * pill row (mobile) alongside the routed page content, which cross-fades
 * on path change. Content scrolls with the page (via AppShell's own
 * scroll container), not a nested pane — Finance is a set of full pages,
 * not an app-in-app editor like Workspace.
 */
export default function FinanceLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <FinanceSidebar />
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
