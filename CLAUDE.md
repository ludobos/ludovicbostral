# Claude Code Configuration

## Project Overview
Personal site for Ludovic Bostral, founder of Streaming Radar.
Compact one-pager (Hero + Profile + Contact) plus an About page, essays, and legal pages.
Positioning: personal brand / entity SEO hub — traffic destination is Lens and Streaming Radar.
Two languages: FR (default at /) and EN (at /en/).
Canonical host: https://www.bostral.com (bostral.com and ludovic.bostral.com redirect to it).

## Tech Stack
- **Framework**: Astro 5 (static output)
- **Hosting**: Vercel (project `ludovicbostral`)
- **CSS**: Vanilla CSS with custom properties (Lens palette, inverted light mode)
- **Fonts**: Self-hosted Space Grotesk + JetBrains Mono (woff2 in public/fonts/)
- **Analytics**: GA4 (G-VXBFRGGZV3) with cookie consent, no ContentSquare
- **Booking**: /call redirects to Cal.com with language detection

## File Structure
```
/
├── astro.config.mjs       # Astro config: i18n, sitemap, Vercel adapter, redirects
├── src/
│   ├── content/
│   │   └── home/
│   │       ├── fr.json    # All FR text content (edit here to change copy)
│   │       └── en.json    # All EN text content
│   ├── content.config.ts  # Content collection schema
│   ├── layouts/
│   │   └── Base.astro     # HTML shell, meta/OG/hreflang, Person+WebSite JSON-LD
│   ├── components/        # One .astro file per section
│   │   ├── Header.astro   # Sticky header with nav + FR/EN switch
│   │   ├── Footer.astro   # Single-line footer
│   │   ├── Hero.astro
│   │   ├── Profile.astro  # Intro, career timeline, award line, side notes
│   │   ├── Contact.astro
│   │   └── CookieConsent.astro
│   ├── pages/
│   │   ├── index.astro      # FR home
│   │   ├── a-propos.astro   # FR about (bio, distinctions, publications) + ProfilePage JSON-LD
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   └── en/
│   │       ├── index.astro  # EN home
│   │       ├── about.astro  # EN about
│   │       ├── privacy.astro
│   │       └── terms.astro
│   ├── styles/
│   │   ├── fonts.css      # @font-face declarations
│   │   ├── variables.css  # CSS custom properties (Lens palette)
│   │   ├── base.css       # Reset + typography
│   │   └── components.css # All section styles
│   └── utils/
│       └── i18n.ts        # Content loader helper
├── public/
│   ├── fonts/             # 8 woff2 files
│   ├── call/index.html    # Cal.com redirect (preserved from old site)
│   ├── essais/            # Essay HTML pages (preserved from old site)
│   ├── assets/            # OG image, favicons, logos
│   └── robots.txt
└── scripts/
    └── build-essai.py     # Essay build tool (Markdown to HTML)
```

## Key Patterns

### Content Editing
All text is in JSON data files, not in components:
- Edit `src/content/home/fr.json` for French content
- Edit `src/content/home/en.json` for English content
- Components import and render this data via props

### CSS Variables (Lens palette, inverted)
```css
--bg-page: var(--cream-light);    /* #F5EDE1 */
--text-primary: var(--navy-deep); /* #0F1C26 */
--accent: var(--terracotta);      /* #A65D37 */
--accent-secondary: var(--gold);  /* #D4A944 */
```

### Sections Order (home page)
1. Hero (name, tagline, CTAs)
2. Streaming Radar banner (link to Lens)
3. Profile (intro, career timeline, literary award line, side notes)
4. Contact (CTA + secondary links)

### SEO Invariants (do not regress)
- Canonical host everywhere: `https://www.bostral.com` (astro.config `site`, canonicals, JSON-LD `@id`s).
- `Base.astro` emits Person (`#person`, with `award`) + WebSite (`#website`) JSON-LD on every page.
- Subpages pass `alternateUrl` (cross-language hreflang) and optionally `extraLd` (page-level JSON-LD, e.g. ProfilePage on about pages) to `Base.astro`.
- `og:image` is `/assets/og-image.png` (1200×630 PNG — social crawlers don't render SVG). Regenerate from `og-image.svg` if the design changes.
- Sitemap is `sitemap-index.xml` (referenced in robots.txt); static essay URLs are listed in `customPages` in astro.config — add new essays there too.
- FR copy must be fully accented French.

## Common Tasks

### Change Text Content
Edit the corresponding JSON file in `src/content/home/`. No need to touch components.

### Add a New Section
1. Create `src/components/NewSection.astro`
2. Add styles in `src/styles/components.css`
3. Add data to both `fr.json` and `en.json`
4. Import and place in both `src/pages/index.astro` and `src/pages/en/index.astro`

### Add a New Essay
1. Place essay HTML/assets in `public/essais/[slug]/` (head must include title, description, canonical, OG + Twitter tags)
2. Link it from `public/essais/index.html`
3. Add its URL to sitemap `customPages` in `astro.config.mjs`

## Development
```bash
npm install        # Install dependencies
npm run dev        # Dev server at localhost:4321
npm run build      # Build static site
npm run preview    # Preview build locally
```

## Deployment
Auto-deployed on Vercel on push to main. Static output to `.vercel/output/static/`.

## Behavioral Guidelines

### 1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First
Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes
Touch only what you must. Clean up only your own mess.

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- Remove imports/variables/functions that YOUR changes made unused.
- Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution
Define success criteria. Loop until verified.

- Transform tasks into verifiable goals with concrete checks.
- For multi-step tasks, state a brief plan with verification steps.
- Strong success criteria let you loop independently. Weak criteria require clarification — ask upfront.

## External Links
- Lens: https://lens.streaming-radar.com
- MCP: https://lens.streaming-radar.com/mcp
- Newsletter: https://www.streaming-radar.com
- LinkedIn: https://linkedin.com/in/ludovicbostral
- Calendar: https://www.bostral.com/call
- Email: ludovic@streaming-radar.com
