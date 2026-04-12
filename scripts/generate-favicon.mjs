/**
 * Builds public/favicon.ico from public/favicon.svg (multi-size PNG → ICO).
 * Run: npm run build:favicon
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const svgPath = join(publicDir, 'favicon.svg');
const svg = readFileSync(svgPath);

const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
	sizes.map((s) => sharp(svg).resize(s, s).png().toBuffer()),
);
const ico = await toIco(pngBuffers);
writeFileSync(join(publicDir, 'favicon.ico'), ico);
console.log(`Wrote public/favicon.ico (${sizes.join(', ')} px) from favicon.svg`);
