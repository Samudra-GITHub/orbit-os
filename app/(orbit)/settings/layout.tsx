import type { ReactNode } from "react";
import { SettingsLayout } from "@/components/settings/SettingsLayout";

export default function SettingsRouteLayout({ children }: { children: ReactNode }) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
