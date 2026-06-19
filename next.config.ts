import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The /mcp route reads widget/dist/index.html at runtime; make sure the file
  // is bundled into the serverless function on Vercel.
  outputFileTracingIncludes: {
    "/mcp": ["./widget/dist/**/*"],
  },
};

export default nextConfig;
