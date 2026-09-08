import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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

export const metadata: Metadata = {
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
        <CosmicBackground />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
