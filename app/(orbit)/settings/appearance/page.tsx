"use client";

import { GlassSurface } from "@/components/ui/GlassSurface";
import { ThemeCard } from "@/components/settings/ThemeCard";
import { AccentPicker } from "@/components/settings/AccentPicker";
import { WallpaperPicker } from "@/components/settings/WallpaperPicker";
import { GlassIntensitySlider } from "@/components/settings/GlassIntensitySlider";
import { PreviewDevice } from "@/components/settings/PreviewDevice";
import { useTheme, THEMES, ACCENTS, WALLPAPERS } from "@/lib/theme";

export default function AppearancePage() {
  const { currentTheme, accentColor, wallpaper, glassIntensity, setTheme, setAccentColor, setWallpaper, setGlassIntensity } =
    useTheme();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Appearance</h1>
        <p className="mt-1 text-sm text-mist-400">Every change here applies instantly, across all of Orbit.</p>
      </div>

      {/* Live preview — a real miniature dashboard, not a static mockup */}
      <GlassSurface intensity="raised" interactive={false} className="rounded-4xl p-6">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
          <PreviewDevice />
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium text-white">Live preview</p>
            <p className="mt-0.5 max-w-xs text-xs text-mist-400">
              This miniature dashboard, the sidebar, and the background behind Orbit all update as you choose below.
            </p>
          </div>
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Theme</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {THEMES.map((preset) => (
              <ThemeCard
                key={preset.id}
                preset={preset}
                selected={preset.id === currentTheme}
                onSelect={() => setTheme(preset.id)}
              />
            ))}
          </div>
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Accent color</p>
          <AccentPicker accents={ACCENTS} selected={accentColor} onSelect={setAccentColor} />
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Wallpaper</p>
          <WallpaperPicker wallpapers={WALLPAPERS} selected={wallpaper} onSelect={setWallpaper} />
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Glass intensity</p>
          <GlassIntensitySlider value={glassIntensity} onChange={setGlassIntensity} />
        </div>
      </GlassSurface>
    </div>
  );
}
