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
      { source: "/blog", destination: "/home/blog", permanent: true },
      { source: "/blog/:path*", destination: "/home/blog/:path*", permanent: true },
      { source: "/blogs", destination: "/home/blog", permanent: true },
      { source: "/blogs/:path*", destination: "/home/blog/:path*", permanent: true },
      { source: "/learning", destination: "/home/learning", permanent: true },
      { source: "/learning/:path*", destination: "/home/learning/:path*", permanent: true },
      { source: "/community", destination: "/home/community", permanent: true },
      { source: "/community/:path*", destination: "/home/community/:path*", permanent: true },
      { source: "/connect", destination: "/home/courses", permanent: true },
      { source: "/connect/:path*", destination: "/home/courses/:path*", permanent: true },
      { source: "/courses", destination: "/home/courses", permanent: true },
      { source: "/courses/:path*", destination: "/home/courses/:path*", permanent: true },
      { source: "/playground", destination: "/home/playground", permanent: true },
      { source: "/playground/:path*", destination: "/home/playground/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
