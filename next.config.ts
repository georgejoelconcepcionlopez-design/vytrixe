import type { NextConfig } from "next";

console.log("[Vytrixe Deployment Monitor] Next.js Initialization Started. Verifying environment configurations...");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
