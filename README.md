# bostral.com

Personal site for Ludovic Bostral, founder of [Streaming Radar](https://www.streaming-radar.com).

## What this site does

Hub showcasing Streaming Radar's intelligence reports, long-form essays, MCP infrastructure, career timeline, and inbound advisory. Two languages: French (default) and English.

## Tech stack

- **Astro 5** - static site generator
- **Vercel** - hosting with automatic deploys from `main`
- **Vanilla CSS** - Lens palette (inverted light mode), self-hosted fonts
- **GA4** - analytics with cookie consent

## Migration from vanilla HTML

The site was previously a single-page vanilla HTML/CSS/JS site. It was rebuilt with Astro to:
- Separate content (JSON data files) from rendering (Astro components)
- Support i18n routing (/ for FR, /en/ for EN) instead of client-side language switching
- Generate sitemap automatically
- Get static HTML output with zero client JS by default

The `/call` booking redirect and `/essais/` essay pages are preserved as static files in `public/`.

## Development

```bash
npm install
npm run dev       # localhost:4321
npm run build     # static output to dist/
npm run preview   # preview build locally
```

## Content editing

All text content lives in JSON files, not in components:
- `src/content/home/fr.json` - French content
- `src/content/home/en.json` - English content

Edit these files to change any text on the site.

## Structure

See `CLAUDE.md` for the full file structure and conventions.
