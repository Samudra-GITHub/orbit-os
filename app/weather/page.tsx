import { AppShell } from "@/components/layout/AppShell";
import { WeatherPageContent } from "@/components/widgets/WeatherPageContent";
import { getWeatherBundle } from "@/lib/skycast";

export default async function WeatherPage() {
  const bundle = await getWeatherBundle("Bengaluru");

  return (
    <AppShell>
      <WeatherPageContent bundle={bundle} />
    </AppShell>
  );
}
