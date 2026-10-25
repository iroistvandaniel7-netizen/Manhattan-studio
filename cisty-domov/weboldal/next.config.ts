import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* This project sits inside another Next.js repository; pin the root so the
     parent's lockfile and files are never mistaken for this app's. */
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
