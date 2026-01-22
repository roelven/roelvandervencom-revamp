# Product Requirements Document: roelvanderven.com Redesign

**Author:** Roel van der Ven  
**Version:** 1.0  
**Date:** January 21, 2026  
**Status:** Published

---

## 1. Executive Summary

This PRD outlines the requirements for redesigning roelvanderven.com as a personal website and publishing platform. The site will serve as Roel's primary digital home—a place to share articles, screenshots, photos, and thoughts while maintaining a simple, fast, and distinctly personal aesthetic.

The redesign prioritizes content ownership (POSSE principles), minimal friction for publishing, and cross-posting to Mastodon with bidirectional linking for comments and discussion.

---

## 2. Background & Context

### 2.1 About the Author

Roel van der Ven is a Senior Product Manager at Spotify with 20+ years of experience across media, music, and platform technology. His background spans:

- **Professional:** Zero-to-one product initiatives, creator/platform ecosystems, technical infrastructure (Spotify for Authors, Spotify Open Access, content metadata platforms)
- **Technical:** Full-stack programming background, homelab enthusiast, Home Assistant automation, self-hosting advocate
- **Creative:** Bread baking (sourdough), cooking, music discovery
- **Personal:** Dutch, living near Berlin with family, vegetarian, energy-conscious (passive house with solar)

The website should reflect this blend of professional product thinking, technical depth, creative interests, and personal perspective.

### 2.2 Design Philosophy

Drawing from the reference sites, the design ethos should be:

| Inspiration | Key Takeaway |
|-------------|--------------|
| stefanzweifel.dev | Clean navigation, /now page, reading log, project showcase |
| seangoedecke.com | Minimal design, prominent article list, clear tagging |
| blog.emilburzo.com | Hugo-powered simplicity, clean typography, technical posts |
| karolinaszczur.com | Elegant hierarchy, strong typography, professional yet personal |
| danilafe.com | Microfeatures: linkable headings, external link markers, TOC |

**Core principle:** Simple and easy, yet a platform to publish anything—mostly articles, occasionally screenshots or photos.

---

## 3. Goals & Non-Goals

### 3.1 Goals

1. **Establish a personal publishing platform** that Roel owns and controls
2. **Enable frictionless publishing** of various content types (articles, screenshots, photos, code)
3. **Integrate with Mastodon** for cross-posting and comment collection
4. **Achieve excellent performance** (< 1s load time, 100/100 Lighthouse scores)
5. **Self-host on homelab** using Docker for full infrastructure ownership
6. **Support content discovery** through RSS, clear navigation, and search

### 3.2 Non-Goals

- Building a portfolio or resume site (LinkedIn handles that)
- E-commerce or monetization features
- User accounts or authentication
- Comments system on the site itself (Mastodon handles discussion)
- Analytics beyond basic privacy-respecting metrics (if any)

---

## 4. User Personas

### 4.1 Primary: The Curious Reader

- Discovers content through RSS, Mastodon, or search
- Wants to quickly assess if content is relevant
- Values fast-loading pages and clean reading experience
- May want to comment or discuss (via Mastodon link)

### 4.2 Secondary: The Professional Contact

- Recruiters, potential collaborators, or industry peers
- Looking for background info (About page)
- Interested in current focus (/now page)
- May want to see past work or projects

### 4.3 Tertiary: Future Roel

- Using the site as a personal archive
- Referencing old posts and ideas
- Benefiting from well-organized, linkable content

---

## 5. Information Architecture

```
roelvanderven.com/
├── / (Home)                 # Recent posts + brief intro
├── /about                   # Who is Roel (bio, background, links)
├── /now                     # Current focus and activities
├── /posts/                  # All articles (paginated)
│   └── /posts/[slug]        # Individual post
├── /screenshots/            # Screenshot posts (movies, TV, etc.)
│   └── /screenshots/[slug]  # Individual screenshot
├── /photos/                 # Photos feed (photography + cameo mixed)
│   └── /photos/[slug]       # Individual photo page
├── /tags/                   # Tag index
│   └── /tags/[tag]          # Posts by tag
├── /feed.xml                # RSS feed (full content)
└── /sitemap.xml             # Sitemap for SEO
```

