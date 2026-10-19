import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = file => readFile(path.join(root, 'dist', file), 'utf8');
const exists = async file => { try { await access(path.join(root, file)); return true; } catch { return false; } };
const home = await read('index.html');
const count = html => [...html.matchAll(/class="post-row"/g)].length;
const posts = (await readdir(path.join(root, 'src/content/blog'))).filter(file => /\.mdx?$/.test(file));
assert.equal(count(home), posts.length);
assert.match(home, /ls \.\/writing/);
assert.ok(!home.includes('noindex') && !home.includes('/hidden/') && !home.includes('/drafts/'));
assert.ok(!home.includes('fonts.googleapis.com') && !home.includes('preview-dock'));
assert.match(home, /rel="canonical" href="https:\/\/www\.jung-chan\.com\/"/);
for (const [tag, expected] of [['cloud', 2], ['aws', 1], ['ai', 1], ['terraform', 1], ['writing', 1]]) {
  const html = await read(`tags/${tag}/index.html`);
  assert.equal(count(html), expected, `${tag}: filtered archive`);
  assert.ok(!html.includes('noindex'));
}
for (const file of posts) {
  const slug = file.replace(/\.mdx?$/, '').toLowerCase();
  const html = await read(`blog/${slug}/index.html`);
  assert.match(html, /property="og:type" content="article"/);
  const source = await readFile(path.join(root, 'src/content/blog', file), 'utf8');
  if (/\[\^[^\]]+\]/.test(source)) assert.match(html, /data-footnote-ref/);
}
assert.match(await read('about/index.html'), /SC Ventures/);
assert.match(await read('about/index.html'), /data-footnote-backref/);
const likes = await read('other-peoples-stuff/index.html');
for (const domain of ['waitbutwhy.com', 'bitsaboutmoney.com', 'bloomberg.com', 'gwern.net', 'fortressofdoors.com']) assert.ok(likes.includes(domain));
assert.match(await read('blog/index.html'), /http-equiv="refresh"/);
assert.match(await read('stuff-i-like/index.html'), /http-equiv="refresh"/);
assert.match(await read('hidden/hollow-mirror/index.html'), /noindex, follow/);
const sitemap = await read('sitemap-0.xml');
const rss = await read('rss.xml');
for (const text of [sitemap, rss]) {
  assert.ok(text.includes('https://www.jung-chan.com'));
  for (const excluded of ['/drafts/', '/hidden/', '/designs/']) assert.ok(!text.includes(excluded));
}
for (const file of ['src/designs', 'src/pages/designs', 'src/assets/design-fonts', 'dist/designs', 'dist/drafts']) assert.equal(await exists(file), false, `${file} must not remain`);
for (const file of ['ibm-plex-mono-regular.woff2', 'ibm-plex-mono-bold.woff2', 'OFL.txt']) assert.ok(await exists(`dist/fonts/${file}`));
// Check every generated same-origin page/image/stylesheet link against build output.
async function filesIn(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(entry => entry.isDirectory() ? filesIn(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
for (const file of (await filesIn(path.join(root, 'dist'))).filter(file => file.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/(?!\/)[^"#?]*)(?:[?#][^"]*)?"/g)) {
    let pathname = decodeURIComponent(match[1]);
    if (pathname.endsWith('/')) pathname += 'index.html';
    assert.ok(await exists(`dist${pathname}`), `Broken local link in ${path.relative(root, file)}: ${match[1]}`);
  }
}
console.log('Passed: Terminal Paper archive, tags, post URLs, About, curated links, endnotes, custom-domain metadata, RSS, sitemap, hidden content, drafts, mockup removal, fonts, and internal links.');
