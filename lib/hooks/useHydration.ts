"use client";

import { useEffect, useState } from "react";
import { DAILY_SUMMARY, HYDRATION_GOAL_L, HYDRATION_HISTORY, type HydrationDay } from "@/lib/constants/health";

const STORAGE_KEY = "orbit-health-hydration";
const GLASS_L = 0.25;

function seedTodayLiters() {
  return Math.round((DAILY_SUMMARY.waterIntakeL / GLASS_L)) * GLASS_L;
}

/** Today's water intake, hydrated from localStorage on mount then persisted
 *  on every change — same pattern as `usePackingList`/`useItinerary`. The
 *  30-day history stays static mock data; only "today" is interactive. */
export function useHydration() {
  const [todayLiters, setTodayLiters] = useState(seedTodayLiters);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw !== null) setTodayLiters(JSON.parse(raw));
    } catch {
      // ignore malformed/unavailable storage — fall back to seeded value
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todayLiters));
    } catch {
      // storage unavailable (private mode, quota) — state still works in-memory
    }
  }, [todayLiters, hydrated]);

  function addGlass() {
    setTodayLiters((v) => Math.round((v + GLASS_L) * 100) / 100);
  }

  function removeGlass() {
    setTodayLiters((v) => Math.max(0, Math.round((v - GLASS_L) * 100) / 100));
  }

  const history: HydrationDay[] = [...HYDRATION_HISTORY.slice(0, -1), { date: HYDRATION_HISTORY.at(-1)!.date, liters: todayLiters }];

  return { todayLiters, goalL: HYDRATION_GOAL_L, addGlass, removeGlass, history };
}
