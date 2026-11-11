import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "vanajvanguardia.vercel.app" }],
        destination: "https://vanajvanguardia.tech/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vanajvanguardia.tech" }],
        destination: "https://vanajvanguardia.tech/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/tour/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
