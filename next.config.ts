import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: deploys to any free static host (Vercel, Netlify, Cloudflare Pages).
  output: "export",
  // Images are pre-optimised to WebP by `npm run images`, so no runtime optimiser is needed.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
