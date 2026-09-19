"use client";

import { ItineraryTimeline } from "@/components/travel/ItineraryTimeline";
import { useItinerary } from "@/lib/hooks/useItinerary";
import { TRIPS } from "@/lib/constants/travel";

export default function TravelItineraryPage() {
  const { days, toggleActivity } = useItinerary();
  const trip = TRIPS.find((t) => t.id === days[0]?.tripId);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Itinerary</h1>
        <p className="mt-1 text-sm text-mist-400">
          {trip ? `${trip.destination}, ${trip.country}` : "Your day-by-day plan"} — tap a day to expand it.
        </p>
      </div>

      <ItineraryTimeline days={days} onToggleActivity={toggleActivity} />
    </div>
  );
}
