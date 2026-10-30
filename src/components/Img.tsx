"use client";

import NextImage, { type ImageProps } from "next/image";
import placeholders from "@/data/image-placeholders.json";
import imageLoader from "@/lib/image-loader";

const blurs = placeholders as Record<string, string>;

/**
 * next/image with a tiny blurred preview shown instantly while the photo loads, so pictures
 * fade in smoothly instead of popping into blank space. Previews come from
 * scripts/optimize-images.mjs; images without one (brand artwork) render as normal.
 * The loader is passed here as well as in next.config.ts because Turbopack (used by `next dev`)
 * ignores the config's loaderFile.
 */
export default function Img(props: ImageProps) {
  const blur = typeof props.src === "string" ? blurs[props.src] : undefined;
  return <NextImage loader={imageLoader} {...props} {...(blur && !props.placeholder ? { placeholder: "blur", blurDataURL: blur } : {})} />;
}
