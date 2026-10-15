import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ScrollEffects } from "@/components/ScrollEffects";
import { CustomCursor } from "@/components/CustomCursor";
import { StarsBackground } from "@/components/StarsBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WebVitals } from "@/components/WebVitals";
import { MobileStatic } from "@/components/MobileStatic";
import { StyledJsxRegistry } from "@/components/StyledJsxRegistry";
import "./globals.css";
import "./mobile-fix.css";
import "./theme-glass.css";
import "./stars.css";


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
  themeColor: "#0A1128",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://phcodevibe.pages.dev"
  ),
  title: "PH Code Labs | Studio de Design e Experiências Web",
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
    title: "PH Code Labs | Studio de Design e Experiências Web",
    description:
      "Combinamos design impecável, motion cinematográfico e performance para marcas que buscam o extraordinário no ambiente digital.",
    url: "https://phcodevibe.pages.dev",
    siteName: "PH Code Labs",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "PH Code Labs Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "PH Code Labs | Studio de Design e Experiências Web",
    description:
      "Combinamos design impecável, motion cinematográfico e performance para marcas que buscam o extraordinário no ambiente digital.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" href="/Fonts/Vamu.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_Tkn9TR_V.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="image_src" href="https://phcodevibe.pages.dev/icon.png" />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: {
                    and: [
                      { href_matches: "/*" },
                      { not: { href_matches: "/api/*" } },
                    ],
                  },
                  eagerness: "moderate",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased selection:bg-cyan-400/40 selection:text-white transition-colors duration-300`}
      >
        <MobileStatic />
        <WebVitals />
        <SmoothScroll />
        <StarsBackground />
        <ScrollEffects />
        <FloatingButtons />
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <CustomCursor />
      </body>
    </html>
  );
}
