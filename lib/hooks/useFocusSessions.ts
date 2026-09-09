"use client";

import { useEffect, useState } from "react";
import { SEED_SESSIONS, type FocusSession } from "@/lib/constants/focus";

const STORAGE_KEY = "orbit-focus-sessions";

/** Focus session history — seeded with a week of mock sessions so
 *  Sessions/Stats aren't empty on first load, then genuinely appended to
 *  whenever a real session completes in the full-screen overlay. Persists
 *  locally so history survives across the module's separate routes. */
export function useFocusSessions() {
  const [sessions, setSessions] = useState<FocusSession[]>(SEED_SESSIONS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSessions(JSON.parse(raw));
    } catch {
      // Corrupt or inaccessible storage — fall back to seed data silently.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {
      // Storage full or unavailable — history still applies for this session.
    }
  }, [sessions, hydrated]);

  function addSession(entry: Omit<FocusSession, "id">) {
    const session: FocusSession = { ...entry, id: `session-${Date.now()}` };
    setSessions((prev) => [session, ...prev]);
    return session;
  }

  return { sessions, addSession };
}
