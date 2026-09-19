"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, Moon, Droplets, Activity, HeartPulse, Smile } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { springs } from "@/lib/motion/springs";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/health", label: "Overview", icon: LayoutGrid },
  { href: "/health/activity", label: "Activity", icon: Activity },
  { href: "/health/sleep", label: "Sleep", icon: Moon },
  { href: "/health/hydration", label: "Hydration", icon: Droplets },
  { href: "/health/recovery", label: "Recovery", icon: HeartPulse },
  { href: "/health/mood", label: "Mood", icon: Smile },
];

/** Health's sub-navigation — sticky vertical rail on desktop, horizontal
 *  pill row on mobile. Mirrors `TravelSidebarTabs`/`FinanceSidebar`. */
export function HealthSidebarTabs() {
  const pathname = usePathname();

  return (
    <>
      <GlassSurface
        intensity="subtle"
        interactive={false}
        className="sticky top-24 hidden w-60 shrink-0 flex-col gap-0.5 rounded-4xl p-3 lg:flex"
      >
        {NAV.map((item) => {
          const isActive = item.href === "/health" ? pathname === item.href : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors",
                isActive ? "text-white" : "text-mist-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="health-nav-active"
                  transition={springs.navActive}
                  className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-white/10"
                />
              )}
              <item.icon className="relative h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </GlassSurface>

      <nav className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {NAV.map((item) => {
          const isActive = item.href === "/health" ? pathname === item.href : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "border-violet-400/40 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-mist-400"
              )}
            >
              <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
