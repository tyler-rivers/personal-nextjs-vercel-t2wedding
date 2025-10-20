import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow remote images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crescenthotelwedding.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'crescent-hotel.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'duckduckgo.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      }
    ],
  },
};

export default nextConfig;
