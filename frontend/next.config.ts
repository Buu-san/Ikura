import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH (e.g. /Ikura) to build the static GitHub Pages export.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  ...(basePath && {
    output: 'export',
    basePath,
    images: { loader: 'custom', loaderFile: './image-loader.ts' },
  }),
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    '192.168.2.14',
    'localhost',
  ],
};

export default nextConfig;
