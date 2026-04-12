import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			category: z.string().optional(),
			/** Optional: used by Decap only to build the file name (see public/admin/config.yml). */
			filenameSlug: z.string().optional(),
			draft: z.boolean().default(false),
			heroImage: image().optional(),
		}),
});

export const collections = { blog };
