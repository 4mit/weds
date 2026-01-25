import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Webpack config for when using --webpack flag
  webpack: (config, { dir }) => {
    // Ensure webpack resolves modules from the project root
    config.resolve.modules = [
      path.resolve(dir, "node_modules"),
      ...(config.resolve.modules || []),
    ];
    return config;
  },
  // Turbopack config (Next.js 16 default)
  turbopack: {
    // Empty config to silence the warning
    // Turbopack should handle module resolution correctly by default
  },
};

export default nextConfig;
