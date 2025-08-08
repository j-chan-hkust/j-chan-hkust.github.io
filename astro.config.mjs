// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import wikiLinkPlugin from 'remark-wiki-link';
import fs from 'fs';
import path from 'path';

// Universal collection scanner - finds which collection contains a given slug
async function findCollectionForSlug(slug) {
	const collections = ['blog', 'hidden']; // Add more collections as they're defined
	
	for (const collectionName of collections) {
		try {
			const entries = await getCollection(collectionName);
			const found = entries.find(entry => entry.slug === slug);
			if (found) {
				return collectionName;
			}
		} catch (error) {
			// Collection might not exist, continue to next one
			console.warn(`Collection ${collectionName} not found:`, error.message);
		}
	}
	
	// Default to 'blog' if not found in any collection
	return 'blog';
}

// https://astro.build/config
export default defineConfig({
	site: 'https://j-chan-hkust.github.io',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [
			[wikiLinkPlugin, {
				pageResolver: (name) => {
					const slug = name.replace(/ /g, '-').toLowerCase();
					return [slug];
				},
				hrefTemplate: async (permalink) => {
					const collection = await findCollectionForSlug(permalink);
					return `/${collection}/${permalink}`;
				},
				aliasDivider: '|'
			}]
		]
	}
});
