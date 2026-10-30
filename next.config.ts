import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain HTML/CSS/JS site to /out,
// ready to upload to Hostinger public_html (PHP endpoints live in /public/api).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // No image server on static hosting, so images come from pre-made WebP copies
  // (scripts/optimize-images.mjs) chosen by a custom loader.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 960, 1280, 1920],
    imageSizes: [160, 320, 480],
  },
};

export default nextConfig;
