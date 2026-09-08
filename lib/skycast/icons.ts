import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  CloudDrizzle,
  Moon,
  type LucideIcon,
} from "lucide-react";
import type { WeatherCondition } from "@/lib/skycast/types";

/** OpenWeatherMap's `weather[0].main` maps directly onto our condition union. */
export function mapOwmConditionToWeatherCondition(main: string): WeatherCondition {
  switch (main) {
    case "Clear":
      return "Clear";
    case "Clouds":
      return "Clouds";
    case "Rain":
      return "Rain";
    case "Thunderstorm":
      return "Thunderstorm";
    case "Snow":
      return "Snow";
    case "Drizzle":
      return "Drizzle";
    case "Mist":
    case "Haze":
    case "Smoke":
    case "Dust":
    case "Sand":
    case "Ash":
      return "Mist";
    case "Fog":
      return "Fog";
    default:
      return "Unknown";
  }
}

const DAY_ICONS: Record<WeatherCondition, LucideIcon> = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Thunderstorm: CloudLightning,
  Snow: Snowflake,
  Mist: CloudFog,
  Fog: CloudFog,
  Drizzle: CloudDrizzle,
  Unknown: Cloud,
};

const NIGHT_ICONS: Partial<Record<WeatherCondition, LucideIcon>> = {
  Clear: Moon,
};

/** `isDay` swaps a handful of icons (currently just clear-sky) for their night equivalent. */
export function getWeatherIcon(condition: WeatherCondition, isDay = true): LucideIcon {
  if (!isDay && NIGHT_ICONS[condition]) return NIGHT_ICONS[condition]!;
  return DAY_ICONS[condition];
}
