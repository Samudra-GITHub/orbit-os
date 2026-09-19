"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CountdownCard } from "@/components/travel/CountdownCard";
import type { Trip } from "@/lib/constants/travel";

interface TravelHeroProps {
  trip: Trip;
}

function formatDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startStr = start.toLocaleDateString("en-IN", { month: "long", day: "numeric" });
  const endStr = end.toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" });
  return `${startStr} – ${endStr}`;
}

/** The Dashboard's hero — the featured (soonest upcoming) trip's cover
 *  mesh, destination, dates, and countdown, with a CTA into the
 *  itinerary. */
export function TravelHero({ trip }: TravelHeroProps) {
  const reduceMotion = useReducedMotion();
  const [h1, h2, h3] = trip.coverHues;

  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="relative overflow-hidden rounded-4xl border border-white/10 p-6 sm:p-8"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 15% 10%, color-mix(in oklab, ${h1} 45%, transparent), transparent),
            radial-gradient(ellipse 65% 60% at 85% 30%, color-mix(in oklab, ${h2} 35%, transparent), transparent),
            radial-gradient(ellipse 70% 65% at 50% 100%, color-mix(in oklab, ${h3} 32%, transparent), transparent),
            var(--color-surface)
          `,
        }}
      >
        <div aria-hidden className="bg-cosmic-noise pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              <MapPin className="h-3.5 w-3.5" /> Next trip
            </p>
            <h1 className="text-gradient-accent mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {trip.destination}, {trip.country}
            </h1>
            <p className="mt-2 text-sm text-white/70">{formatDateRange(trip.startDate, trip.endDate)}</p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <CountdownCard trip={trip} compact />
            <Link href="/travel/itinerary">
              <Button variant="primary" size="md">
                View itinerary <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
