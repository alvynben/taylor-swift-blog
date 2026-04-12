// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Production URL (RSS, sitemap, canonical URLs, Open Graph).
	site: 'https://boyfriendguidetotaylorswift.com',
	integrations: [mdx(), sitemap()],
});
