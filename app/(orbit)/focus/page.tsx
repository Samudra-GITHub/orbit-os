"use client";

import { useState } from "react";
import { FocusHero } from "@/components/focus/FocusHero";
import { SessionPresetCard } from "@/components/focus/SessionPresetCard";
import { AmbientScenePicker } from "@/components/focus/AmbientScenePicker";
import { FocusStats } from "@/components/focus/FocusStats";
import { QuoteCard } from "@/components/focus/QuoteCard";
import { FocusModeOverlay } from "@/components/focus/FocusModeOverlay";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { useToast } from "@/components/providers/ToastProvider";
import { useFocusSettings } from "@/lib/hooks/useFocusSettings";
import { useFocusSessions } from "@/lib/hooks/useFocusSessions";
import { computeFocusStats } from "@/lib/focus/computeStats";
import { FOCUS_PRESETS, AMBIENT_SCENES, type PresetId, type AmbientSceneId } from "@/lib/constants/focus";

export default function FocusOverviewPage() {
  const { settings, updateSettings } = useFocusSettings();
  const { sessions, addSession } = useFocusSessions();
  const { toast } = useToast();

  const [presetId, setPresetId] = useState<PresetId>(settings.defaultPresetId);
  const [sceneId, setSceneId] = useState<AmbientSceneId>(settings.ambientScene);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const preset = FOCUS_PRESETS.find((p) => p.id === presetId) ?? FOCUS_PRESETS[0];
  const scene = AMBIENT_SCENES.find((s) => s.id === sceneId) ?? AMBIENT_SCENES[0];
  const stats = computeFocusStats(sessions);

  function handleComplete(actualMinutes: number) {
    addSession({
      presetId: preset.id,
      presetLabel: preset.label,
      date: new Date().toISOString(),
      durationMinutes: actualMinutes,
      completed: true,
    });
    if (settings.notifyOnComplete) {
      toast({ title: "Session complete", description: `${actualMinutes} minutes of ${preset.label.toLowerCase()}.`, variant: "success" });
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <FocusHero stats={stats} onStart={() => setOverlayOpen(true)} />

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Choose a session</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FOCUS_PRESETS.map((p, i) => (
              <SessionPresetCard
                key={p.id}
                preset={p}
                index={i}
                selected={p.id === presetId}
                onSelect={() => {
                  setPresetId(p.id);
                  updateSettings({ defaultPresetId: p.id });
                }}
              />
            ))}
          </div>
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Ambient scene</p>
          <AmbientScenePicker
            scenes={AMBIENT_SCENES}
            selected={sceneId}
            compact
            onSelect={(id) => {
              setSceneId(id);
              updateSettings({ ambientScene: id });
            }}
          />
        </div>
      </GlassSurface>

      <FocusStats stats={stats} compact />

      <QuoteCard />

      <FocusModeOverlay open={overlayOpen} preset={preset} scene={scene} onClose={() => setOverlayOpen(false)} onComplete={handleComplete} />
    </div>
  );
}
