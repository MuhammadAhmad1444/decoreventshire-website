// next/image loader for the static export: points each requested width at the pre-made WebP
// copy written by scripts/optimize-images.mjs, so pages download right-sized images.
// Keep WIDTHS in sync with that script and with the sizes in next.config.ts.
const WIDTHS = [160, 320, 480, 640, 960, 1280, 1920];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/images/")) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/_img/${src.slice("/images/".length).replace(/\.(jpe?g|png)$/i, "")}-${w}.webp`;
}
