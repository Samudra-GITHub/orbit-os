"use client";

import { motion } from "framer-motion";
import { Utensils, Landmark, BedDouble, Coffee, ShoppingBag, Star, Heart, type LucideIcon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import type { Place, PlaceCategory as PlaceCategoryId } from "@/lib/constants/travel";
import { cn } from "@/lib/utils";

const categoryIcon: Record<PlaceCategoryId, LucideIcon> = {
  restaurant: Utensils,
  attraction: Landmark,
  hotel: BedDouble,
  cafe: Coffee,
  shopping: ShoppingBag,
};

const categoryTint: Record<PlaceCategoryId, string> = {
  restaurant: "bg-amber-400/15 text-amber-300",
  attraction: "bg-violet-500/15 text-violet-300",
  hotel: "bg-indigo-400/15 text-indigo-300",
  cafe: "bg-rose-400/15 text-rose-300",
  shopping: "bg-cyan-400/15 text-cyan-300",
};

interface PlaceCardProps {
  place: Place;
  tripLabel?: string;
  onToggleFavorite: (id: string) => void;
  index?: number;
}

/** A saved place — category icon, rating, price level, and a favorite
 *  toggle that animates on click. */
export function PlaceCard({ place, tripLabel, onToggleFavorite, index = 0 }: PlaceCardProps) {
  const Icon = categoryIcon[place.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassSurface intensity="subtle" className="rounded-3xl p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl", categoryTint[place.category])}>
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <button
              type="button"
              onClick={() => onToggleFavorite(place.id)}
              aria-pressed={place.favorite}
              aria-label={place.favorite ? `Remove ${place.name} from favorites` : `Add ${place.name} to favorites`}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              <motion.span whileTap={{ scale: 0.8 }}>
                <Heart
                  className={cn("h-4 w-4 transition-colors", place.favorite ? "fill-rose-400 text-rose-400" : "text-mist-500")}
                />
              </motion.span>
            </button>
          </div>

          <div>
            <p className="font-medium text-white">{place.name}</p>
            {tripLabel && <p className="mt-0.5 text-xs text-mist-500">{tripLabel}</p>}
            <p className="mt-1.5 text-xs text-mist-400">{place.note}</p>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs">
            <span className="flex items-center gap-1 text-amber-300">
              <Star className="h-3.5 w-3.5 fill-amber-300" /> {place.rating.toFixed(1)}
            </span>
            <span className="text-mist-500">{"₹".repeat(place.priceLevel)}</span>
          </div>
        </div>
      </GlassSurface>
    </motion.div>
  );
}
