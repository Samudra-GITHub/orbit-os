import { CloudOff } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

interface WeatherEmptyStateProps {
  onRetry?: () => void;
}

/** For when a location has no forecast data yet (new city, API outage).
 *  Not currently reachable — lib/skycast always falls back to mock data —
 *  but ready for when that fallback is removed. */
export function WeatherEmptyState({ onRetry }: WeatherEmptyStateProps) {
  return (
    <EmptyState
      icon={CloudOff}
      title="No forecast available"
      description="We couldn't load weather for this location. Try again in a moment."
      action={
        onRetry && (
          <button
            onClick={onRetry}
            className="mt-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white transition-colors hover:bg-white/10"
          >
            Retry
          </button>
        )
      }
    />
  );
}
