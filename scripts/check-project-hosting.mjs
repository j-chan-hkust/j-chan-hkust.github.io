import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

// Test Astro's real public-file copy, followed by normal static-host directory
// resolution. Astro dev handles HTML as routes, so it is not the project host.
export async function verifyProjectHosting(page) {
  const root = path.resolve(import.meta.dirname, '..');
  const output = path.join(root, 'dist');
  await mkdir(path.join(root, 'public/projects'), { recursive: true });
  const fixture = await mkdtemp(path.join(root, 'public/projects/review-fixture-'));
  const name = path.basename(fixture);
  let server;
  try {
    await writeFile(path.join(fixture, 'index.html'), '<!doctype html><html><head><title>Independent project</title><link rel="icon" href="/favicon.png"><link rel="stylesheet" href="./app.css"></head><body><h1>Project</h1><script type="module" src="./app.js"></script></body></html>');
    await writeFile(path.join(fixture, 'app.js'), 'document.querySelector("h1").textContent = "Independent project loaded: " + location.hash;');
    await writeFile(path.join(fixture, 'app.css'), 'body { background: rgb(231, 241, 217); font: 18px monospace; }');
    await promisify(execFile)('npm', ['run', 'build'], { cwd: root });
    assert.ok((await readFile(path.join(output, 'projects', name, 'index.html'), 'utf8')).includes('./app.js'), 'Astro copies independent compiled output');
    server = createServer(async (request, response) => {
      let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (pathname.endsWith('/')) pathname += 'index.html';
      const file = path.resolve(output, `.${pathname}`);
      if (!file.startsWith(`${output}${path.sep}`)) { response.writeHead(403).end(); return; }
      try {
        const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png' }[path.extname(file)] || 'application/octet-stream';
        response.writeHead(200, { 'Content-Type': mime }).end(await readFile(file));
      } catch { response.writeHead(404).end(); }
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const url = `http://127.0.0.1:${server.address().port}/projects/${name}/#/nested`;
    assert.equal((await page.goto(url, { waitUntil: 'networkidle0' })).status(), 200);
    assert.equal(await page.$eval('h1', el => el.textContent), 'Independent project loaded: #/nested');
    assert.equal(await page.$eval('body', el => getComputedStyle(el).backgroundColor), 'rgb(231, 241, 217)');
    await page.reload({ waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('h1', el => el.textContent), 'Independent project loaded: #/nested');
    console.log('Independent project: Astro build copy, directory URL, JS/CSS assets, hash route, and refresh ✓');
  } finally {
    if (server?.listening) await new Promise(resolve => server.close(resolve));
    await rm(fixture, { recursive: true, force: true });
    await rm(path.join(output, 'projects', name), { recursive: true, force: true });
  }
}
