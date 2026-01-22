import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ["image/webp"],
  },
  // Bunランタイム対応
  serverExternalPackages: ["zod"],
};

export default nextConfig;
