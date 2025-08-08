// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import wikiLinkPlugin from 'remark-wiki-link';
import fs from 'fs';
import path from 'path';

// Synchronous filesystem-based collection scanner - finds which collection contains a given slug
function findCollectionForSlug(slug) {
	const collections = ['blog', 'hidden']; // Add more collections as they're defined
	const contentDir = './src/content';
	
	for (const collectionName of collections) {
		try {
			const collectionPath = path.join(contentDir, collectionName);
			
			// Check if collection directory exists
			if (!fs.existsSync(collectionPath)) {
				continue;
			}
			
			// Read all files in the collection directory
			const files = fs.readdirSync(collectionPath, { withFileTypes: true });
			
			// Look for matching slug (check both .md and .mdx extensions)
			const found = files.some(file => {
				if (file.isFile()) {
					const fileName = file.name;
					const fileSlug = fileName.replace(/\.(md|mdx)$/, '');
					return fileSlug === slug;
				}
				return false;
			});
			
			if (found) {
				return collectionName;
			}
		} catch (error) {
			// Collection might not exist or be readable, continue to next one
			console.warn(`Collection ${collectionName} scan failed:`, error.message);
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
				hrefTemplate: (permalink) => {
					const collection = findCollectionForSlug(permalink);
					return `/${collection}/${permalink}`;
				},
				aliasDivider: '|'
			}]
		]
	}
});
