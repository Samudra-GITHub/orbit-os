export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Fog"
  | "Drizzle"
  | "Unknown";

export interface CurrentWeather {
  city: string;
  country: string;
  lat: number;
  lon: number;
  tempC: number;
  feelsLikeC: number;
  tempMinC: number;
  tempMaxC: number;
  humidity: number;
  pressure: number;
  visibilityM: number;
  windSpeedKph: number;
  windDeg: number;
  description: string;
  condition: WeatherCondition;
  icon: string;
  isDay: boolean;
  uvIndex: number;
  dewPointC: number;
  sunrise: number;
  sunset: number;
  timezoneOffset: number;
}

export interface HourlyForecastEntry {
  dt: number;
  tempC: number;
  description: string;
  condition: WeatherCondition;
  icon: string;
  pop: number;
  humidity: number;
}

export interface DailyForecastEntry {
  dt: number;
  tempMinC: number;
  tempMaxC: number;
  description: string;
  condition: WeatherCondition;
  icon: string;
  pop: number;
}

export type AqiLevel = 1 | 2 | 3 | 4 | 5;

export interface AirQuality {
  aqi: AqiLevel;
  label: "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";
}

export interface SunriseSunset {
  sunrise: number;
  sunset: number;
  timezoneOffset: number;
}
