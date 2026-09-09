"use client";

import { useEffect, useState } from "react";
import type { AmbientSceneId, PresetId } from "@/lib/constants/focus";

export interface FocusSettings {
  defaultPresetId: PresetId;
  ambientScene: AmbientSceneId;
  soundEnabled: boolean;
  notifyOnComplete: boolean;
}

export const DEFAULT_FOCUS_SETTINGS: FocusSettings = {
  defaultPresetId: "pomodoro",
  ambientScene: "cosmos",
  soundEnabled: true,
  notifyOnComplete: true,
};

const STORAGE_KEY = "orbit-focus-settings";

/** Focus module preferences — default preset, ambient scene, and
 *  sound/notification toggles — persisted locally and shared between the
 *  Overview page (reads them to seed a session) and the Settings page
 *  (writes them). */
export function useFocusSettings() {
  const [settings, setSettings] = useState<FocusSettings>(DEFAULT_FOCUS_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULT_FOCUS_SETTINGS, ...JSON.parse(raw) });
    } catch {
      // Corrupt or inaccessible storage — fall back to defaults silently.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage full or unavailable — settings still apply for this session.
    }
  }, [settings, hydrated]);

  function updateSettings(patch: Partial<FocusSettings>) {
    setSettings((s) => ({ ...s, ...patch }));
  }

  return { settings, updateSettings, hydrated };
}
