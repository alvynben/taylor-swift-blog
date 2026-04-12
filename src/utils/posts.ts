import type { CollectionEntry } from 'astro:content';

/** Posts visible on the site: drafts only in dev. */
export function isVisiblePost(post: CollectionEntry<'blog'>): boolean {
	return import.meta.env.DEV || !post.data.draft;
}

/** RSS and similar: never include drafts. */
export function isPublishedPost(post: CollectionEntry<'blog'>): boolean {
	return !post.data.draft;
}

export function sortByDateDesc(
	a: CollectionEntry<'blog'>,
	b: CollectionEntry<'blog'>,
): number {
	return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}
