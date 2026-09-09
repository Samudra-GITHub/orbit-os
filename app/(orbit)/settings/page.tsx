"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, Bell, Accessibility, User, Shield, ArrowUpRight, Eye, Contrast, MousePointerClick } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Switch } from "@/components/ui/Switch";
import { useTheme, THEMES, ACCENTS, WALLPAPERS } from "@/lib/theme";

const SHORTCUTS = [
  { href: "/settings/appearance", label: "Appearance", description: "Theme, accent, wallpaper, glass intensity", icon: Palette },
  { href: "/settings/notifications", label: "Notifications", description: "Module-specific alerts and previews", icon: Bell },
  { href: "/settings/accessibility", label: "Accessibility", description: "Motion, contrast, font size, spotlight", icon: Accessibility },
  { href: "/settings/account", label: "Account", description: "Your profile and plan", icon: User },
  { href: "/settings/privacy", label: "Privacy", description: "How your data is handled", icon: Shield },
];

export default function SettingsPage() {
  const {
    currentTheme,
    accentColor,
    wallpaper,
    reduceMotion,
    highContrast,
    cursorSpotlight,
    setReduceMotion,
    setHighContrast,
    setCursorSpotlight,
  } = useTheme();

  const themeLabel = THEMES.find((t) => t.id === currentTheme)?.label ?? currentTheme;
  const accentLabel = ACCENTS.find((a) => a.id === accentColor)?.label ?? accentColor;
  const wallpaperLabel = WALLPAPERS.find((w) => w.id === wallpaper)?.label ?? wallpaper;

  return (
    <div className="flex flex-col gap-5">
      <GlassSurface intensity="default" interactive={false} className="rounded-4xl p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Settings</p>
        <h1 className="text-gradient-accent mt-2 font-display text-3xl font-semibold tracking-tight">
          Make Orbit yours
        </h1>
        <p className="mt-2 max-w-xl text-sm text-mist-300">
          Currently running the <span className="text-white">{themeLabel}</span> theme with the{" "}
          <span className="text-white">{accentLabel}</span> accent on the{" "}
          <span className="text-white">{wallpaperLabel}</span> wallpaper.
        </p>
      </GlassSurface>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHORTCUTS.map((s, i) => (
          <motion.div
            key={s.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={s.href}>
              <GlassSurface intensity="subtle" className="h-full rounded-3xl p-5">
                <div className="flex h-full flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/25">
                      <s.icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-mist-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{s.label}</p>
                    <p className="mt-0.5 text-xs text-mist-400">{s.description}</p>
                  </div>
                </div>
              </GlassSurface>
            </Link>
          </motion.div>
        ))}
      </div>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-1">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Quick settings</p>

          <div className="flex items-center justify-between border-b border-white/[0.06] py-3">
            <span className="flex items-center gap-2.5 text-sm text-mist-200">
              <Eye className="h-4 w-4 text-mist-400" strokeWidth={1.75} /> Reduced motion
            </span>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} label="Reduced motion" />
          </div>
          <div className="flex items-center justify-between border-b border-white/[0.06] py-3">
            <span className="flex items-center gap-2.5 text-sm text-mist-200">
              <Contrast className="h-4 w-4 text-mist-400" strokeWidth={1.75} /> High contrast
            </span>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} label="High contrast" />
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="flex items-center gap-2.5 text-sm text-mist-200">
              <MousePointerClick className="h-4 w-4 text-mist-400" strokeWidth={1.75} /> Cursor spotlight
            </span>
            <Switch checked={cursorSpotlight} onCheckedChange={setCursorSpotlight} label="Cursor spotlight" />
          </div>
        </div>
      </GlassSurface>
    </div>
  );
}