### 5.1 Content Types

| Type | Description | Template Features |
|------|-------------|-------------------|
| **Article** | Long-form written content | Code blocks, headings, images, TOC (optional) |
| **Screenshot** | Image with caption + optional link | Full-width image, caption, source link (IMDB, etc.) |
| **Photography** | High-res photos by Roel | Full-bleed showcase, individual page focus |
| **Cameo** | Photos of Roel collected from web | Compact display, SEO-optimized, feed-friendly |

---

## 6. Functional Requirements

### 6.1 Core Pages

#### 6.1.1 Home Page

- Brief personal intro (2-3 sentences max)
- Recent posts section (mixed content types, 10 items)
- Clear navigation to About, Now, and content archives
- No hero image or large graphics—content-first

#### 6.1.2 About Page

Content should include:
- Professional summary (product leader, 20+ years experience)
- Career highlights (Spotify, SoundCloud, tape.tv, etc.)
- Technical interests (homelab, automation, self-hosting)
- Personal interests (bread baking, cooking, family)
- Social links (Mastodon, LinkedIn, GitHub)
- Contact method (email)

Reference: stefanzweifel.dev/about for structure

#### 6.1.3 Now Page

Following nownownow.com conventions:
- What Roel is currently focused on professionally
- Personal projects or learning pursuits
- What's top of mind
- Last updated date (manual, not automated)

The Now page answers: "What would you tell a friend you hadn't seen in a year?"

### 6.2 Content Features

#### 6.2.1 Article Template

Required elements:
- Title
- Publication date
- Tags (displayed, linked)
- Reading time estimate
- Main content area with:
  - Headings (H2-H4)
  - Code blocks with syntax highlighting
  - Images with captions
  - Blockquotes
  - Lists (ordered/unordered)
- Mastodon discussion link (see 6.3)

Optional elements:
- Table of contents (for longer posts)
- Last updated date (if edited)
- Series navigation (if part of a series)

#### 6.2.2 Screenshot Template

Required elements:
- Full-width image (responsive, optimized)
- Caption (what is this from?)
- Source link (e.g., IMDB, Wikipedia)
- Publication date
- Tags
- Mastodon discussion link

Design: Minimal chrome around the image—let the screenshot speak.

#### 6.2.3 Photos Section

**Overview:** The `/photos/` section contains two types of content sharing a URL space but using different templates:

| Type | Purpose | Source |
|------|---------|--------|
| **Photography** | Showcase high-quality photos taken by Roel | Original work |
| **Cameo** | Archive photos of Roel from around the web | Collected, attributed |

Both live under `/photos/` for URL consistency and SEO, differentiated by `type` in frontmatter.

---

**Photos Feed Page (`/photos/`)**

Header text: *"Pictures I've made, collected or created. Sources are included when I'm not the author."*

**Feed layout (mixed stream, chronological):**

```
┌─────────────────────────────────────────────────────┐
│  Photos                                             │
│  Pictures I've made, collected or created.          │
│  Sources are included when I'm not the author.      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ [Photography Card - links to full page]      │   │
│  │ ┌─────────────────────────────────────┐     │   │
│  │ │                                     │     │   │
│  │ │    Thumbnail (16:9 crop)            │     │   │
│  │ │                                     │     │   │
│  │ └─────────────────────────────────────┘     │   │
│  │ Berlin Fireworks 2024                        │   │
│  │ 31 Dec 2024                                  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ [Cameo - inline, no click-through needed]    │   │
│  │ ┌───────────────────┐                       │   │
│  │ │                   │                       │   │
│  │ │  (variable size   │                       │   │
│  │ │   centered)       │                       │   │
│  │ │                   │                       │   │
│  │ └───────────────────┘                       │   │
│  │ Roel van der Ven at tape.tv                  │   │
│  │ 15 Mar 2014 · Source: Instagram              │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ [Another Cameo - inline]                     │   │
│  │ ...                                          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  [Load more / Pagination]                          │
└─────────────────────────────────────────────────────┘
```

