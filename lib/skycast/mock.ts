import type { AirQuality, CurrentWeather, DailyForecastEntry, HourlyForecastEntry } from "@/lib/skycast/types";

/** Used when OPENWEATHER_API_KEY is missing or a request fails, so the
 *  dashboard and /weather page always have something sensible to render. */
export const MOCK_CURRENT: CurrentWeather = {
  city: "Bengaluru",
  country: "IN",
  lat: 12.9716,
  lon: 77.5946,
  tempC: 22,
  feelsLikeC: 23,
  tempMinC: 19,
  tempMaxC: 26,
  humidity: 58,
  pressure: 1013,
  visibilityM: 9000,
  windSpeedKph: 12,
  windDeg: 210,
  description: "partly cloudy",
  condition: "Clouds",
  icon: "02d",
  isDay: true,
  uvIndex: 4.2,
  dewPointC: 14.4,
  sunrise: Math.floor(new Date().setHours(6, 12, 0, 0) / 1000),
  sunset: Math.floor(new Date().setHours(18, 44, 0, 0) / 1000),
  timezoneOffset: 19800,
};

export const MOCK_HOURLY: HourlyForecastEntry[] = [22, 24, 25, 24, 21, 20].map((tempC, i) => ({
  dt: Math.floor(Date.now() / 1000) + i * 3600,
  tempC,
  description: "partly cloudy",
  condition: "Clouds",
  icon: "02d",
  pop: [0.1, 0.1, 0.15, 0.2, 0.3, 0.35][i],
  humidity: 58,
}));

export const MOCK_DAILY: DailyForecastEntry[] = ["Clear", "Clouds", "Rain", "Clouds", "Clear", "Clouds", "Clear"].map(
  (condition, i) => ({
    dt: Math.floor(Date.now() / 1000) + i * 86400,
    tempMinC: 18 + (i % 3),
    tempMaxC: 26 + (i % 4),
    description: condition === "Rain" ? "light rain" : condition === "Clear" ? "clear sky" : "partly cloudy",
    condition: condition as DailyForecastEntry["condition"],
    icon: condition === "Rain" ? "10d" : condition === "Clear" ? "01d" : "02d",
    pop: condition === "Rain" ? 0.6 : 0.1,
  })
);

export const MOCK_AQI: AirQuality = { aqi: 2, label: "Fair" };
