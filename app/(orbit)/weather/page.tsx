import { WeatherPageContent } from "@/components/widgets/WeatherPageContent";
import { getWeatherBundle } from "@/lib/skycast";

export default async function WeatherPage() {
  const bundle = await getWeatherBundle("Bengaluru");
  return <WeatherPageContent bundle={bundle} />;
}
