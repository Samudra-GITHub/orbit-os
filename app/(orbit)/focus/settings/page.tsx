"use client";

import { Music, BellRing } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Switch } from "@/components/ui/Switch";
import { SessionPresetCard } from "@/components/focus/SessionPresetCard";
import { AmbientScenePicker } from "@/components/focus/AmbientScenePicker";
import { useFocusSettings } from "@/lib/hooks/useFocusSettings";
import { FOCUS_PRESETS, AMBIENT_SCENES } from "@/lib/constants/focus";

export default function FocusSettingsPage() {
  const { settings, updateSettings } = useFocusSettings();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Focus settings</h1>
        <p className="mt-1 text-sm text-mist-400">Defaults for every new focus session.</p>
      </div>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Default preset</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FOCUS_PRESETS.map((p, i) => (
              <SessionPresetCard
                key={p.id}
                preset={p}
                index={i}
                selected={p.id === settings.defaultPresetId}
                onSelect={() => updateSettings({ defaultPresetId: p.id })}
              />
            ))}
          </div>
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Default ambient scene</p>
          <AmbientScenePicker
            scenes={AMBIENT_SCENES}
            selected={settings.ambientScene}
            onSelect={(id) => updateSettings({ ambientScene: id })}
          />
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-3xl p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
              <Music className="h-4 w-4 text-violet-300" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Play ambient music</p>
              <p className="mt-0.5 text-xs text-mist-400">Shows the music widget during focus sessions.</p>
            </div>
          </div>
          <Switch
            checked={settings.soundEnabled}
            onCheckedChange={(v) => updateSettings({ soundEnabled: v })}
            label="Play ambient music"
          />
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-3xl p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15">
              <BellRing className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Notify on session complete</p>
              <p className="mt-0.5 text-xs text-mist-400">Shows a toast when a focus session finishes.</p>
            </div>
          </div>
          <Switch
            checked={settings.notifyOnComplete}
            onCheckedChange={(v) => updateSettings({ notifyOnComplete: v })}
            label="Notify on session complete"
          />
        </div>
      </GlassSurface>
    </div>
  );
}