**Feed behavior:**
- Chronological (newest first)
- Photography posts: Card with thumbnail, title, date → links to individual page
- Cameo posts: Full image inline (centered, max-width constrained), caption, source → scrollable in feed, optionally links to individual page
- Pagination or infinite scroll (paginated preferred for simplicity)

---

**Photography Template (`type: photography`)**

For high-resolution photos taken by Roel.

**Individual page layout:**
- Full-bleed hero image (edge-to-edge, responsive)
- Title below image
- Caption/description
- Date
- Tags
- Optional: EXIF data, location
- Mastodon discussion link

**Frontmatter:**
```yaml
---
title: "Berlin Fireworks 2024"
date: 2024-12-31
type: photography
tags: [berlin, night]
image: "/images/photos/berlin-fireworks-2024.jpg"
description: "New Year's Eve fireworks over Berlin"
location: "Berlin, Germany"  # optional
mastodon_url: "https://social.lol/@roel/123"  # optional
---

Optional longer caption or story about the photo.
```

---

**Cameo Template (`type: cameo`)**

For photos of Roel collected from around the web, optimized for Google Image SEO.

**Individual page layout:**
- Centered image (not full-bleed, respects original aspect ratio)
- Max-width constrained (e.g., 600px) to handle variable quality
- Title (always includes "Roel van der Ven" for SEO)
- Caption
- Source attribution with link
- Date
- Auto-tagged with `cameo`

**Frontmatter:**
```yaml
---
title: "Roel van der Ven at tape.tv"
date: 2014-03-15
type: cameo
tags: [cameo]
image: "/images/photos/roel-van-der-ven-at-tape-tv.jpg"
alt: "Roel van der Ven at the tape.tv office in Berlin"
source_url: "https://www.instagram.com/p/xxxxx/"
source_name: "Instagram - @photographer"
---

Working at the tape.tv office in Berlin.
```

**SEO requirements for cameo:**
- Filename: Always `roel-van-der-ven-[context].jpg`
- Alt text: Always includes "Roel van der Ven"
- Title: Always includes "Roel van der Ven"
- Structured data: JSON-LD `ImageObject` with `author` and `contentLocation`

---

**Image SEO Strategy (site-wide)**

| Image Type | Filename Convention | Alt Text Strategy |
|------------|---------------------|-------------------|
| Cameo photos | `roel-van-der-ven-*.jpg` | Always include full name |
| Photography | `[descriptive-name].jpg` | Describe the scene |
| Article headers | `[slug]-header.jpg` | Descriptive, no name |
| Screenshots | `[source]-[title].jpg` | Describe the content |

This differentiation helps Google associate cameo photos with "Roel van der Ven" image searches while photography and article images rank for their subjects.

#### 6.2.4 Code Blocks

Requirements:
- Syntax highlighting (Prism.js or similar)
- Language indicator
- Copy button
- Line numbers (optional, configurable per block)
- Code block origin/filename (for multi-file contexts)

Reference: danilafe.com's code blocks with origin feature

### 6.3 Mastodon Integration

**Core flow:**
1. Publish new content to website
2. Automatically (or manually triggered) create Mastodon post on social.lol/@roel
3. Capture Mastodon post URL
4. Update website post with link to Mastodon discussion
5. Display "Discuss on Mastodon" link on website

**Implementation options:**

Option A: **Manual workflow** (recommended)
- Publish post, manually toot with link, manually add toot URL to frontmatter
- Simplest, no automation required
- Full control over what gets cross-posted

Option B: **Semi-automated (local script)**
- After deploy, run script that checks for new posts without Mastodon URLs
- Script creates toot via Mastodon API
- Script updates frontmatter with toot URL, triggers rebuild
- Requires: Mastodon API token stored locally

**Recommendation:** Start with Option A. Cross-posting manually ensures quality control and lets you customize each toot.

**Frontmatter example:**
```yaml
---
title: "My Article Title"
date: 2026-01-21
tags: [product, strategy]
mastodon_url: "https://social.lol/@roel/123456789"
---
```

**Display:** If `mastodon_url` exists, show "Discuss on Mastodon →" link at end of post.

### 6.4 Microfeatures

#### 6.4.1 Easily Linkable Headings

