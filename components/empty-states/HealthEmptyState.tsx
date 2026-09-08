import { HeartPulse } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

/** For before Health is connected to a device/data source. The Health
 *  module itself is out of scope for this sprint — this is a ready
 *  component for when it's built. */
export function HealthEmptyState() {
  return (
    <EmptyState
      icon={HeartPulse}
      title="No health data yet"
      description="Connect a device or app to see steps, sleep, and heart rate here."
    />
  );
}
