# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Roel van der Ven, built with Hugo (v0.154+). Static site with a custom theme (`themes/roelvanderven/`), self-hosted on a homelab via Docker + nginx, exposed through Cloudflare Tunnel.

## Commands

```bash
hugo server              # Dev server at http://localhost:1313
hugo --minify            # Production build to public/
./publish.sh             # Build + deploy to homelab via scp
```

Hugo is installed at `~/.local/bin/hugo`. This directory may not be in PATH by default — if `hugo` is not found, run `export PATH="$HOME/.local/bin:$PATH"` first.

## Content Types

Three content sections, each with distinct frontmatter and templates:

- **Posts** (`content/posts/`) — Blog articles. Frontmatter: `title`, `date`, `draft`, `tags`, `slug`, optional `excludeFromFeed`, `mastodon_url`.
- **Stills** (`content/stills/`) — Movie/TV screenshots. Frontmatter includes `screenshot_source`, `screenshot_link`, `image`. Supports multiple images in a single post.
- **Photos** (`content/photos/`) — Two subtypes controlled by `type` field:
  - `photography` — Roel's own photos. Uses `image`, `location`, `description`.
  - `cameo` — Photos of Roel from the web. Uses `image`, `alt`, `source_url`, `source_name`. Titles always include "Roel van der Ven" for SEO.

## Architecture

- **Theme**: `themes/roelvanderven/` — all layouts, partials, and CSS live here. Single CSS file at `assets/css/main.css` (no preprocessor, no JS framework).
- **Templates**: Section-specific overrides in `layouts/photos/` and `layouts/stills/`; default templates in `layouts/_default/`. Card partials (`post-card`, `still-card`, `photo-card`, `cameo-card`) render content on listing pages.
- **Home page** (`layouts/index.html`): Mixed feed of all content types, each rendered with its own card partial.
- **Permalinks**: `/:section/:slug/` (e.g., `/posts/my-article/`).
- **RSS**: Output as `feed.xml` (not the Hugo default `index.xml`).
- **Shortcodes**: `youtube` and `vimeo` for video embeds.
- **Images**: Stored in `static/images/{photos,stills}/`.

## Deployment

- `./publish.sh` builds locally with `hugo --minify`, then scp's `public/` to the remote
- Remote host: SSH alias `docker-host` (configured in `~/.ssh/config`)
- Remote path: `/docker/volumes/roelvanderven.com/public`
- Container `roelvanderven-website` (nginx:alpine) on port 8095 serves the files
- Cloudflare Tunnel routes `roelvanderven.com` to the homelab
- No remote build step — Hugo runs locally, only the built files are deployed

## Performance Targets

- Lighthouse Performance: ≥95
- First Contentful Paint: <1.0s
- Page weight (excluding images): <100KB
