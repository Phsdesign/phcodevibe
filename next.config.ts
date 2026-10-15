import type { NextConfig } from "next";

// O site é exportado estaticamente (output: "export"), então `headers()` nunca
// era aplicado — só gerava aviso no build. O CSP de produção vive em
// `public/_headers` (Cloudflare Pages), com o mesmo valor que estava aqui.
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
