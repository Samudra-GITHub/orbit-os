// Rasterizes the Orbit brand SVGs into the PNG/ICO assets Next.js metadata
// and platform icon systems need. Re-run with `node scripts/generate-icons.mjs`
// whenever the source SVGs in public/branding change.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.resolve(import.meta.dirname, "..");
const brandingDir = path.join(root, "public", "branding");
const appDir = path.join(root, "app");

const INK_900 = "#0a0a0f";

async function renderPng(svgPath, size, { background = null, paddingPct = 0 } = {}) {
  const svg = await readFile(svgPath);
  const inner = Math.round(size * (1 - paddingPct * 2));

  const markBuffer = await sharp(svg, { density: 384 })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  let canvas = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

  const offset = Math.round((size - inner) / 2);
  return canvas
    .composite([{ input: markBuffer, left: offset, top: offset }])
    .png()
    .toBuffer();
}

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, alpha: 1 };
}

async function main() {
  await mkdir(brandingDir, { recursive: true });
  await mkdir(appDir, { recursive: true });

  const markSvg = path.join(brandingDir, "favicon.svg");

  // App icon route (app/icon.png) + manifest icons — solid ink background,
  // mark padded to sit within the ~80% maskable safe zone.
  const icon512 = await renderPng(markSvg, 512, { background: hexToRgb(INK_900), paddingPct: 0.14 });
  await writeFile(path.join(brandingDir, "icon-512.png"), icon512);

  const icon192 = await renderPng(markSvg, 192, { background: hexToRgb(INK_900), paddingPct: 0.14 });
  await writeFile(path.join(brandingDir, "icon-192.png"), icon192);

  // Apple touch icon — solid background (iOS composites oddly over transparency).
  const appleTouch = await renderPng(markSvg, 180, { background: hexToRgb(INK_900), paddingPct: 0.16 });
  await writeFile(path.join(brandingDir, "apple-touch-icon.png"), appleTouch);

  // favicon.ico — multi-resolution, transparent background.
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(sizes.map((s) => renderPng(markSvg, s, { paddingPct: 0.04 })));
  const ico = await pngToIco(pngBuffers);
  await writeFile(path.join(brandingDir, "favicon.ico"), ico);
  // Next.js auto-serves a root app/favicon.ico if present.
  await writeFile(path.join(appDir, "favicon.ico"), ico);

  console.log("Generated: icon-512.png, icon-192.png, apple-touch-icon.png, favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
