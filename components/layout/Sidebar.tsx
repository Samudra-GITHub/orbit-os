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
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OrbitLogo } from "@/components/branding/OrbitLogo";

interface SidebarItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: SidebarItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/ai", label: "Assistant", icon: Sparkles },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/health", label: "Health", icon: HeartPulse },
  { href: "/weather", label: "Weather", icon: CloudSun },
  { href: "/travel", label: "Travel", icon: Plane },
  { href: "/workspace", label: "Workspace", icon: Briefcase },
];

interface SidebarProps {
  items?: SidebarItem[];
}

function NavIcon({ item, isActive, layoutId }: { item: SidebarItem; isActive: boolean; layoutId: string }) {
  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      className="group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-white/5"
    >
      {isActive && (
        <motion.span
          layoutId={layoutId}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
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
      <span className="pointer-events-none absolute left-full ml-3 hidden translate-x-[-4px] whitespace-nowrap rounded-lg bg-ink-800 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-glass ring-1 ring-white/10 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        {item.label}
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
          className="flex h-11 w-11 items-center justify-center rounded-xl text-mist-500 transition-colors hover:bg-white/5 hover:text-mist-300"
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
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl"
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-mobile"
                  transition={{ type: "spring", stiffness: 340, damping: 28 }}
                  className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-white/10"
                />
              )}
              <item.icon
                className={cn("relative h-[18px] w-[18px]", isActive ? "text-white" : "text-mist-500")}
                strokeWidth={1.75}
              />
            </Link>
          );
        })}
      </motion.nav>
    </>
  );
}
