/**
 * Rasterizes the default Open Graph artwork to public/og.png (1200×630).
 * Run after editing the SVG string below: npm run build:og
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fda4af"/>
      <stop offset="45%" stop-color="#faf6f1"/>
      <stop offset="100%" stop-color="#f0e6d8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <path fill="#9f1239" opacity="0.12" d="M980 120c40 80 20 200-60 280s-200 100-300 60 40-120 100-200 180-200 260-140Z"/>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="56" font-weight="600" fill="#2d2420">Boyfriend&apos;s Guide</text>
  <text x="600" y="310" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="600" fill="#9f1239">To Taylor Swift</text>
  <text x="600" y="375" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="#5c4f47">Learning the lore, one song at a time</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="28" fill="#9f1239">TS &#9829; girlfriend &#9829; boyfriend</text>
  <text x="600" y="495" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#8a7a70">boyfriendguidetotaylorswift.com</text>
</svg>`;

const png = await sharp(Buffer.from(ogSvg)).resize(1200, 630).png().toBuffer();
writeFileSync(join(publicDir, 'og.png'), png);
console.log('Wrote public/og.png (1200×630)');
