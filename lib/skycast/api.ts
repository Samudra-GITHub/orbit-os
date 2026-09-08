import { parseAirQuality, parseCurrentWeather, parseDailyForecast, parseHourlyForecast } from "@/lib/skycast/forecast";
import type { AirQuality, CurrentWeather, DailyForecastEntry, HourlyForecastEntry } from "@/lib/skycast/types";

const BASE = "https://api.openweathermap.org";
const REVALIDATE_SECONDS = 600; // 10 min — matches the dashboard's "live enough" cadence.

function getApiKey(): string {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error("OPENWEATHER_API_KEY is not set — add it to .env.local");
  }
  return key;
}

async function owmFetch<T>(path: string, params: Record<string, string | number>): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  url.searchParams.set("appid", getApiKey());

  const res = await fetch(url.toString(), { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) {
    throw new Error(`SkyCast: ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function fetchCoords(city: string) {
  const raw = await owmFetch<{ coord: { lat: number; lon: number } }>("/data/2.5/weather", {
    q: city,
    units: "metric",
  });
  return raw.coord;
}

/** The 5-day/3-hour forecast list backs both getHourlyForecast and
 *  getDailyForecast — Next's fetch cache dedupes the identical request. */
async function fetchForecastList(lat: number, lon: number) {
  const raw = await owmFetch<{ list: unknown[] }>("/data/2.5/forecast", { lat, lon, units: "metric" });
  return raw.list as Parameters<typeof parseHourlyForecast>[0];
}

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const raw = await owmFetch<Parameters<typeof parseCurrentWeather>[0]>("/data/2.5/weather", {
    q: city,
    units: "metric",
  });

  let uvIndex = 0;
  try {
    const uvi = await owmFetch<{ value: number }>("/data/2.5/uvi", { lat: raw.coord.lat, lon: raw.coord.lon });
    uvIndex = uvi.value;
  } catch {
    // UV index is best-effort — current weather still renders without it.
  }

  return parseCurrentWeather(raw, uvIndex);
}

export async function getHourlyForecast(city: string): Promise<HourlyForecastEntry[]> {
  const { lat, lon } = await fetchCoords(city);
  const list = await fetchForecastList(lat, lon);
  return parseHourlyForecast(list);
}

export async function getDailyForecast(city: string): Promise<DailyForecastEntry[]> {
  const current = await owmFetch<{ coord: { lat: number; lon: number }; timezone: number }>("/data/2.5/weather", {
    q: city,
    units: "metric",
  });
  const list = await fetchForecastList(current.coord.lat, current.coord.lon);
  return parseDailyForecast(list, current.timezone);
}

export async function getAirQuality(lat: number, lon: number): Promise<AirQuality> {
  const raw = await owmFetch<Parameters<typeof parseAirQuality>[0]>("/data/2.5/air_pollution", { lat, lon });
  return parseAirQuality(raw);
}
