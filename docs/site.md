# Maintaining the site

## Writing and publishing

Write drafts in `src/content/drafts/`. Astro does not load that directory in development or production. To publish a post, move its Markdown or MDX file into `src/content/blog/` and provide frontmatter:

```yaml
---
title: Your post title
description: A short summary
pubDate: Oct 19 2026
tags:
  - cloud
---
```

The filename determines `/blog/<slug>/`; preserve existing filenames to keep inbound links working. Optional fields are `updatedDate` and `heroImage`. Posts are ordered newest first. Tags match case-insensitively, count each post once, and generate static `/tags/<tag>/` pages with a single selected tag. Filters and navigation work without JavaScript.

Use Markdown footnotes such as `A sentence[^note]` followed by `[^note]: An aside.`. References jump to highlighted endnotes and offer backlinks to the text. Internal wiki links retain the existing `[[slug|label]]` syntax.

The biography is `src/content/pages/about.md`; curated links are `src/content/pages/other-peoples-stuff.md`. Direct-link posts can live in `src/content/hidden/` with the same metadata as published posts. They are unlisted and marked noindex; direct URLs remain readable.

## Design and verification

`src/styles/global.css` contains the single Terminal Paper theme, including responsive layouts, the Carlos Roldán-inspired link highlight, and Sonnet-inspired endnotes. The shared site layout, archive, and reading layouts render all pages. The previous design gallery and alternatives have been removed.

IBM Plex Mono regular and bold are hosted in `public/fonts/` with their SIL Open Font License. The site always uses light mode and respects reduced-motion preferences.

Run `npm run build`, then `npm test`. With the dev server running, `npm run test:e2e` checks 1920×1080 and 390×844 layouts, tags, navigation, multiple article types, footnotes, no-JavaScript behavior, keyboard focus, light mode, redirects, draft/gallery exclusion, and independent project hosting. The project check builds and serves a temporary compiled project fixture, then removes it from source and output.

## Independent React and static projects

Build each project independently and copy its compiled output into `public/projects/<name>/`, with `index.html` at that directory's root. Astro copies the files unchanged into `dist/projects/<name>/`. GitHub Pages serves the project at `/projects/<name>/`; the blog does not wrap it, share its styles, or add a navigation link.

For a Vite React project, set `base: '/projects/<name>/'` or use suitable relative asset URLs before building. For client-side routes, use `HashRouter`, producing addresses such as `/projects/<name>/#/settings`. Alternatively, emit each route as a static directory containing its own `index.html`. GitHub Pages does not provide SPA rewrite rules.

Use `npm run build` followed by `npm run preview` to test these compiled HTML subtrees, rather than Astro's development page router. Check asset loading and refreshing nested routes before deployment.
