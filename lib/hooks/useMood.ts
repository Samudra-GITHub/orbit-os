"use client";

import { useEffect, useState } from "react";
import { MOOD_HISTORY, type Mood, type MoodEntry } from "@/lib/constants/health";

const STORAGE_KEY = "orbit-health-mood";
const TODAY = MOOD_HISTORY.at(-1)!.date;

/** Today's mood entry, hydrated from localStorage then persisted on change —
 *  same hydrate-then-persist pattern as `useHydration`/`usePackingList`. */
export function useMood() {
  const [todayEntry, setTodayEntry] = useState<MoodEntry>(MOOD_HISTORY.at(-1)!);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw !== null) setTodayEntry(JSON.parse(raw));
    } catch {
      // ignore malformed/unavailable storage — fall back to seeded value
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todayEntry));
    } catch {
      // storage unavailable — state still works in-memory
    }
  }, [todayEntry, hydrated]);

  function setMood(mood: Mood, note?: string) {
    setTodayEntry({ date: TODAY, mood, note });
  }

  const history: MoodEntry[] = [...MOOD_HISTORY.slice(0, -1), todayEntry];

  return { todayEntry, setMood, history };
}
