"use client";

import { useEffect, useState } from "react";
import { ITINERARY, type ItineraryDay } from "@/lib/constants/travel";

const STORAGE_KEY = "orbit-travel-itinerary";

/** The itinerary's completion state — seeded from `ITINERARY`, toggled
 *  per activity, persisted locally. Same hydrate-then-persist pattern as
 *  `usePackingList`/`useFocusSessions`. */
export function useItinerary() {
  const [days, setDays] = useState<ItineraryDay[]>(ITINERARY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setDays(JSON.parse(raw));
    } catch {
      // Corrupt or inaccessible storage — fall back to seed data silently.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
    } catch {
      // Storage full or unavailable — state still applies for this session.
    }
  }, [days, hydrated]);

  function toggleActivity(dayId: string, activityId: string) {
    setDays((prev) =>
      prev.map((d) =>
        d.id !== dayId
          ? d
          : { ...d, activities: d.activities.map((a) => (a.id === activityId ? { ...a, completed: !a.completed } : a)) }
      )
    );
  }

  return { days, toggleActivity };
}
