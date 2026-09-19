import OrbitDashboardPreview from "@/components/preview/OrbitDashboardPreview";

/**
 * Standalone route for the "card-free" dashboard mockup — deliberately
 * outside the `(orbit)` group so it doesn't nest inside the real
 * `AppShell`/`Sidebar` (this component ships its own top bar + sidebar).
 */
export default function OrbitPreviewPage() {
  return <OrbitDashboardPreview />;
}
