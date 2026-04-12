// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Set your production URL (required for RSS, sitemap, canonical URLs).
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
});
