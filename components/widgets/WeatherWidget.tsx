import { getWeatherBundle } from "@/lib/skycast";
import { WeatherWidgetView } from "@/components/widgets/WeatherWidgetView";

/**
 * Server component — fetches live weather via lib/skycast (falls back to
 * mock data if the API key is missing or the request fails) and hands it
 * to the client view for animation. Cached/revalidated in lib/skycast/api.ts,
 * not polled.
 */
export async function WeatherWidget() {
  const bundle = await getWeatherBundle("Bengaluru");
  return <WeatherWidgetView bundle={bundle} />;
}
