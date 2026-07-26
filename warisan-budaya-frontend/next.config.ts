import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    webpackMemoryOptimizations: true,
  },
  allowedDevOrigins: ['172.16.168.31', 'http://172.16.168.31:3000', 'localhost', '127.0.0.1'],
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
};

export default nextConfig;
