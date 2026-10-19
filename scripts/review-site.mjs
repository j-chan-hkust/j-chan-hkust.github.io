import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { verifyProjectHosting } from './check-project-hosting.mjs';

const base = process.env.SITE_URL || 'http://127.0.0.1:4321';
const output = path.resolve('artifacts/site');
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400 && !['/drafts/', '/designs/'].some(part => response.url().includes(part))) errors.push(`${response.status()} ${response.url()}`); });
async function visit(url) {
  assert.equal((await page.goto(`${base}${url}`, { waitUntil: 'networkidle0' })).status(), 200);
  await page.evaluate(() => document.fonts.ready);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Horizontal overflow: ${url}`);
  assert.ok(await page.$eval('main', el => el.getBoundingClientRect().height > 0), `Content is visible: ${url}`);
}
try {
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  for (const [device, width, height] of [['desktop', 1920, 1080], ['mobile', 390, 844]]) {
    await page.setViewport({ width, height });
    await visit('/');
    assert.equal(await page.$$eval('.post-row', rows => rows.length), 4);
    assert.equal(await page.$eval('html', el => getComputedStyle(el).backgroundColor), 'rgb(248, 245, 236)');
    assert.ok((await page.$eval('body', el => getComputedStyle(el).fontFamily)).includes('IBM Plex Mono'));
    await page.screenshot({ path: `${output}/home-${device}.png`, fullPage: true });
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }), page.click('.tag-filter a[href="/tags/cloud/"]')]);
    assert.equal(await page.$$eval('.post-row', rows => rows.length), 2);
    await page.click('.filter-summary a');
    await page.waitForFunction(() => document.querySelectorAll('.post-row').length === 4);
    await page.click('a[aria-label="About me"]');
    await page.waitForSelector('.prose [data-footnote-ref]');
    assert.ok((await page.$eval('.prose', el => el.textContent)).includes('SC Ventures'));
    await page.screenshot({ path: `${output}/about-${device}.png`, fullPage: true });
    await page.click('a[aria-label="other people\'s stuff"]');
    await page.waitForSelector('.prose a[href="https://waitbutwhy.com/"]');
    await page.screenshot({ path: `${output}/other-peoples-stuff-${device}.png`, fullPage: true });
    for (const [label, url] of [['article', '/blog/ecs-2-ecr-via-privatelink/'], ['essay', '/blog/no-llm/'], ['hidden', '/hidden/universal-studios-singapore/']]) {
      await visit(url);
      await page.screenshot({ path: `${output}/${label}-${device}.png` });
      const target = await page.$eval('[data-footnote-ref]', el => el.getAttribute('href'));
      await page.click('[data-footnote-ref]');
      await page.waitForFunction(hash => location.hash === hash, {}, target);
      assert.notEqual(await page.$eval(target, el => getComputedStyle(el).backgroundColor), 'rgba(0, 0, 0, 0)');
      await page.click(`${target} [data-footnote-backref]`);
      await page.waitForFunction(() => location.hash.startsWith('#user-content-fnref-'));
    }
    console.log(`${device}: archive, filter/reset, About, curated links, technical article, essay, hidden post, endnotes, screenshots ✓`);
  }
  await page.setJavaScriptEnabled(false);
  await visit('/tags/aws/');
  assert.equal(await page.$$eval('.post-row', rows => rows.length), 1);
  await page.click('.post-title');
  await page.waitForSelector('.prose [data-footnote-ref]');
  await page.click('[data-footnote-ref]');
  assert.ok(page.url().includes('#user-content-fn-'));
  await page.setJavaScriptEnabled(true);
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }, { name: 'prefers-reduced-motion', value: 'reduce' }]);
  await visit('/');
  assert.equal(await page.$eval('html', el => getComputedStyle(el).backgroundColor), 'rgb(248, 245, 236)');
  assert.equal(await page.$eval('html', el => getComputedStyle(el).scrollBehavior), 'auto');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
  await visit('/blog/');
  assert.equal(new URL(page.url()).pathname, '/');
  for (const url of ['/drafts/about/', '/designs/', '/designs/terminal-paper/']) assert.equal((await page.goto(`${base}${url}`)).status(), 404);
  await verifyProjectHosting(page);
  assert.deepEqual(errors, []);
  await writeFile(`${output}/review.json`, JSON.stringify({ checked: new Date().toISOString(), errors, viewports: ['1920×1080', '390×844'], checks: ['archive', 'tags', 'About', 'curated links', 'articles', 'hidden posts', 'footnotes', 'no JavaScript', 'light-only theme', 'reduced motion', 'keyboard skip link', 'legacy blog redirect', 'draft/gallery exclusion', 'independent project hosting'] }, null, 2));
  console.log(`Browser checks passed. Screenshots: ${output}`);
} catch (error) {
  console.error('Browser errors:', errors);
  await page.screenshot({ path: `${output}/failure.png` });
  throw error;
} finally { await browser.close(); }