All H2-H4 headings must:
- Have auto-generated slug IDs
- Display a link icon on hover (or always visible)
- Allow right-click → Copy Link
- Use URL fragment (e.g., `/posts/my-article#section-name`)

Implementation: CSS + JS for hover effect, heading anchor links in HTML generation.

#### 6.4.2 External Link Markers

Links to external domains should display a small indicator icon (↗ or similar) to distinguish from internal links.

Implementation:
```css
a[href^="http"]:not([href*="roelvanderven.com"])::after {
  content: " ↗";
  font-size: 0.8em;
}
```

Consider: Different markers for known domains (GitHub, Wikipedia) as future enhancement.

#### 6.4.3 RSS Feed

Requirements:
- Full-content RSS (not truncated)
- Include all content types (articles, screenshots, photos)
- Valid XML per RSS 2.0 or Atom spec
- Discoverable via `<link rel="alternate">` in HTML head
- Available at `/feed.xml` or `/index.xml`

### 6.5 Navigation & Discovery

#### 6.5.1 Primary Navigation

Persistent header with:
- Site title/logo (text-based, "Roel van der Ven" or initials)
- Nav items: About, Now, Posts, Tags, RSS

Mobile: Hamburger menu or collapsed nav.

#### 6.5.2 Tag System

**Purpose:** Enable content discovery and thematic grouping across all content types.

**Tag display on post cards (home page, archive listings):**
- Display as comma-separated lowercase links below the post title/date
- Example: `product, strategy, spotify`
- Clicking a tag navigates to `/tags/[tag]/`

**Tag display on individual posts:**
- Position: Below the post title, above the content
- Format: Inline comma-separated links (same as cards)
- Style: Subtle, secondary text color, not visually dominant

**Tag index page (`/tags/`):**
- Alphabetical list of all tags
- Each tag shows post count in parentheses
- Example: `bread (12) · homelab (8) · product (23) · spotify (15)`
- No tag cloud—keep it simple and scannable

**Individual tag pages (`/tags/[tag]/`):**
- Page title: "Posts tagged: [tag]"
- Chronological list of all posts with that tag (newest first)
- Same card format as home page

**Tag conventions:**
- Lowercase, hyphenated for multi-word (`home-assistant`, not `Home Assistant`)
- Prefer specific over generic (`hugo` over `development`)
- Limit to 2-4 tags per post
- Special tag: `cameo` reserved for photos of Roel

---

## 7. Non-Functional Requirements

### 7.1 Performance

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 |
| First Contentful Paint | < 1.0s |
| Largest Contentful Paint | < 2.0s |
| Total Blocking Time | < 100ms |
| Cumulative Layout Shift | < 0.1 |
| Page weight (typical article) | < 100KB (excl. images) |

Strategies:
- No JavaScript required for core functionality
- Minimal CSS (< 20KB uncompressed)
- Image optimization (WebP, lazy loading, responsive srcset)
- Preload critical resources
- Static HTML generation (no runtime)

### 7.2 Accessibility

- WCAG 2.1 AA compliance minimum
- Semantic HTML throughout
- Keyboard navigation support
- Skip links
- Sufficient color contrast
- Alt text for all images
- Properly structured headings

### 7.3 SEO

- Semantic markup
- Open Graph meta tags
- Twitter Card meta tags
- Structured data (JSON-LD for articles)
- Canonical URLs
- Sitemap.xml
- robots.txt

### 7.4 Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- No JavaScript required for reading content

---

## 8. Technical Architecture

### 8.1 Static Site Generator

**Decision:** Hugo

Chosen for:
- Single binary, no Node.js dependency
- Fastest build times
- Mature ecosystem with good theme support
- Simple deployment to homelab

### 8.2 Hosting Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Homelab                          │
│  ┌──────────────────────────────────────────────┐  │
│  │              Docker Host                      │  │
│  │  ┌────────────────┐  ┌────────────────────┐  │  │
│  │  │    Nginx       │  │  Static Files      │  │  │
│  │  │  (Container)   │──│  (Built site)      │  │  │
│  │  │                │  │  /var/www/html     │  │  │
│  │  └────────────────┘  └────────────────────┘  │  │
│  └──────────────────────────────────────────────┘  │
│                         │                           │
│              ┌──────────────────────┐              │
│              │  Cloudflare Tunnel   │              │
│              │  (cloudflared)       │              │
│              └──────────────────────┘              │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │  Cloudflare Edge    │
              │  (TLS termination)  │
              └─────────────────────┘
