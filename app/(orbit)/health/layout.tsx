"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { pageFade } from "@/lib/motion/variants";
import { HealthSidebarTabs } from "@/components/health/HealthSidebarTabs";

/**
 * Two-panel shell for every Health screen — a sub-nav rail (desktop) /
 * pill row (mobile) alongside routed content, which cross-fades on path
 * change. Mirrors `TravelLayout`/`FinanceLayout`.
 */
export default function HealthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <HealthSidebarTabs />
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
