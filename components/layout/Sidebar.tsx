"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  LayoutGrid,
  Sparkles,
  Wallet,
  HeartPulse,
  Plane,
  Briefcase,
  CloudSun,
  Settings,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion/springs";
import { OrbitLogo } from "@/components/branding/OrbitLogo";
import { SUBSCRIPTIONS } from "@/lib/constants/finance";
import { daysUntil } from "@/lib/finance/computeStats";
import { TRIPS } from "@/lib/constants/travel";
import { daysUntilTrip } from "@/lib/travel/computeStats";
import { DAILY_SUMMARY, HYDRATION_GOAL_L } from "@/lib/constants/health";

interface SidebarItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: SidebarItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/ai", label: "Assistant", icon: Sparkles },
  { href: "/focus", label: "Focus", icon: Timer },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/health", label: "Health", icon: HeartPulse },
  { href: "/weather", label: "Weather", icon: CloudSun },
  { href: "/travel", label: "Travel", icon: Plane },
  { href: "/workspace", label: "Workspace", icon: Briefcase },
];

// A subscription renewing soon, or a trip departing soon, lights up a
// quiet badge dot on that module's nav icon — the same "something needs
// your attention" pattern the notification bell uses, just scoped per
// module. Each uses its own fixed reference date matching that module's
// seeded mock data (not the real clock).
const FINANCE_NOW = new Date("2026-09-09T12:00:00");
const HAS_UPCOMING_RENEWAL = SUBSCRIPTIONS.some((s) => {
  const days = daysUntil(s.renewsOn, FINANCE_NOW);
  return s.status === "active" && days >= 0 && days <= 5;
});

const TRAVEL_NOW = new Date("2026-09-09T12:00:00");
const HAS_UPCOMING_DEPARTURE = TRIPS.some((t) => {
  const days = daysUntilTrip(t, TRAVEL_NOW);
  return days >= 0 && days <= 14;
});

// The seeded "today" hasn't hit its hydration goal yet — same still-mock-data
// badge pattern as Finance/Travel, just sourced from `DAILY_SUMMARY` instead
// of a days-until calculation.
const HAS_INCOMPLETE_HYDRATION = DAILY_SUMMARY.waterIntakeL < HYDRATION_GOAL_L;

const NAV_BADGES: Record<string, { active: boolean; suffix: string }> = {
  "/finance": { active: HAS_UPCOMING_RENEWAL, suffix: " · renews soon" },
  "/travel": { active: HAS_UPCOMING_DEPARTURE, suffix: " · trip soon" },
  "/health": { active: HAS_INCOMPLETE_HYDRATION, suffix: " · hydration goal pending" },
};

interface SidebarProps {
  items?: SidebarItem[];
}

function NavIcon({ item, isActive, layoutId }: { item: SidebarItem; isActive: boolean; layoutId: string }) {
  const badge = NAV_BADGES[item.href];
  const showBadge = badge?.active ?? false;

  return (
    <Link
      href={item.href}
      aria-label={showBadge ? `${item.label}${badge!.suffix}` : item.label}
      aria-current={isActive ? "page" : undefined}
      className="group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-white/5"
    >
      {isActive && (
        <motion.span
          layoutId={layoutId}
          transition={springs.navActive}
          className="absolute inset-0 rounded-xl bg-white/10 shadow-glow-accent ring-1 ring-white/10"
        />
      )}
      <motion.span whileHover={{ y: -2, scale: 1.08 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
        <item.icon
          className={cn(
            "relative h-[19px] w-[19px] transition-colors",
            isActive ? "text-white" : "text-mist-500 group-hover:text-mist-300"
          )}
          strokeWidth={1.75}
        />
      </motion.span>
      {showBadge && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-400 shadow-glow-accent ring-2 ring-ink-900" />
      )}
      <span className="pointer-events-none absolute left-full ml-3 hidden translate-x-[-4px] whitespace-nowrap rounded-lg bg-ink-800 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-glass ring-1 ring-white/10 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        {item.label}
        {showBadge && badge!.suffix}
      </span>
    </Link>
  );
}

export function Sidebar({ items = NAV_ITEMS }: SidebarProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Desktop — floating vertical rail */}
      <motion.aside
        initial={reduceMotion ? false : { x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="fixed inset-y-4 left-4 z-40 hidden w-[72px] flex-col items-center gap-2 rounded-[28px] border border-white/10 bg-white/[0.06] py-5 shadow-glass backdrop-blur-xl backdrop-saturate-150 md:flex"
      >
        <Link
          href="/dashboard"
          aria-label="Orbit OS home"
          className="group relative mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-white/5"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-400/30 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
          />
          <OrbitLogo size={28} animated className="relative" />
          <span className="pointer-events-none absolute left-full ml-3 hidden translate-x-[-4px] whitespace-nowrap rounded-lg bg-ink-800 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-glass ring-1 ring-white/10 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block">
            Orbit OS
          </span>
        </Link>

        <nav className="flex flex-1 flex-col items-center gap-1.5">
          {items.map((item) => (
            <NavIcon
              key={item.href}
              item={item}
              isActive={pathname?.startsWith(item.href) ?? false}
              layoutId="sidebar-active-desktop"
            />
          ))}
        </nav>

        <Link
          href="/settings"
          aria-label="Settings"
          aria-current={pathname?.startsWith("/settings") ? "page" : undefined}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-white/5",
            pathname?.startsWith("/settings") ? "text-white" : "text-mist-500 hover:text-mist-300"
          )}
        >
          <Settings className="h-[19px] w-[19px]" strokeWidth={1.75} />
        </Link>

        <div className="relative mt-1">
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
            transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-400/40 text-xs font-semibold text-white ring-1 ring-white/15"
          >
            OS
          </motion.div>
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-glow-cyan ring-2 ring-ink-900" />
        </div>
      </motion.aside>

      {/* Mobile — bottom dock */}
      <motion.nav
        initial={reduceMotion ? false : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.08] px-2 py-2 shadow-glass backdrop-blur-xl backdrop-saturate-150 [padding-bottom:max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
      >
        {items.map((item) => {
          const isActive = pathname?.startsWith(item.href) ?? false;
          const badge = NAV_BADGES[item.href];
          const showBadge = badge?.active ?? false;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={showBadge ? `${item.label}${badge!.suffix}` : item.label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl"
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-mobile"
                  transition={springs.navActive}
                  className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-white/10"
                />
              )}
              <item.icon
                className={cn("relative h-[18px] w-[18px]", isActive ? "text-white" : "text-mist-500")}
                strokeWidth={1.75}
              />
              {showBadge && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 ring-2 ring-ink-900" />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </>
  );
}