```

**Docker Compose setup:**
```yaml
services:
  website:
    image: nginx:alpine
    volumes:
      - ./public:/usr/share/nginx/html:ro
    networks:
      - cloudflare  # Connect to existing tunnel network
    restart: unless-stopped
```

Cloudflare Tunnel handles TLS and routing—no need for Caddy or Let's Encrypt.

### 8.3 Build & Deploy Pipeline

**Approach:** Obsidian vault as Hugo project, local build, rsync deploy

```
┌─────────────────────────────────────────────────────┐
│            Local Machine (Mac)                      │
│  ┌──────────────────────────────────────────────┐  │
│  │         Obsidian Vault                        │  │
│  │         ~/Documents/Obsidian/Website/         │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │  content/posts/*.md                    │  │  │
│  │  │  content/screenshots/*.md              │  │  │
│  │  │  hugo.toml                             │  │  │
│  │  │  themes/                               │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────┘  │
│                         │                           │
│              ┌──────────────────────┐              │
│              │  publish.sh          │              │
│              │  (Shellcommands)     │              │
│              └──────────────────────┘              │
└─────────────────────────────────────────────────────┘
                         │ rsync over SSH
                         ▼
┌─────────────────────────────────────────────────────┐
│                    Homelab                          │
│              /srv/website/public/                   │
│              (mounted in nginx container)           │
└─────────────────────────────────────────────────────┘
```

**Workflow:**
1. Write/edit content in Obsidian (dedicated Website vault)
2. Trigger `publish.sh` via Obsidian Shellcommands plugin (or terminal)
3. Script runs `hugo build` locally
4. Script rsyncs `public/` to homelab
5. Nginx serves updated files immediately (no container restart needed)

**publish.sh:**
```bash
#!/bin/bash
set -e

SITE_DIR="$HOME/Documents/Obsidian/Website"
REMOTE_HOST="homelab"  # SSH config alias
REMOTE_PATH="/srv/website/public"

cd "$SITE_DIR"

echo "Building site..."
hugo --minify

echo "Deploying to homelab..."
rsync -avz --delete public/ "$REMOTE_HOST:$REMOTE_PATH/"

echo "✓ Published to roelvanderven.com"
```

**Why no GitHub Actions:**
- Zero external dependencies
- Instant publish (no CI queue wait)
- Works offline (build locally, deploy when connected)
- Full control over timing
- Repository still pushed to GitHub for backup/version control

**Obsidian Shellcommands setup:**
- Install Shellcommands community plugin
- Create command: `bash ~/Documents/Obsidian/Website/publish.sh`
- Assign hotkey (e.g., `Cmd+Shift+P` for Publish)
- Optional: Use Obsidian Git plugin for version control (separate from deploy)

### 8.4 Content Management

**Vault structure (also Hugo project root):**
```
~/Documents/Obsidian/Website/
├── .obsidian/              # Obsidian config (gitignored)
├── content/
│   ├── posts/
│   │   └── 2026-01-21-my-article.md
│   ├── screenshots/
│   │   └── 2026-01-20-blade-runner.md
│   ├── photos/
│   │   ├── berlin-fireworks-2024.md        # type: photography
│   │   └── roel-van-der-ven-at-tape-tv.md  # type: cameo
│   ├── about.md
│   └── now.md
├── static/
│   └── images/
│       ├── posts/          # Article images
│       ├── screenshots/    # Screenshot images
│       └── photos/         # All photo images (photography + cameo)
├── themes/
│   └── roelvanderven/      # Custom theme
├── hugo.toml
├── publish.sh
└── README.md
```

**Authoring workflow:**
1. Open Website vault in Obsidian
2. Create new file in appropriate `content/` subfolder
3. Add frontmatter (use Obsidian template)
4. Write content in markdown
5. Add images to `static/images/`
6. Preview with `hugo server` (optional)
7. Publish via Shellcommands hotkey

---

## 9. Design Specifications

### 9.1 Visual Design Principles

1. **Typography-first:** Let text breathe, generous line height, comfortable measure
2. **Minimal decoration:** No unnecessary graphics, borders, or embellishments
3. **High contrast:** Dark text on light background (with optional dark mode)
4. **Consistent spacing:** Use a spacing scale (4px, 8px, 16px, 24px, 32px, 48px)
5. **Restrained color:** Black/gray text, one accent color for links

### 9.2 Typography

**Font stack (system fonts for performance):**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;

/* Monospace for code */
font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, 
             Consolas, "Liberation Mono", monospace;
