"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { pageFade } from "@/lib/motion/variants";
import { TravelSidebarTabs } from "@/components/travel/TravelSidebarTabs";

/**
 * Two-panel shell for every Travel screen — a sub-nav rail (desktop) /
 * pill row (mobile) alongside routed content, which cross-fades on path
 * change. Mirrors `FinanceLayout`.
 */
export default function TravelLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <TravelSidebarTabs />
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
