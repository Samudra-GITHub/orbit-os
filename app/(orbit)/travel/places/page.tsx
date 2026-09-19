"use client";

import { useMemo, useState } from "react";
import { Utensils, Landmark, BedDouble, Coffee, ShoppingBag, LayoutGrid, type LucideIcon } from "lucide-react";
import { PlaceCard } from "@/components/travel/PlaceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PLACES, TRIPS, type PlaceCategory } from "@/lib/constants/travel";
import { cn } from "@/lib/utils";

type FilterId = "all" | PlaceCategory;

const FILTERS: { id: FilterId; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "attraction", label: "Attractions", icon: Landmark },
  { id: "restaurant", label: "Restaurants", icon: Utensils },
  { id: "hotel", label: "Hotels", icon: BedDouble },
  { id: "cafe", label: "Cafés", icon: Coffee },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
];

export default function TravelPlacesPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(PLACES.filter((p) => p.favorite).map((p) => p.id))
  );

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered = useMemo(
    () => (filter === "all" ? PLACES : PLACES.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Saved places</h1>
        <p className="mt-1 text-sm text-mist-400">Attractions, restaurants, hotels, cafés, and shopping across every trip.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
              filter === f.id
                ? "border-violet-400/40 bg-white/10 text-white"
                : "border-white/10 bg-white/[0.03] text-mist-400 hover:text-mist-200"
            )}
          >
            <f.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((place, i) => {
            const trip = TRIPS.find((t) => t.id === place.tripId);
            return (
              <PlaceCard
                key={place.id}
                place={{ ...place, favorite: favorites.has(place.id) }}
                tripLabel={trip?.destination}
                onToggleFavorite={toggleFavorite}
                index={i}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState icon={Landmark} title="No places found" description="Try a different category filter." className="py-12" />
      )}
    </div>
  );
}
