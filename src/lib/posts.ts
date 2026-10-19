import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export async function getPosts() {
  return (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
export const tagKey = (tag: string) => tag.trim().toLocaleLowerCase('en-US');
export const tagSlug = (tag: string) => encodeURIComponent(tagKey(tag));
// Match the timezone used when Astro coerces the existing human-readable dates.
export const dateLabel = (date: Date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export function tagsFor(posts: Post[]) {
  const tags = new Map<string, { key: string; label: string; count: number }>();
  for (const post of posts) {
    for (const key of new Set(post.data.tags.map(tagKey).filter(Boolean))) {
      const item = tags.get(key);
      if (item) item.count++;
      else tags.set(key, { key, label: post.data.tags.find(tag => tagKey(tag) === key)!.trim(), count: 1 });
    }
  }
  return [...tags.values()].sort((a, b) => a.label.localeCompare(b.label, 'en'));
}
