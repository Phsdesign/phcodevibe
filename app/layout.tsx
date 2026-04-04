import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ScrollEffects } from "@/components/ScrollEffects";
import "./globals.css";
import "./mobile-fix.css";

import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "PH Code Vibe | Studio de Design e Experiências Web",
  description:
    "Combinamos design impecável, motion cinematográfico e performance para marcas que buscam o extraordinário no ambiente digital.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased selection:bg-blue-500 selection:text-white`}
      >
        <ScrollEffects />
        <FloatingButtons />
        {children}
      </body>
    </html>
  );
}
