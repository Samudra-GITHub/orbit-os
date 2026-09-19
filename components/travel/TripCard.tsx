"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Trip } from "@/lib/constants/travel";
import { daysUntilTrip } from "@/lib/travel/computeStats";
import { formatCompactINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

const NOW = new Date("2026-09-09T12:00:00");

function formatDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startStr = start.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  const endStr = end.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  return `${startStr} – ${endStr}`;
}

interface TripCardProps {
  trip: Trip;
  index?: number;
  featured?: boolean;
}

/** One trip tile for the Dashboard's upcoming-trips carousel — a mesh
 *  gradient cover (the same three-hue recipe `CosmicBackground`/wallpaper
 *  pickers use), destination, dates, and a countdown badge. */
export function TripCard({ trip, index = 0, featured = false }: TripCardProps) {
  const [h1, h2, h3] = trip.coverHues;
  const days = daysUntilTrip(trip, NOW);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link href="/travel/itinerary" className="block h-full">
        <div
          className={cn(
            "group relative flex h-full min-h-[190px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-5 transition-transform hover:scale-[1.02]",
            featured && "min-h-[220px]"
          )}
          style={{
            background: `
              radial-gradient(ellipse 75% 60% at 20% 15%, color-mix(in oklab, ${h1} 55%, transparent), transparent),
              radial-gradient(ellipse 65% 60% at 85% 35%, color-mix(in oklab, ${h2} 42%, transparent), transparent),
              radial-gradient(ellipse 75% 65% at 50% 100%, color-mix(in oklab, ${h3} 40%, transparent), transparent),
              var(--color-void)
            `,
          }}
        >
          <div aria-hidden className="bg-cosmic-noise pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" />
          <Badge variant="accent" className="absolute right-4 top-4 backdrop-blur-md">
            {days <= 0 ? "In progress" : days === 1 ? "Tomorrow" : `${days}d away`}
          </Badge>
          <div className="relative">
            <p className="flex items-center gap-1.5 text-xs text-white/70">
              <MapPin className="h-3 w-3" /> {trip.country}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-white">{trip.destination}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-white/70">
              <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
              <span className="font-mono text-white">{formatCompactINR(trip.budget)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
