"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NotificationProvider } from "@/components/providers/NotificationProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";

/** Single composition root for every cross-cutting provider, so
 *  app/layout.tsx stays a plain, readable tree instead of a pyramid of
 *  nested providers that grows with every new system feature. */
export function SystemProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ToastProvider>{children}</ToastProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
