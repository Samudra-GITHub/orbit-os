"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Wallet, Backpack, MapPin } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { StatTile } from "@/components/ui/StatTile";
import { TravelHero } from "@/components/travel/TravelHero";
import { WeatherPreview } from "@/components/travel/WeatherPreview";
import { TripCard } from "@/components/travel/TripCard";
import { TravelInsightCard } from "@/components/travel/TravelInsightCard";
import { TRIPS, PLACES } from "@/lib/constants/travel";
import { PACKING_CATEGORIES } from "@/lib/constants/travel";
import { TRIP_EXPENSES } from "@/lib/constants/travel";
import { getFeaturedTrip, computeTripBudgetSummary, computePackingProgress } from "@/lib/travel/computeStats";
import { formatCompactINR } from "@/lib/finance/format";

const NOW = new Date("2026-09-09T12:00:00");

// Lazy-loaded: the gallery is the heaviest, least-above-the-fold section
// on the page, and doesn't need to block the initial paint of the hero,
// stats, and trip carousel above it.
const DestinationGallery = dynamic(
  () => import("@/components/travel/DestinationGallery").then((m) => m.DestinationGallery),
  { loading: () => <div className="h-32 animate-pulse rounded-3xl bg-white/[0.03]" /> }
);

export default function TravelDashboardPage() {
  const featuredTrip = useMemo(() => getFeaturedTrip(TRIPS, NOW), []);
  const budgetSummary = useMemo(() => computeTripBudgetSummary(featuredTrip, TRIP_EXPENSES), [featuredTrip]);
  const packingProgress = useMemo(() => computePackingProgress(PACKING_CATEGORIES), []);
  const otherTrips = TRIPS.filter((t) => t.id !== featuredTrip.id);
  const favoritePlaces = useMemo(() => PLACES.filter((p) => p.favorite).slice(0, 8), []);

  return (
    <div className="flex flex-col gap-5">
      <TravelHero trip={featuredTrip} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <WeatherPreview destination={featuredTrip.destination} weather={featuredTrip.weatherSummary} />
        <StatTile icon={Wallet} label="Trip budget remaining" value={formatCompactINR(budgetSummary.remaining)} accent="text-emerald-300" index={1} />
        <StatTile icon={Backpack} label="Packing progress" value={`${Math.round(packingProgress.pct)}%`} accent="text-violet-300" index={2} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Upcoming trips</p>
            <div className="flex gap-4 overflow-x-auto pb-1">
              {[featuredTrip, ...otherTrips].map((trip, i) => (
                <div key={trip.id} className="w-64 shrink-0">
                  <TripCard trip={trip} index={i} featured={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </GlassSurface>
        <TravelInsightCard />
      </div>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-mist-400">
            <MapPin className="h-3.5 w-3.5" /> Saved for later
          </p>
          <DestinationGallery places={favoritePlaces} />
        </div>
      </GlassSurface>
    </div>
  );
}
