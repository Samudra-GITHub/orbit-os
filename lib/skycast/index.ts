import { getAirQuality, getCurrentWeather, getDailyForecast, getHourlyForecast } from "@/lib/skycast/api";
import { MOCK_AQI, MOCK_CURRENT, MOCK_DAILY, MOCK_HOURLY } from "@/lib/skycast/mock";
import type { AirQuality, CurrentWeather, DailyForecastEntry, HourlyForecastEntry } from "@/lib/skycast/types";

export * from "@/lib/skycast/types";
export * from "@/lib/skycast/icons";
export * from "@/lib/skycast/format";
export { getCurrentWeather, getHourlyForecast, getDailyForecast, getAirQuality };

export interface WeatherBundle {
  current: CurrentWeather;
  hourly: HourlyForecastEntry[];
  daily: DailyForecastEntry[];
  aqi: AirQuality;
  /** True when a live OpenWeatherMap call failed and mock data was used instead. */
  isFallback: boolean;
}

/**
 * Single entry point the dashboard widget and the full /weather page both
 * call — the only place that decides "live vs. mock", so fetch logic is
 * never duplicated at the call sites.
 */
export async function getWeatherBundle(city = "Bengaluru"): Promise<WeatherBundle> {
  try {
    const current = await getCurrentWeather(city);
    const [hourly, daily, aqi] = await Promise.all([
      getHourlyForecast(city),
      getDailyForecast(city),
      getAirQuality(current.lat, current.lon),
    ]);
    return { current, hourly, daily, aqi, isFallback: false };
  } catch {
    return { current: MOCK_CURRENT, hourly: MOCK_HOURLY, daily: MOCK_DAILY, aqi: MOCK_AQI, isFallback: true };
  }
}
