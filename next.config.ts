import type { NextConfig } from "next";

const nextConfig = {
  images: {
    // This setting tells the next/image component to skip all built-in
    // image optimization features and serve the images as-is, which is
    // required for purely static deployments.
    unoptimized: true, 
  },
};

export default nextConfig;
