"use client";

import { motion } from "framer-motion";
import { Utensils, Landmark, BedDouble, Coffee, ShoppingBag, type LucideIcon } from "lucide-react";
import { TRIPS, type Place, type PlaceCategory } from "@/lib/constants/travel";

const categoryIcon: Record<PlaceCategory, LucideIcon> = {
  restaurant: Utensils,
  attraction: Landmark,
  hotel: BedDouble,
  cafe: Coffee,
  shopping: ShoppingBag,
};

// A small fixed hue rotation (not per-place data) so gallery tiles read as
// a cohesive set rather than needing bespoke color data per place.
const HUE_CYCLE = ["#8b5cf6", "#2dd4bf", "#fbbf24", "#fb7185", "#34d399"];

interface DestinationGalleryProps {
  places: Place[];
}

/** A visual browse-by-photo gallery of saved places — mesh-gradient tiles
 *  stand in for real destination photography (no image assets/APIs), each
 *  tinted by a rotating hue so the grid reads as a cohesive set. Loaded
 *  lazily from the Dashboard page since it's the heaviest, least
 *  above-the-fold section. */
export function DestinationGallery({ places }: DestinationGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {places.map((place, i) => {
        const Icon = categoryIcon[place.category];
        const hue = HUE_CYCLE[i % HUE_CYCLE.length];
        const trip = TRIPS.find((t) => t.id === place.tripId);
        return (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-32 flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-3"
            style={{
              background: `radial-gradient(ellipse 90% 80% at 30% 20%, color-mix(in oklab, ${hue} 45%, transparent), transparent), var(--color-void)`,
            }}
          >
            <Icon className="absolute right-3 top-3 h-4 w-4 text-white/50" strokeWidth={1.75} />
            <p className="truncate text-sm font-medium text-white">{place.name}</p>
            <p className="truncate text-[11px] text-white/60">{trip?.destination}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
