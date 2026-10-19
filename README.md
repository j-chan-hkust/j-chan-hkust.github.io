# Jung Chan

A personal blog built with Astro, using the Terminal Paper design: warm off-white, an orange accent, and locally served IBM Plex Mono.

The homepage lists published posts, with static tag filters. The heart opens **other people's stuff**; the question mark opens **About**. Articles support Markdown/MDX, syntax-highlighted code, images, animated link highlights, and native footnotes with backlinks and target highlighting.

## Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the site at `localhost:4321` |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Check built pages, links, tags, metadata, RSS, and exclusions |
| `npm run test:e2e` | Review desktop/mobile behavior and capture screenshots |

Run `npm run build` before `npm test`. The browser review needs a running dev server and the Chrome installation used by the existing Puppeteer dependency; it writes screenshots and its report to ignored `artifacts/site/`. Set `SITE_URL` to review a server at another address.

## Content

- `src/content/blog/`: published posts with title, description, publication date, and optional tags, updated date, and hero image.
- `src/content/hidden/`: direct-link posts, excluded from archives, RSS, search indexing, and the sitemap.
- `src/content/pages/`: the About biography and curated links.
- `src/content/drafts/`: local working files, ignored by Git and never built or routed.

Existing `/blog/<slug>/` and `/hidden/<slug>/` links are preserved. `/blog/` forwards to the homepage. The former `/stuff-i-like/` path forwards to `/other-peoples-stuff/`.

The configured domain is `https://www.jung-chan.com`, matching `public/CNAME`. GitHub Pages deployment still uses the existing workflow on pushes to `main`.

See [site maintenance and independent projects](docs/site.md) for publishing content and hosting React/static builds under `/projects/<name>/`.
