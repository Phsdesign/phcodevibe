import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    // Evita que o CSP bloqueie o Turbopack HMR em modo de desenvolvimento
    if (process.env.NODE_ENV === "development") return [];

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://wa.me; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' blob: data:; connect-src 'self' https://wa.me;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
