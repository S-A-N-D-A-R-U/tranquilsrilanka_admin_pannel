import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error - undocumented Turbopack configuration
    turbopack: {
      root: 'c:/Users/Sandaruwan/Desktop/ttttt/serene-admin'
    }
  }
};

export default nextConfig;
