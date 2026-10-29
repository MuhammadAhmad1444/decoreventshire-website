// Makes small WebP copies of every photo in public/images, in each width the site asks for.
// The site is a static export (no image server), so without this every <Image> would download
// the full-size original (up to 2200px / 700 KB) even for a 150px thumbnail.
// Output: public/_img/<path>-<width>.webp, read by src/lib/image-loader.ts.
// Runs before `dev` and `build`; unchanged images are skipped, so repeat runs are fast.
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Keep in sync with WIDTHS in src/lib/image-loader.ts and the sizes in next.config.ts.
const WIDTHS = [160, 320, 480, 640, 960, 1280, 1920];
const SRC = path.resolve("public/images");
const OUT = path.resolve("public/_img");
// Quality 60 at max effort is visually the same as 72 on these photos at roughly half the bytes.
// Changing ENCODE regenerates every copy (the stamp file below records the last settings used).
const ENCODE = { quality: 60, effort: 6, smartSubsample: true };
const STAMP = path.join(OUT, ".encode.json");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

const mtime = (file) => stat(file).then((s) => s.mtimeMs, () => 0);

const settingsChanged = (await readFile(STAMP, "utf8").catch(() => "")) !== JSON.stringify(ENCODE);

let made = 0;
let skipped = 0;
// Tiny blurred previews shown instantly while each photo loads (see src/components/Img.tsx).
// Brand artwork is left out: its transparent edges would show as a blurry box.
const placeholders = {};
// Real pixel sizes, so layouts like the Pinterest-style gallery can keep each photo's true shape.
const sizes = {};
for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file).replace(/\.(jpe?g|png)$/i, "");
  if (!rel.startsWith("brand")) {
    const tiny = await sharp(file).rotate().resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
    placeholders[`/images/${path.relative(SRC, file).split(path.sep).join("/")}`] = `data:image/webp;base64,${tiny.toString("base64")}`;
  }
  const srcTime = await mtime(file);
  const meta = await sharp(file).metadata();
  const original = meta.width ?? 0;
  // EXIF orientations 5-8 are rotated a quarter turn, so width and height swap on screen.
  const turned = (meta.orientation ?? 1) >= 5;
  sizes[`/images/${path.relative(SRC, file).split(path.sep).join("/")}`] = turned ? [meta.height, meta.width] : [meta.width, meta.height];
  await mkdir(path.join(OUT, path.dirname(rel)), { recursive: true });
  for (const w of WIDTHS) {
    const dest = path.join(OUT, `${rel}-${w}.webp`);
    if (!settingsChanged && (await mtime(dest)) > srcTime) { skipped++; continue; }
    // Never upscale: widths above the original are written at the original size, so every
    // width the loader can ask for exists.
    await sharp(file).rotate().resize({ width: Math.min(w, original), withoutEnlargement: true }).webp(ENCODE).toFile(dest);
    made++;
  }
}
await writeFile(STAMP, JSON.stringify(ENCODE));
await writeFile(path.resolve("src/data/image-placeholders.json"), JSON.stringify(placeholders, null, 0) + "\n");
await writeFile(path.resolve("src/data/image-sizes.json"), JSON.stringify(sizes) + "\n");
console.log(`images: ${made} written, ${skipped} up to date, ${Object.keys(placeholders).length} placeholders`);
