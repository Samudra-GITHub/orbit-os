import { mapOwmConditionToWeatherCondition } from "@/lib/skycast/icons";
import type {
  AirQuality,
  AqiLevel,
  CurrentWeather,
  DailyForecastEntry,
  HourlyForecastEntry,
} from "@/lib/skycast/types";

const AQI_LABELS: Record<AqiLevel, AirQuality["label"]> = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor",
};

/** Ported from SkyCast's `fetch_weather` — Magnus-approximation dew point. */
function approximateDewPointC(tempC: number, humidity: number): number {
  return Math.round((tempC - (100 - humidity) / 5) * 10) / 10;
}

// Minimal shape of what we read off OpenWeatherMap's `/data/2.5/weather` response.
interface OwmCurrentResponse {
  name: string;
  sys?: { country?: string; sunrise?: number; sunset?: number };
  coord: { lat: number; lon: number };
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; humidity: number; pressure: number };
  wind?: { speed?: number; deg?: number };
  weather: Array<{ main: string; description: string; icon: string }>;
  visibility?: number;
  timezone: number;
  dt: number;
}

export function parseCurrentWeather(raw: OwmCurrentResponse, uvIndex: number): CurrentWeather {
  const weather = raw.weather[0];
  const sunrise = raw.sys?.sunrise ?? 0;
  const sunset = raw.sys?.sunset ?? 0;

  return {
    city: raw.name,
    country: raw.sys?.country ?? "",
    lat: raw.coord.lat,
    lon: raw.coord.lon,
    tempC: Math.round(raw.main.temp),
    feelsLikeC: Math.round(raw.main.feels_like),
    tempMinC: Math.round(raw.main.temp_min),
    tempMaxC: Math.round(raw.main.temp_max),
    humidity: raw.main.humidity,
    pressure: raw.main.pressure,
    visibilityM: raw.visibility ?? 10000,
    windSpeedKph: Math.round((raw.wind?.speed ?? 0) * 3.6),
    windDeg: raw.wind?.deg ?? 0,
    description: weather.description,
    condition: mapOwmConditionToWeatherCondition(weather.main),
    icon: weather.icon,
    isDay: sunrise <= raw.dt && raw.dt <= sunset,
    uvIndex: Math.round(uvIndex * 10) / 10,
    dewPointC: approximateDewPointC(raw.main.temp, raw.main.humidity),
    sunrise,
    sunset,
    timezoneOffset: raw.timezone,
  };
}

interface OwmForecastItem {
  dt: number;
  main: { temp: number; humidity: number };
  weather: Array<{ main: string; description: string; icon: string }>;
  pop?: number;
}

/** First 12 three-hour slots (~36h) of OpenWeatherMap's 5-day/3-hour forecast. */
export function parseHourlyForecast(list: OwmForecastItem[]): HourlyForecastEntry[] {
  return list.slice(0, 12).map((item) => ({
    dt: item.dt,
    tempC: Math.round(item.main.temp),
    description: item.weather[0].description,
    condition: mapOwmConditionToWeatherCondition(item.weather[0].main),
    icon: item.weather[0].icon,
    pop: item.pop ?? 0,
    humidity: item.main.humidity,
  }));
}

/** Collapses 3-hour slots into per-day buckets (local time), same approach as SkyCast. */
export function parseDailyForecast(list: OwmForecastItem[], timezoneOffsetSeconds: number): DailyForecastEntry[] {
  const buckets = new Map<string, OwmForecastItem[]>();

  for (const item of list) {
    const localMs = (item.dt + timezoneOffsetSeconds) * 1000;
    const dayKey = new Date(localMs).toISOString().slice(0, 10);
    const bucket = buckets.get(dayKey) ?? [];
    bucket.push(item);
    buckets.set(dayKey, bucket);
  }

  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 7)
    .map(([, slots]) => {
      const temps = slots.map((s) => s.main.temp);
      const pops = slots.map((s) => s.pop ?? 0);
      const mid = slots[Math.floor(slots.length / 2)];
      return {
        dt: slots[0].dt,
        tempMinC: Math.round(Math.min(...temps)),
        tempMaxC: Math.round(Math.max(...temps)),
        description: mid.weather[0].description,
        condition: mapOwmConditionToWeatherCondition(mid.weather[0].main),
        icon: mid.weather[0].icon,
        pop: Math.max(...pops),
      };
    });
}

interface OwmAirPollutionResponse {
  list: Array<{ main: { aqi: number } }>;
}

export function parseAirQuality(raw: OwmAirPollutionResponse): AirQuality {
  const aqi = (raw.list[0]?.main.aqi ?? 1) as AqiLevel;
  return { aqi, label: AQI_LABELS[aqi] ?? "Good" };
}
