import { GreetingCard } from "@/components/widgets/GreetingCard";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { FocusTimer } from "@/components/widgets/FocusTimer";
import { CalendarTimeline } from "@/components/widgets/CalendarTimeline";
import { FinanceSnapshot } from "@/components/widgets/FinanceSnapshot";
import { HealthSnapshot } from "@/components/widgets/HealthSnapshot";
import { MusicPlayer } from "@/components/widgets/MusicPlayer";
import { AIInsightWidget } from "@/components/widgets/AIInsightWidget";

/**
 * Bento layout — 12 columns desktop, 6 tablet, 1 mobile. Spans are
 * intentionally asymmetric (5/7, not 6/6) so widgets carry different
 * visual weight and natural height instead of uniform rectangles.
 */
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 lg:grid-cols-12 lg:gap-6">
      <GreetingCard />

      <div className="md:col-span-3 lg:col-span-5">
        <WeatherWidget />
      </div>
      <div className="md:col-span-3 lg:col-span-7">
        <FocusTimer />
      </div>

      <div className="md:col-span-3 lg:col-span-5">
        <CalendarTimeline />
      </div>
      <div className="md:col-span-3 lg:col-span-7">
        <FinanceSnapshot />
      </div>

      <div className="md:col-span-2 lg:col-span-4">
        <MusicPlayer />
      </div>
      <div className="md:col-span-2 lg:col-span-4">
        <HealthSnapshot />
      </div>
      <div className="md:col-span-2 lg:col-span-4">
        <AIInsightWidget />
      </div>
    </div>
  );
}
