import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { SystemProvider } from "@/components/providers/SystemProvider";
import { CosmicBackground } from "@/components/motion/CosmicBackground";
import "../styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// No production domain is configured yet — `NEXT_PUBLIC_SITE_URL` lets a
// real deploy override this without another code change; until then this
// resolves OpenGraph/Twitter image URLs against localhost instead of
// leaving `metadataBase` unset (which Next.js otherwise warns about on
// every build).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Orbit OS",
  description: "Your day, orchestrated.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/branding/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/branding/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/branding/pinned-tab.svg", color: "#8b5cf6" }],
  },
  openGraph: {
    title: "Orbit OS",
    description: "Your day, orchestrated.",
    images: [{ url: "/branding/icon-512.png", width: 512, height: 512, alt: "Orbit OS" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <SystemProvider>
          <CosmicBackground />
          {children}
        </SystemProvider>
      </body>
    </html>
  );
}
