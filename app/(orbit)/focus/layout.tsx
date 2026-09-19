"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { pageFade } from "@/lib/motion/variants";
import { LayoutGrid, History, BarChart3, Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/focus", label: "Overview", icon: LayoutGrid },
  { href: "/focus/sessions", label: "Sessions", icon: History },
  { href: "/focus/stats", label: "Stats", icon: BarChart3 },
  { href: "/focus/settings", label: "Settings", icon: SettingsIcon },
];

/** A lightweight top pill nav for Focus's four pages — simpler than
 *  Finance/Settings' vertical rail since Focus is centered on one primary
 *  action (start a session) rather than deep sub-navigation. */
export default function FocusLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5">
      <nav className="flex gap-2 overflow-x-auto pb-1">
        {NAV.map((item) => {
          const isActive = item.href === "/focus" ? pathname === item.href : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "border-violet-400/40 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-mist-400 hover:text-mist-200"
              )}
            >
              <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <motion.div
        key={pathname}
        {...pageFade}
      >
        {children}
      </motion.div>
    </div>
  );
}
