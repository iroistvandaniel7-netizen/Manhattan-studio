import path from "node:path";
import type { NextConfig } from "next";

/*
 * `STATIC_EXPORT=1` builds plain files for ordinary web hosting — no Node
 * server, one folder per page — see `scripts/build-hosting.sh`.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  /* This project sits inside another Next.js repository; pin the root so the
     parent's lockfile and files are never mistaken for this app's. */
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
  ...(staticExport
    ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