```

**Scale:**
- Body: 18px (1.125rem)
- H1: 2.25rem
- H2: 1.75rem
- H3: 1.375rem
- Small: 0.875rem
- Line height: 1.6 for body, 1.2 for headings

### 9.3 Color Palette

**Light mode:**
- Background: `#ffffff`
- Text primary: `#1a1a1a`
- Text secondary: `#666666`
- Accent (links): `#0066cc`
- Accent hover: `#004499`
- Code background: `#f5f5f5`
- Border: `#e0e0e0`

**Dark mode (optional, future):**
- Background: `#1a1a1a`
- Text primary: `#e0e0e0`
- Text secondary: `#999999`
- Accent (links): `#66b3ff`
- Code background: `#2d2d2d`

### 9.4 Layout

**Container:**
- Max-width: 680px for content (optimal reading measure)
- Max-width: 1200px for full-bleed images
- Padding: 16px mobile, 24px desktop

**Responsive breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 10. Content Migration

### 10.1 Existing Content

Identify and migrate:
- Any existing blog posts
- Projects documentation
- Professional writing samples

### 10.2 Initial Content Plan

For launch, prepare:
1. **About page** - Complete bio and background
2. **Now page** - Current focus (Spotify work, personal projects)
3. **3-5 seed articles** - Either new or migrated
4. **1-2 screenshots** - Demonstrate the format

---

## 11. Success Metrics

### 11.1 Launch Criteria

- [ ] All core pages implemented (Home, About, Now)
- [ ] Article, Screenshot, Photo templates working
- [ ] RSS feed valid and discoverable
- [ ] Lighthouse scores meet targets
- [ ] Mastodon integration functional (at least manual)
- [ ] Deployed to homelab Docker environment
- [ ] Domain configured and HTTPS active

### 11.2 Post-Launch Metrics

- RSS subscriber count (via feed proxy if desired)
- Mastodon engagement on cross-posts
- Publishing frequency target: 1 article every 2 months, bi-weekly screenshot

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Scope creep | High | Medium | Strict MVP focus, defer enhancements |
| Mastodon API changes | Low | Medium | Abstract integration, manual fallback |
| Homelab availability | Medium | High | Cloudflare caching, static resilience |
| Content creation inertia | Medium | High | Simple publishing workflow, low friction |

---

## 13. Timeline & Phases

### Phase 1: MVP (Target: 2 weeks)

- [ ] Choose SSG (Hugo or 11ty)
- [ ] Set up repository structure
- [ ] Implement base templates (Home, About, Now, Article)
- [ ] Configure build pipeline
- [ ] Deploy to homelab
- [ ] Write initial content
- [ ] Manual Mastodon workflow

### Phase 2: Enhancement (Target: +2 weeks)

- [ ] Screenshot and Photo templates
- [ ] Tag system
- [ ] Linkable headings
- [ ] External link markers
- [ ] RSS refinement
- [ ] Image optimization pipeline

### Phase 3: Automation (Target: +2 weeks)

- [ ] Automated Mastodon cross-posting
- [ ] Search functionality
- [ ] Dark mode (optional)
- [ ] Performance optimization

---

## 14. Open Questions

All major technical decisions have been resolved:

| Question | Decision |
|----------|----------|
| SSG choice | Hugo |
| Image hosting | In repository |
| CI/CD | Local build + rsync (no GitHub Actions) |
| Analytics | None |
| Domain | roelvanderven.com |
| Publishing cadence | ~1 article/2 months, bi-weekly screenshot |

