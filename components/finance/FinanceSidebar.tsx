"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, LineChart, Repeat, PiggyBank, Target } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { springs } from "@/lib/motion/springs";
import { WALLET } from "@/lib/constants/finance";
import { formatINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/finance", label: "Overview", icon: LayoutGrid },
  { href: "/finance/analytics", label: "Analytics", icon: LineChart },
  { href: "/finance/subscriptions", label: "Subscriptions", icon: Repeat },
  { href: "/finance/budget", label: "Budget", icon: PiggyBank },
  { href: "/finance/goals", label: "Goals", icon: Target },
];

/** Finance's sub-navigation — a sticky vertical rail on desktop, a
 *  horizontal scrollable pill row on mobile, mirroring the pattern
 *  `Sidebar` already uses for the primary app nav. */
export function FinanceSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop — sticky vertical rail */}
      <GlassSurface
        intensity="subtle"
        interactive={false}
        className="sticky top-24 hidden w-60 shrink-0 flex-col gap-1 rounded-4xl p-3 lg:flex"
      >
        <nav className="flex flex-col gap-0.5 pb-2">
          {NAV.map((item) => {
            const isActive = item.href === "/finance" ? pathname === item.href : pathname?.startsWith(item.href);
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
                    layoutId="finance-nav-active"
                    transition={springs.navActive}
                    className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-white/10"
                  />
                )}
                <item.icon className="relative h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-1 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3.5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">Wallet balance</p>
          <p className="mt-1.5 font-mono text-lg font-semibold text-white">{formatINR(WALLET.balance)}</p>
          <p className="mt-0.5 text-[11px] text-mist-400">Updated today</p>
        </div>
      </GlassSurface>

      {/* Mobile — horizontal scrollable pill nav */}
      <nav className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {NAV.map((item) => {
          const isActive = item.href === "/finance" ? pathname === item.href : pathname?.startsWith(item.href);
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
