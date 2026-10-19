import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

// Astro dev routes HTML through its page router instead of serving public
// directory indexes. Match static hosting for independent projects in dev.
export default function staticProjects() {
  return {
    name: 'static-projects',
    apply: 'serve',
    configureServer(server) {
      const root = path.resolve(server.config.publicDir, 'projects');
      server.middlewares.use(async (request, response, next) => {
        if (!['GET', 'HEAD'].includes(request.method)) return next();
        try {
          const url = new URL(request.url, 'http://localhost');
          const pathname = decodeURIComponent(url.pathname);
          if (!pathname.startsWith('/projects/')) return next();
          let file = path.resolve(root, pathname.slice('/projects/'.length));
          if (!file.startsWith(`${root}${path.sep}`)) return next();
          if ((await stat(file)).isDirectory()) {
            file = path.join(file, 'index.html');
            await stat(file);
            if (!url.pathname.endsWith('/')) {
              response.writeHead(301, { Location: `${url.pathname}/${url.search}` });
              response.end();
              return;
            }
          }
          if (!file.endsWith('.html')) return next();
          const html = await readFile(file);
          response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          response.end(request.method === 'HEAD' ? undefined : html);
        } catch (error) {
          if (['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code) || error instanceof URIError) return next();
          next(error);
        }
      });
    },
  };
}
