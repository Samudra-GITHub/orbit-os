import { getWeatherIcon } from "@/lib/skycast/icons";
import type { TripWeatherSummary } from "@/lib/constants/travel";
import { GlassSurface } from "@/components/ui/GlassSurface";

interface WeatherPreviewProps {
  destination: string;
  weather: TripWeatherSummary;
}

/** A destination weather chip styled like SkyCast's own — same icon set
 *  (`getWeatherIcon`) and gradient icon badge as `WeatherWidget`/
 *  `WeatherPageContent`, just fed a trip's mock summary instead of a
 *  live API bundle. */
export function WeatherPreview({ destination, weather }: WeatherPreviewProps) {
  const Icon = getWeatherIcon(weather.condition);

  return (
    <GlassSurface intensity="subtle" interactive={false} className="rounded-3xl p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20">
          <Icon className="h-6 w-6 text-cyan-300" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-mist-500">{destination} forecast</p>
          <p className="mt-0.5 flex items-baseline gap-1.5">
            <span className="font-mono text-lg font-semibold text-white">{weather.tempMaxC}°</span>
            <span className="font-mono text-sm text-mist-400">/ {weather.tempMinC}°</span>
            <span className="text-xs capitalize text-mist-400">{weather.condition.toLowerCase()}</span>
          </p>
        </div>
      </div>
    </GlassSurface>
  );
}
