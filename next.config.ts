import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Turbopack can fail to resolve `next` during HMR when the project path
  // contains spaces or the root is inferred incorrectly.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/:path*", destination: "/blog/:path*", permanent: true },
      { source: "/courses", destination: "/connect", permanent: true },
      { source: "/courses/:path*", destination: "/connect/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