**Remaining questions:**
1. **Theme:** Build custom from scratch, or adapt existing minimal Hugo theme?
2. **Mastodon instance:** Which instance for cross-posting? (social.lol, fosstodon, etc.)
3. **Migration scope:** Which content to migrate from current site?

---

## 15. Content Migration

### 15.1 Current Site Analysis

The existing roelvanderven.com content needs to be exported and migrated. 

**Migration scope:** Articles only (not feed items or ephemeral content)

**Export options depending on current platform:**

| Platform | Export Method |
|----------|---------------|
| WordPress | WP export XML → use `wordpress-to-hugo-exporter` plugin or `blog2md` |
| Ghost | JSON export → convert to Hugo markdown |
| Static HTML | Scrape with `wget` → convert manually or with pandoc |
| Markdown-based | Direct copy with frontmatter adjustment |

### 15.2 Migration Steps

1. **Export** current content (format TBD based on platform)
2. **Convert** to Hugo-compatible markdown with proper frontmatter
3. **Preserve URLs** where possible (configure Hugo slugs to match old URLs)
4. **Set up redirects** for any changed URLs (in Cloudflare or nginx)
5. **Migrate images** to `static/images/`
6. **Review and clean** each migrated post

### 15.3 URL Preservation

To avoid breaking existing links:
```toml
# hugo.toml
[permalinks]
  posts = '/posts/:slug/'
  # or match old URL structure:
  # posts = '/:year/:month/:slug/'
```

If old URLs can't be matched, create redirect rules in Cloudflare Pages Rules or nginx config.

---

## 16. Appendix

### A. Reference Sites

- https://stefanzweifel.dev - Clean layout, /now page, reading log
- https://seangoedecke.com - Minimal design, article focus
- https://blog.emilburzo.com - Hugo simplicity
- https://karolinaszczur.com - Typography, elegance
- https://danilafe.com/blog/blog_microfeatures - Linkable headings, external markers
- https://nownownow.com/about - /now page concept

### B. Technical Resources

- Hugo documentation: https://gohugo.io/documentation/
- Mastodon API: https://docs.joinmastodon.org/api/
- wordpress-export-to-markdown: https://github.com/lonekorean/wordpress-export-to-markdown

### C. Frontmatter Schema

**Article:**
```yaml
---
title: "Post Title"
date: 2026-01-21T10:00:00+01:00
lastmod: 2026-01-22T15:30:00+01:00  # optional
draft: false
tags: [product, strategy]
description: "Meta description for SEO"
image: "/images/posts/featured.jpg"  # optional, for OG/Twitter cards
mastodon_url: "https://social.lol/@roel/123456789"  # optional
---
```

**Screenshot:**
```yaml
---
title: "That moment in Blade Runner 2049"
date: 2026-01-20
tags: [movies, sci-fi]
screenshot_source: "Blade Runner 2049"
screenshot_link: "https://www.imdb.com/title/tt1856101/"
image: "/images/screenshots/blade-runner-2049-moment.jpg"
mastodon_url: "https://social.lol/@roel/123456790"
---
```

**Photography** (high-res photos by Roel):
```yaml
---
title: "Berlin Fireworks 2024"
date: 2024-12-31
type: photography
tags: [berlin, night, photography]
image: "/images/photos/berlin-fireworks-2024.jpg"
description: "New Year's Eve fireworks over Berlin"
location: "Berlin, Germany"  # optional
mastodon_url: "https://social.lol/@roel/123"  # optional
---

Optional longer caption or story about the photo.
```

**Cameo** (photos of Roel from web):
```yaml
---
title: "Roel van der Ven at tape.tv"
date: 2014-03-15
type: cameo
tags: [cameo]
image: "/images/photos/roel-van-der-ven-at-tape-tv.jpg"
alt: "Roel van der Ven at the tape.tv office in Berlin"
source_url: "https://www.instagram.com/p/xxxxx/"
source_name: "Instagram - @photographer"
---

Working at the tape.tv office in Berlin.
```

---

*Document version: 1.2 | Last updated: January 22, 2026*