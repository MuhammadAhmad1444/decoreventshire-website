import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain HTML/CSS/JS site to /out,
// ready to upload to Hostinger public_html (PHP endpoints live in /public/api).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
