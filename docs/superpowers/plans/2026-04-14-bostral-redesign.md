# bostral.com Redesign - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic 2023 consulting site with a personal hub showcasing Streaming Radar, Lens reports, MCP infrastructure, essays, and inbound advisory - all in the Lens visual language (inverted to light mode).

**Architecture:** Astro static site with content collections (JSON data files), i18n via route prefixes (/en/ for English, / for French), deployed on Vercel. Existing /essais/ HTML files kept as public assets. /call redirect page preserved and restyled.

**Tech Stack:** Astro 5, @astrojs/vercel adapter (static output), @astrojs/sitemap, self-hosted Space Grotesk + JetBrains Mono woff2 fonts, vanilla CSS (no Tailwind), GA4 with cookie consent.

---

## Why Astro

1. **Content/code separation**: Content collections enforce typed data files (JSON) separate from .astro components - exactly what the spec demands.
2. **Zero JS by default**: Static HTML output with no client runtime. Lighthouse performance 100.
3. **Built-in i18n**: Route prefix strategy with `defaultLocale: 'fr'`, `locales: ['fr', 'en']`.
4. **Vercel integration**: Already deployed on Vercel. `@astrojs/vercel` adapter handles static output + redirects.
5. **Public directory**: Existing /essais/ files can live in `public/essais/` unchanged.
6. **Sitemap plugin**: Auto-generates sitemap.xml from all routes.

## Migration from current site

The current site is vanilla HTML/CSS/JS deployed on Vercel (project `ludovicbostral`, org `team_xoM2n5jP665BY379auWbEyzw`). We keep the same Vercel project, same Git remote, same domain config. No DNS changes needed.

What changes:
- Root files (index.html, style.css, script.js) → replaced by Astro build output
- /call/index.html → public/call/index.html (kept as-is, restyled)
- /essais/ → public/essais/ (kept as-is, restyled later in a future pass)
- streaming-predictions-*.html → archived, 301 redirects added
- .vercel/ → kept, Vercel adapter handles deployment

## File Structure

```
/
├── astro.config.mjs           # Astro config with i18n, sitemap, vercel adapter
├── package.json
├── tsconfig.json
├── public/
│   ├── fonts/                 # Self-hosted woff2 files (9 files)
│   ├── call/index.html        # Cal.com redirect (preserved, restyled)
│   ├── essais/                # Existing essay HTML/CSS/JS/assets (copied as-is)
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/                # OG image, any static assets
├── src/
│   ├── layouts/
│   │   └── Base.astro         # HTML shell, fonts, meta, analytics, consent
│   ├── components/
│   │   ├── Header.astro       # Sticky header with nav + FR/EN switch
│   │   ├── Footer.astro       # Single-line footer
│   │   ├── Hero.astro
│   │   ├── Now.astro
│   │   ├── Reports.astro
│   │   ├── Writing.astro
│   │   ├── TrackRecord.astro
│   │   ├── Stack.astro
│   │   ├── Advisory.astro
│   │   ├── Contact.astro
│   │   └── CookieConsent.astro # GA4 consent banner
│   ├── content/
│   │   ├── config.ts          # Content collection schemas
│   │   ├── home/
│   │   │   ├── fr.json        # All FR section content
│   │   │   └── en.json        # All EN section content
│   │   └── pages/
│   │       ├── privacy-fr.md
│   │       ├── privacy-en.md
│   │       ├── terms-fr.md
│   │       └── terms-en.md
│   ├── pages/
│   │   ├── index.astro        # FR home (default locale)
│   │   ├── en/
│   │   │   └── index.astro    # EN home
│   │   ├── privacy.astro      # FR privacy
│   │   ├── terms.astro        # FR terms
│   │   └── en/
│   │       ├── privacy.astro  # EN privacy
│   │       └── terms.astro    # EN terms
│   ├── styles/
│   │   ├── fonts.css          # @font-face declarations
│   │   ├── variables.css      # CSS custom properties
│   │   ├── base.css           # Reset + base typography
│   │   └── components.css     # Section-specific styles
│   └── utils/
│       └── i18n.ts            # Helper to load content by locale
├── CLAUDE.md                  # Updated project instructions
└── README.md                  # Migration notes + setup instructions
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore` (update existing)

- [ ] **Step 1: Initialize Astro project**

```bash
cd /Users/ludovicbostral/ludovicbostral
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

If the directory is not empty, we'll need to handle it. Create in a temp location and move files:

```bash
cd /tmp && mkdir bostral-astro && cd bostral-astro
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

Then copy the scaffold files back.

- [ ] **Step 2: Set up package.json**

```json
{
  "name": "bostral-com",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.7.0",
    "@astrojs/vercel": "^8.1.0",
    "@astrojs/sitemap": "^3.3.0"
  }
}
```

- [ ] **Step 3: Configure Astro**

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.bostral.com',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    '/streaming-predictions-en.html': '/essais/2026-predictions/',
    '/streaming-predictions-fr.html': '/essais/2026-predictions/',
    '/streaming-predictions-es.html': '/essais/2026-predictions/',
    '/streaming-predictions-zh.html': '/essais/2026-predictions/',
  },
});
```

- [ ] **Step 4: Set up tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 5: Update .gitignore**

Append to existing .gitignore:
```
node_modules/
dist/
.astro/
```

- [ ] **Step 6: Install dependencies**

```bash
npm install
```

- [ ] **Step 7: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json .gitignore
git commit -m "chore: scaffold Astro project with Vercel adapter and i18n"
```

---

## Task 2: Fonts + CSS Foundation

**Files:**
- Create: `public/fonts/` (9 woff2 files)
- Create: `src/styles/fonts.css`
- Create: `src/styles/variables.css`
- Create: `src/styles/base.css`
- Create: `src/styles/components.css`

- [ ] **Step 1: Download fonts from lens.streaming-radar.com**

```bash
mkdir -p public/fonts
cd public/fonts
curl -sO https://lens.streaming-radar.com/fonts/SpaceGrotesk-Light.woff2
curl -sO https://lens.streaming-radar.com/fonts/SpaceGrotesk-Regular.woff2
curl -sO https://lens.streaming-radar.com/fonts/SpaceGrotesk-Medium.woff2
curl -sO https://lens.streaming-radar.com/fonts/SpaceGrotesk-SemiBold.woff2
curl -sO https://lens.streaming-radar.com/fonts/SpaceGrotesk-Bold.woff2
curl -sO https://lens.streaming-radar.com/fonts/JetBrainsMono-Light.woff2
curl -sO https://lens.streaming-radar.com/fonts/JetBrainsMono-Regular.woff2
curl -sO https://lens.streaming-radar.com/fonts/JetBrainsMono-Medium.woff2
```

Verify all 8 files downloaded (note: spec says 9 but there are 8 distinct files listed).

- [ ] **Step 2: Create fonts.css**

```css
/* src/styles/fonts.css */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3: Create variables.css**

```css
/* src/styles/variables.css */
:root {
  /* Palette - identical to Lens */
  --cream: #F0E4D0;
  --cream-light: #F5EDE1;
  --cream-dark: #E8D9C2;
  --navy: #1B2D3A;
  --navy-deep: #0F1C26;
  --navy-light: #2A4052;
  --terracotta: #A65D37;
  --terracotta-light: #C17A52;
  --gold: #D4A944;
  --gold-bright: #E8C84A;
  --copper: #B87333;
  --amber: #E8943A;
  --cyan: #2DD4BF;
  --success: #27AE60;
  --danger: #C0392B;

  /* Inverted mode mapping */
  --bg-page: var(--cream-light);
  --bg-card: var(--cream);
  --text-primary: var(--navy-deep);
  --text-secondary: var(--navy-light);
  --accent: var(--terracotta);
  --accent-secondary: var(--gold);
  --border: rgba(15, 28, 38, 0.12);
  --border-light: rgba(15, 28, 38, 0.08);

  /* Typography */
  --font-sans: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;

  /* Layout */
  --max-width-text: 680px;
  --max-width-grid: 1120px;
  --section-padding: 96px;
  --section-padding-mobile: 64px;
}
```

- [ ] **Step 4: Create base.css**

```css
/* src/styles/base.css */
@import './fonts.css';
@import './variables.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--text-primary);
  background-color: var(--bg-page);
}

h1 {
  font-weight: 600;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
}

h2 {
  font-weight: 500;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  line-height: 1.2;
  margin-bottom: 1rem;
}

h3 {
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.3;
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.mono {
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

img {
  max-width: 100%;
  height: auto;
}

.container {
  max-width: var(--max-width-grid);
  margin: 0 auto;
  padding: 0 24px;
}

.container--narrow {
  max-width: var(--max-width-text);
  margin: 0 auto;
  padding: 0 24px;
}

section {
  padding: var(--section-padding) 0;
}

@media (max-width: 768px) {
  section {
    padding: var(--section-padding-mobile) 0;
  }
}
```

- [ ] **Step 5: Create components.css (empty shell for now, filled per section)**

```css
/* src/styles/components.css */
/* Section-specific styles - added as components are built */
```

- [ ] **Step 6: Commit**

```bash
git add public/fonts/ src/styles/
git commit -m "feat: add self-hosted fonts and CSS foundation with Lens palette"
```

---

## Task 3: Content Data Files

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/home/fr.json`
- Create: `src/content/home/en.json`

- [ ] **Step 1: Create content collection config**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const homeCollection = defineCollection({
  type: 'data',
  schema: z.object({
    lang: z.enum(['fr', 'en']),
    meta: z.object({
      title: z.string(),
      description: z.string(),
    }),
    hero: z.object({
      h1Line1: z.string(),
      h1Line2: z.string(),
      subtitle: z.string(),
      micro: z.string(),
    }),
    now: z.object({
      title: z.string(),
      subtitle: z.string(),
      lastUpdated: z.string(),
      items: z.array(z.object({
        text: z.string(),
        date: z.string(),
      })),
    }),
    reports: z.object({
      title: z.string(),
      subtitle: z.string(),
      subtitleLink: z.string(),
      ctaText: z.string(),
      ctaUrl: z.string(),
      cards: z.array(z.object({
        status: z.enum(['LIVE', 'IN UPDATE', 'PIPELINE']),
        title: z.string(),
        pitch: z.string(),
        meta: z.string(),
        url: z.string(),
      })),
    }),
    writing: z.object({
      title: z.string(),
      essays: z.object({
        label: z.string(),
        items: z.array(z.object({
          title: z.string(),
          readUrl: z.string(),
          pdfUrl: z.string(),
          epubUrl: z.string(),
        })),
      }),
      newsletter: z.object({
        label: z.string(),
        text: z.string(),
        ctaText: z.string(),
        ctaUrl: z.string(),
      }),
      ludoTries: z.object({
        label: z.string(),
        text: z.string(),
        ctaText: z.string(),
        ctaUrl: z.string(),
      }),
    }),
    trackRecord: z.object({
      title: z.string(),
      maltLink: z.object({ text: z.string(), url: z.string() }),
      entries: z.array(z.object({
        period: z.string(),
        company: z.string(),
        role: z.string(),
        highlight: z.string(),
      })),
    }),
    stack: z.object({
      title: z.string(),
      intro: z.string(),
      items: z.array(z.object({
        name: z.string(),
        description: z.string(),
      })),
      mcpLink: z.object({ text: z.string(), url: z.string() }),
    }),
    advisory: z.object({
      title: z.string(),
      pillars: z.array(z.object({
        label: z.string(),
        text: z.string(),
      })),
      closing: z.string(),
    }),
    contact: z.object({
      title: z.string(),
      ctaText: z.string(),
      ctaUrl: z.string(),
      email: z.string(),
      linkedinText: z.string(),
      linkedinUrl: z.string(),
      newsletterText: z.string(),
      newsletterUrl: z.string(),
      location: z.string(),
    }),
    nav: z.object({
      now: z.string(),
      writing: z.string(),
      trackRecord: z.string(),
      stack: z.string(),
      contact: z.string(),
    }),
    footer: z.object({
      copyright: z.string(),
      privacy: z.string(),
      terms: z.string(),
    }),
  }),
});

export const collections = {
  home: homeCollection,
};
```

- [ ] **Step 2: Create FR content file**

```json
// src/content/home/fr.json
{
  "lang": "fr",
  "meta": {
    "title": "Ludovic Bostral - Streaming intelligence & advisory",
    "description": "Fondateur de Streaming Radar. Rapports d'intelligence, essais, et conseil en streaming et OTT."
  },
  "hero": {
    "h1Line1": "Je construis l'intelligence",
    "h1Line2": "du streaming.",
    "subtitle": "Fondateur de Streaming Radar. Rapports, donnees, outils et conseil pour l'industrie du streaming et de l'OTT.",
    "micro": "Nantes, France"
  },
  "now": {
    "title": "Now",
    "subtitle": "Ce sur quoi je travaille en ce moment.",
    "lastUpdated": "Derniere mise a jour avril 2026",
    "items": [
      {
        "text": "Publication du rapport Video Intelligence sur lens.streaming-radar.com",
        "date": "Q2 2026"
      },
      {
        "text": "Expansion de l'infrastructure MCP pour les donnees streaming",
        "date": "En cours"
      },
      {
        "text": "Essai en cours : economie de l'attention et plateformes sportives",
        "date": "Q2 2026"
      },
      {
        "text": "Newsletter Streaming Radar : couverture hebdomadaire de l'industrie",
        "date": "Hebdo"
      }
    ]
  },
  "reports": {
    "title": "Rapports d'intelligence",
    "subtitle": "Publies sur",
    "subtitleLink": "lens.streaming-radar.com",
    "ctaText": "Explorer sur Lens",
    "ctaUrl": "https://lens.streaming-radar.com",
    "cards": [
      {
        "status": "LIVE",
        "title": "Piracy Intelligence",
        "pitch": "Cartographie du piratage IPTV, sites de streaming illegal et ecosystemes de contrefacon a travers 50 pays.",
        "meta": "162 pages - 1 200+ datapoints - 85 sources",
        "url": "https://lens.streaming-radar.com/reports/piracy"
      },
      {
        "status": "LIVE",
        "title": "Sports Streaming Intelligence",
        "pitch": "Droits sportifs, strategies de distribution et modeles D2C des diffuseurs a travers les marches cles.",
        "meta": "148 pages - 900+ datapoints - 72 sources",
        "url": "https://lens.streaming-radar.com/reports/sports"
      },
      {
        "status": "IN UPDATE",
        "title": "Central & Eastern Europe",
        "pitch": "Paysage concurrentiel et dynamiques de marche du streaming en Europe centrale et orientale.",
        "meta": "134 pages - 800+ datapoints - 65 sources",
        "url": "https://lens.streaming-radar.com/reports/ce"
      },
      {
        "status": "PIPELINE",
        "title": "Africa Streaming Intelligence",
        "pitch": "Marches emergents, infrastructure mobile-first et strategies de contenu local en Afrique.",
        "meta": "En preparation - 40+ pays couverts",
        "url": "https://lens.streaming-radar.com/reports/africa"
      },
      {
        "status": "PIPELINE",
        "title": "Video Intelligence",
        "pitch": "Vue transversale : technologie video, CDN, encodage et infrastructure de diffusion a l'echelle.",
        "meta": "En preparation - publication Q2 2026",
        "url": "https://lens.streaming-radar.com/reports/vi"
      }
    ]
  },
  "writing": {
    "title": "Ecriture",
    "essays": {
      "label": "Essais long-form",
      "items": [
        {
          "title": "La France est-elle un pays de sport ?",
          "readUrl": "/essais/la-france-est-elle-un-pays-de-sport/",
          "pdfUrl": "/essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.pdf",
          "epubUrl": "/essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.epub"
        }
      ]
    },
    "newsletter": {
      "label": "Newsletter Streaming Radar",
      "text": "Couverture hebdomadaire de l'industrie du streaming : tendances, deals, et donnees.",
      "ctaText": "Lire sur streaming-radar.com",
      "ctaUrl": "https://www.streaming-radar.com"
    },
    "ludoTries": {
      "label": "Ludo Tries Things",
      "text": "Experimentations personnelles, outils, et reflexions hors du streaming.",
      "ctaText": "Bientot disponible",
      "ctaUrl": "TODO_LUDO_TRIES_THINGS_URL"
    }
  },
  "trackRecord": {
    "title": "25 ans dans le streaming",
    "maltLink": {
      "text": "CV detaille sur Malt",
      "url": "https://www.malt.fr/profile/ludovicbostral"
    },
    "entries": [
      {
        "period": "2023-present",
        "company": "Streaming Radar",
        "role": "Fondateur",
        "highlight": "Plateforme d'intelligence streaming : rapports, donnees, MCP, newsletter."
      },
      {
        "period": "2021-2023",
        "company": "TRACE+",
        "role": "CTO",
        "highlight": "Lancement de la plateforme SVOD afro-urbaine dans 40+ pays."
      },
      {
        "period": "2019-2021",
        "company": "Kessel",
        "role": "CTO",
        "highlight": "Plateforme SaaS de gestion de droits audiovisuels pour distributeurs."
      },
      {
        "period": "2017-2019",
        "company": "Pixagility",
        "role": "VP Engineering",
        "highlight": "Infrastructure cloud de transcodage et livraison video a grande echelle."
      },
      {
        "period": "2015-2017",
        "company": "Majelan",
        "role": "CTO",
        "highlight": "Application de decouverte de podcasts avec recommandation algorithmique."
      },
      {
        "period": "2014-2015",
        "company": "Afrostream",
        "role": "CTO & Co-fondateur",
        "highlight": "Premier service SVOD dedie au contenu afro dans les marches francophones."
      },
      {
        "period": "2001-2014",
        "company": "M6 Replay",
        "role": "Lead Developer puis Architecte",
        "highlight": "Construction et evolution de la plateforme de replay du groupe M6."
      }
    ]
  },
  "stack": {
    "title": "Ce qui fait tourner Streaming Radar",
    "intro": "L'intelligence streaming repose sur une combinaison de collecte automatisee, d'analyse structuree et de diffusion programmable.",
    "items": [
      { "name": "MCP Server", "description": "Acces programmatique a l'ensemble des donnees Streaming Radar via le protocole Model Context" },
      { "name": "Lens", "description": "Plateforme de publication des rapports avec visualisations interactives et export" },
      { "name": "Signal Engine", "description": "Veille automatisee sur 200+ sources, classement et promotion des signaux" },
      { "name": "Supabase", "description": "Backend PostgreSQL, Edge Functions, et stockage des datapoints" },
      { "name": "Astro + Vercel", "description": "Sites statiques performants pour la publication et la diffusion" },
      { "name": "Claude Code", "description": "Agent de developpement integre pour la construction et la maintenance de l'infrastructure" }
    ],
    "mcpLink": {
      "text": "Explorer le serveur MCP sur Lens",
      "url": "https://lens.streaming-radar.com/mcp"
    }
  },
  "advisory": {
    "title": "Comment je travaille avec les equipes",
    "pillars": [
      {
        "label": "DATA INTELLIGENCE",
        "text": "J'apporte les donnees de Streaming Radar directement dans vos processus de decision. Paysage concurrentiel, benchmarks tarifaires, dynamiques de piratage, donnees sportives : tout est structure, source et actualisable."
      },
      {
        "label": "PLAYBOOKS",
        "text": "Strategies de lancement, positionnement produit, architecture technique : je construis des playbooks actionnables adosses aux donnees, pas des decks generiques."
      },
      {
        "label": "FIELD EXPERIENCE",
        "text": "25 ans a construire et operer des plateformes de streaming, du replay M6 aux marches emergents. Je connais les contraintes reelles de livraison, d'echelle et de monetisation."
      }
    ],
    "closing": "Inbound uniquement. Par introduction ou via /call."
  },
  "contact": {
    "title": "Contact",
    "ctaText": "Reserver un appel",
    "ctaUrl": "/call",
    "email": "ludovic@streaming-radar.com",
    "linkedinText": "LinkedIn",
    "linkedinUrl": "https://linkedin.com/in/ludovicbostral",
    "newsletterText": "Newsletter",
    "newsletterUrl": "https://www.streaming-radar.com",
    "location": "Nantes, France"
  },
  "nav": {
    "now": "Now",
    "writing": "Ecriture",
    "trackRecord": "Parcours",
    "stack": "Stack",
    "contact": "Contact"
  },
  "footer": {
    "copyright": "2026 Ludovic Bostral",
    "privacy": "Confidentialite",
    "terms": "Mentions legales"
  }
}
```

- [ ] **Step 3: Create EN content file**

```json
// src/content/home/en.json
{
  "lang": "en",
  "meta": {
    "title": "Ludovic Bostral - Streaming intelligence & advisory",
    "description": "Founder of Streaming Radar. Intelligence reports, essays, and advisory for the streaming and OTT industry."
  },
  "hero": {
    "h1Line1": "I build streaming",
    "h1Line2": "intelligence.",
    "subtitle": "Founder of Streaming Radar. Reports, data, tools and advisory for the streaming and OTT industry.",
    "micro": "Nantes, France"
  },
  "now": {
    "title": "Now",
    "subtitle": "What I'm working on right now.",
    "lastUpdated": "Last updated April 2026",
    "items": [
      {
        "text": "Publishing the Video Intelligence report on lens.streaming-radar.com",
        "date": "Q2 2026"
      },
      {
        "text": "Expanding MCP infrastructure for streaming data",
        "date": "Ongoing"
      },
      {
        "text": "Essay in progress: attention economy and sports platforms",
        "date": "Q2 2026"
      },
      {
        "text": "Streaming Radar newsletter: weekly industry coverage",
        "date": "Weekly"
      }
    ]
  },
  "reports": {
    "title": "Intelligence reports",
    "subtitle": "Published on",
    "subtitleLink": "lens.streaming-radar.com",
    "ctaText": "Explore on Lens",
    "ctaUrl": "https://lens.streaming-radar.com",
    "cards": [
      {
        "status": "LIVE",
        "title": "Piracy Intelligence",
        "pitch": "Mapping IPTV piracy, illegal streaming sites and counterfeit ecosystems across 50 countries.",
        "meta": "162 pages - 1,200+ datapoints - 85 sources",
        "url": "https://lens.streaming-radar.com/reports/piracy"
      },
      {
        "status": "LIVE",
        "title": "Sports Streaming Intelligence",
        "pitch": "Sports rights, distribution strategies and D2C models of broadcasters across key markets.",
        "meta": "148 pages - 900+ datapoints - 72 sources",
        "url": "https://lens.streaming-radar.com/reports/sports"
      },
      {
        "status": "IN UPDATE",
        "title": "Central & Eastern Europe",
        "pitch": "Competitive landscape and streaming market dynamics in Central and Eastern Europe.",
        "meta": "134 pages - 800+ datapoints - 65 sources",
        "url": "https://lens.streaming-radar.com/reports/ce"
      },
      {
        "status": "PIPELINE",
        "title": "Africa Streaming Intelligence",
        "pitch": "Emerging markets, mobile-first infrastructure and local content strategies in Africa.",
        "meta": "In preparation - 40+ countries covered",
        "url": "https://lens.streaming-radar.com/reports/africa"
      },
      {
        "status": "PIPELINE",
        "title": "Video Intelligence",
        "pitch": "Cross-cutting view: video technology, CDN, encoding and delivery infrastructure at scale.",
        "meta": "In preparation - Q2 2026 publication",
        "url": "https://lens.streaming-radar.com/reports/vi"
      }
    ]
  },
  "writing": {
    "title": "Writing",
    "essays": {
      "label": "Long-form essays",
      "items": [
        {
          "title": "La France est-elle un pays de sport ?",
          "readUrl": "/essais/la-france-est-elle-un-pays-de-sport/",
          "pdfUrl": "/essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.pdf",
          "epubUrl": "/essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.epub"
        }
      ]
    },
    "newsletter": {
      "label": "Streaming Radar Newsletter",
      "text": "Weekly streaming industry coverage: trends, deals, and data.",
      "ctaText": "Read on streaming-radar.com",
      "ctaUrl": "https://www.streaming-radar.com"
    },
    "ludoTries": {
      "label": "Ludo Tries Things",
      "text": "Personal experiments, tools, and reflections beyond streaming.",
      "ctaText": "Coming soon",
      "ctaUrl": "TODO_LUDO_TRIES_THINGS_URL"
    }
  },
  "trackRecord": {
    "title": "25 years in streaming",
    "maltLink": {
      "text": "Detailed CV on Malt",
      "url": "https://www.malt.fr/profile/ludovicbostral"
    },
    "entries": [
      {
        "period": "2023-present",
        "company": "Streaming Radar",
        "role": "Founder",
        "highlight": "Streaming intelligence platform: reports, data, MCP, newsletter."
      },
      {
        "period": "2021-2023",
        "company": "TRACE+",
        "role": "CTO",
        "highlight": "Launched the afro-urban SVOD platform in 40+ countries."
      },
      {
        "period": "2019-2021",
        "company": "Kessel",
        "role": "CTO",
        "highlight": "SaaS platform for audiovisual rights management for distributors."
      },
      {
        "period": "2017-2019",
        "company": "Pixagility",
        "role": "VP Engineering",
        "highlight": "Cloud transcoding and video delivery infrastructure at scale."
      },
      {
        "period": "2015-2017",
        "company": "Majelan",
        "role": "CTO",
        "highlight": "Podcast discovery app with algorithmic recommendation."
      },
      {
        "period": "2014-2015",
        "company": "Afrostream",
        "role": "CTO & Co-founder",
        "highlight": "First SVOD service dedicated to afro content in francophone markets."
      },
      {
        "period": "2001-2014",
        "company": "M6 Replay",
        "role": "Lead Developer then Architect",
        "highlight": "Built and evolved the replay platform for the M6 broadcasting group."
      }
    ]
  },
  "stack": {
    "title": "What powers Streaming Radar",
    "intro": "Streaming intelligence relies on a combination of automated collection, structured analysis and programmable distribution.",
    "items": [
      { "name": "MCP Server", "description": "Programmatic access to all Streaming Radar data via the Model Context Protocol" },
      { "name": "Lens", "description": "Report publishing platform with interactive visualizations and export" },
      { "name": "Signal Engine", "description": "Automated monitoring across 200+ sources, signal ranking and promotion" },
      { "name": "Supabase", "description": "PostgreSQL backend, Edge Functions, and datapoint storage" },
      { "name": "Astro + Vercel", "description": "Performant static sites for publishing and distribution" },
      { "name": "Claude Code", "description": "Integrated development agent for building and maintaining the infrastructure" }
    ],
    "mcpLink": {
      "text": "Explore the MCP server on Lens",
      "url": "https://lens.streaming-radar.com/mcp"
    }
  },
  "advisory": {
    "title": "How I work with teams",
    "pillars": [
      {
        "label": "DATA INTELLIGENCE",
        "text": "I bring Streaming Radar data directly into your decision processes. Competitive landscape, pricing benchmarks, piracy dynamics, sports data: everything is structured, sourced and updatable."
      },
      {
        "label": "PLAYBOOKS",
        "text": "Launch strategies, product positioning, technical architecture: I build actionable playbooks backed by data, not generic decks."
      },
      {
        "label": "FIELD EXPERIENCE",
        "text": "25 years building and operating streaming platforms, from M6 replay to emerging markets. I know the real constraints of delivery, scale and monetization."
      }
    ],
    "closing": "Inbound only. By introduction or via /call."
  },
  "contact": {
    "title": "Get in touch",
    "ctaText": "Book a call",
    "ctaUrl": "/call",
    "email": "ludovic@streaming-radar.com",
    "linkedinText": "LinkedIn",
    "linkedinUrl": "https://linkedin.com/in/ludovicbostral",
    "newsletterText": "Newsletter",
    "newsletterUrl": "https://www.streaming-radar.com",
    "location": "Nantes, France"
  },
  "nav": {
    "now": "Now",
    "writing": "Writing",
    "trackRecord": "Track record",
    "stack": "Stack",
    "contact": "Contact"
  },
  "footer": {
    "copyright": "2026 Ludovic Bostral",
    "privacy": "Privacy",
    "terms": "Terms"
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/content/
git commit -m "feat: add i18n content data files for FR and EN home pages"
```

---

## Task 4: Base Layout + Cookie Consent

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/components/CookieConsent.astro`

- [ ] **Step 1: Create Base.astro layout**

```astro
---
// src/layouts/Base.astro
import '../styles/base.css';
import '../styles/components.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import CookieConsent from '../components/CookieConsent.astro';

interface Props {
  title: string;
  description: string;
  lang: 'fr' | 'en';
  canonical?: string;
}

const { title, description, lang, canonical } = Astro.props;
const canonicalUrl = canonical || new URL(Astro.url.pathname, Astro.site).href;
---
<!DOCTYPE html>
<html lang={lang}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
  <link rel="canonical" href={canonicalUrl}>

  <!-- Preload critical fonts -->
  <link rel="preload" href="/fonts/SpaceGrotesk-Regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/SpaceGrotesk-SemiBold.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:url" content={canonicalUrl}>
  <meta property="og:site_name" content="Ludovic Bostral">
  <meta property="og:image" content={new URL('/assets/og-image.png', Astro.site).href}>
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">

  <!-- Alternate language -->
  {lang === 'fr' ? (
    <link rel="alternate" hreflang="en" href={new URL('/en' + Astro.url.pathname, Astro.site).href}>
    <link rel="alternate" hreflang="fr" href={canonicalUrl}>
  ) : (
    <link rel="alternate" hreflang="fr" href={new URL(Astro.url.pathname.replace('/en', ''), Astro.site).href}>
    <link rel="alternate" hreflang="en" href={canonicalUrl}>
  )}
</head>
<body>
  <Header lang={lang} />
  <main>
    <slot />
  </main>
  <Footer lang={lang} />
  <CookieConsent lang={lang} />
</body>
</html>
```

- [ ] **Step 2: Create CookieConsent.astro**

```astro
---
// src/components/CookieConsent.astro
interface Props {
  lang: 'fr' | 'en';
}
const { lang } = Astro.props;
const text = {
  fr: {
    message: 'Ce site utilise Google Analytics pour mesurer l\'audience.',
    accept: 'Accepter',
    refuse: 'Refuser',
  },
  en: {
    message: 'This site uses Google Analytics to measure audience.',
    accept: 'Accept',
    refuse: 'Decline',
  },
};
const t = text[lang];
---
<div id="cookie-consent" class="cookie-consent" style="display:none;">
  <p class="cookie-consent__text">{t.message}</p>
  <div class="cookie-consent__actions">
    <button id="cookie-accept" class="cookie-consent__btn cookie-consent__btn--accept">{t.accept}</button>
    <button id="cookie-refuse" class="cookie-consent__btn cookie-consent__btn--refuse">{t.refuse}</button>
  </div>
</div>

<script is:inline define:vars={{ GA_ID: 'G-VXBFRGGZV3' }}>
(function() {
  var consent = localStorage.getItem('analytics-consent');
  if (consent === null) {
    document.getElementById('cookie-consent').style.display = 'flex';
  } else if (consent === 'accepted') {
    loadGA();
  }

  document.getElementById('cookie-accept')?.addEventListener('click', function() {
    localStorage.setItem('analytics-consent', 'accepted');
    document.getElementById('cookie-consent').style.display = 'none';
    loadGA();
  });

  document.getElementById('cookie-refuse')?.addEventListener('click', function() {
    localStorage.setItem('analytics-consent', 'refused');
    document.getElementById('cookie-consent').style.display = 'none';
  });

  function loadGA() {
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);
  }
})();
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/ src/components/CookieConsent.astro
git commit -m "feat: add base layout with meta tags, font preloads, and cookie consent"
```

---

## Task 5: Header + Footer Components

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/styles/components.css`

- [ ] **Step 1: Create Header.astro**

```astro
---
// src/components/Header.astro
interface Props {
  lang: 'fr' | 'en';
}
const { lang } = Astro.props;

// Import content for nav labels
const content = lang === 'fr'
  ? await import('../content/home/fr.json')
  : await import('../content/home/en.json');
const nav = content.default?.nav || content.nav;
---
<header class="site-header" id="site-header">
  <div class="container site-header__inner">
    <a href={lang === 'fr' ? '/' : '/en/'} class="site-header__logo">LUDOVIC BOSTRAL</a>
    <nav class="site-header__nav">
      <a href={`${lang === 'fr' ? '' : '/en'}/#now`}>{nav.now}</a>
      <a href={`${lang === 'fr' ? '' : '/en'}/#writing`}>{nav.writing}</a>
      <a href={`${lang === 'fr' ? '' : '/en'}/#track-record`}>{nav.trackRecord}</a>
      <a href={`${lang === 'fr' ? '' : '/en'}/#stack`}>{nav.stack}</a>
      <a href={`${lang === 'fr' ? '' : '/en'}/#contact`}>{nav.contact}</a>
    </nav>
    <a href={lang === 'fr' ? '/en/' : '/'} class="site-header__lang">
      {lang === 'fr' ? 'EN' : 'FR'}
    </a>
  </div>
</header>

<script is:inline>
(function() {
  var header = document.getElementById('site-header');
  var scrolled = false;
  window.addEventListener('scroll', function() {
    var isScrolled = window.scrollY > 10;
    if (isScrolled !== scrolled) {
      scrolled = isScrolled;
      header.classList.toggle('site-header--scrolled', scrolled);
    }
  }, { passive: true });
})();
</script>
```

- [ ] **Step 2: Create Footer.astro**

```astro
---
// src/components/Footer.astro
interface Props {
  lang: 'fr' | 'en';
}
const { lang } = Astro.props;

const content = lang === 'fr'
  ? await import('../content/home/fr.json')
  : await import('../content/home/en.json');
const footer = content.default?.footer || content.footer;
const privacyPath = lang === 'fr' ? '/privacy/' : '/en/privacy/';
const termsPath = lang === 'fr' ? '/terms/' : '/en/terms/';
---
<footer class="site-footer">
  <div class="container">
    <p class="mono">
      &copy; {footer.copyright} &middot; Nantes, France &middot;
      <a href={privacyPath}>{footer.privacy}</a> &middot;
      <a href={termsPath}>{footer.terms}</a>
    </p>
  </div>
</footer>
```

- [ ] **Step 3: Add header + footer styles to components.css**

```css
/* src/styles/components.css */

/* ==================== HEADER ==================== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg-page);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.site-header--scrolled {
  border-bottom-color: var(--border-light);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.site-header__logo {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.9375rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-primary);
  text-decoration: none;
}

.site-header__logo:hover {
  text-decoration: none;
}

.site-header__nav {
  display: flex;
  gap: 32px;
}

.site-header__nav a {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-secondary);
  text-decoration: none;
}

.site-header__nav a:hover {
  color: var(--accent);
  text-decoration: underline;
}

.site-header__lang {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 4px 12px;
  text-decoration: none;
}

.site-header__lang:hover {
  color: var(--accent);
  border-color: var(--accent);
  text-decoration: none;
}

/* Mobile header */
@media (max-width: 768px) {
  .site-header__nav {
    display: none;
  }
}

/* ==================== FOOTER ==================== */
.site-footer {
  padding: 32px 0;
  border-top: 1px solid var(--border);
}

.site-footer p {
  text-align: center;
  color: var(--text-secondary);
}

.site-footer a {
  color: var(--text-secondary);
}

.site-footer a:hover {
  color: var(--accent);
}

/* ==================== COOKIE CONSENT ==================== */
.cookie-consent {
  position: fixed;
  bottom: 24px;
  left: 24px;
  right: 24px;
  max-width: 480px;
  background: var(--navy-deep);
  color: var(--cream-light);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 200;
  border: 1px solid var(--navy-light);
}

.cookie-consent__text {
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.cookie-consent__actions {
  display: flex;
  gap: 8px;
}

.cookie-consent__btn {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 16px;
  border: 1px solid;
  cursor: pointer;
  background: none;
}

.cookie-consent__btn--accept {
  background: var(--cream-light);
  color: var(--navy-deep);
  border-color: var(--cream-light);
}

.cookie-consent__btn--refuse {
  color: var(--cream-light);
  border-color: var(--navy-light);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro src/styles/components.css
git commit -m "feat: add sticky header with nav, footer, and cookie consent styles"
```

---

## Task 6: Home Page Sections (Hero, Now, Reports)

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/Now.astro`
- Create: `src/components/Reports.astro`
- Modify: `src/styles/components.css`

- [ ] **Step 1: Create Hero.astro**

```astro
---
// src/components/Hero.astro
interface Props {
  h1Line1: string;
  h1Line2: string;
  subtitle: string;
  micro: string;
}
const { h1Line1, h1Line2, subtitle, micro } = Astro.props;
---
<section class="hero">
  <div class="container">
    <h1 class="hero__title">
      {h1Line1}<br>
      <span class="hero__title--light">{h1Line2}</span>
    </h1>
    <p class="hero__subtitle">{subtitle}</p>
    <p class="hero__micro mono">{micro}</p>
  </div>
</section>
```

- [ ] **Step 2: Create Now.astro**

```astro
---
// src/components/Now.astro
interface Props {
  title: string;
  subtitle: string;
  lastUpdated: string;
  items: Array<{ text: string; date: string }>;
}
const { title, subtitle, lastUpdated, items } = Astro.props;
---
<section id="now" class="now">
  <div class="container container--narrow">
    <h2>{title}</h2>
    <p class="now__subtitle">{subtitle}</p>
    <ul class="now__list">
      {items.map(item => (
        <li class="now__item">
          <span class="now__item-text">{item.text}</span>
          <span class="now__item-date mono">{item.date}</span>
        </li>
      ))}
    </ul>
    <p class="now__updated mono">{lastUpdated}</p>
  </div>
</section>
```

- [ ] **Step 3: Create Reports.astro**

```astro
---
// src/components/Reports.astro
interface Props {
  title: string;
  subtitle: string;
  subtitleLink: string;
  ctaText: string;
  ctaUrl: string;
  cards: Array<{
    status: string;
    title: string;
    pitch: string;
    meta: string;
    url: string;
  }>;
}
const { title, subtitle, subtitleLink, ctaText, ctaUrl, cards } = Astro.props;

function statusClass(status: string) {
  if (status === 'LIVE') return 'status--live';
  if (status === 'IN UPDATE') return 'status--update';
  return 'status--pipeline';
}
---
<section id="reports" class="reports">
  <div class="container">
    <h2>{title}</h2>
    <p class="reports__subtitle">
      {subtitle} <a href={ctaUrl}>{subtitleLink}</a>
    </p>
    <div class="reports__grid">
      {cards.map(card => (
        <article class="report-card">
          <span class={`report-card__status mono ${statusClass(card.status)}`}>{card.status}</span>
          <h3 class="report-card__title">{card.title}</h3>
          <p class="report-card__pitch">{card.pitch}</p>
          <p class="report-card__meta mono">{card.meta}</p>
          <a href={card.url} class="report-card__link">Read on Lens &rarr;</a>
        </article>
      ))}
    </div>
    <div class="reports__cta">
      <a href={ctaUrl} class="btn-outline">{ctaText}</a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add Hero, Now, Reports styles to components.css**

Append to `src/styles/components.css`:

```css
/* ==================== HERO ==================== */
.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 120px 0 var(--section-padding);
}

.hero__title--light {
  color: var(--text-secondary);
}

.hero__subtitle {
  max-width: var(--max-width-text);
  margin-top: 24px;
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.hero__micro {
  margin-top: 16px;
  color: var(--text-secondary);
}

/* ==================== NOW ==================== */
.now__subtitle {
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.now__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.now__item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding-left: 20px;
  position: relative;
}

.now__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
}

.now__item-text {
  flex: 1;
}

.now__item-date {
  color: var(--text-secondary);
  white-space: nowrap;
}

.now__updated {
  margin-top: 32px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .now__item {
    flex-direction: column;
    gap: 4px;
  }
}

/* ==================== REPORTS ==================== */
.reports__subtitle {
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.reports__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.report-card {
  border: 1px solid var(--border);
  background: var(--bg-card);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.report-card__status {
  font-size: 0.75rem;
}

.status--live { color: var(--success); }
.status--update { color: var(--gold); }
.status--pipeline { color: var(--terracotta); }

.report-card__title {
  margin: 0;
}

.report-card__pitch {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  flex: 1;
}

.report-card__meta {
  color: var(--text-secondary);
}

.report-card__link {
  font-size: 0.9375rem;
}

.reports__cta {
  margin-top: 40px;
  text-align: center;
}

.btn-outline {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 12px 32px;
  border: 1px solid var(--accent);
  color: var(--accent);
}

.btn-outline:hover {
  background: var(--accent);
  color: var(--cream-light);
  text-decoration: none;
}

@media (max-width: 768px) {
  .reports__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/components/Now.astro src/components/Reports.astro src/styles/components.css
git commit -m "feat: add Hero, Now, and Reports section components"
```

---

## Task 7: Home Page Sections (Writing, TrackRecord, Stack, Advisory, Contact)

**Files:**
- Create: `src/components/Writing.astro`
- Create: `src/components/TrackRecord.astro`
- Create: `src/components/Stack.astro`
- Create: `src/components/Advisory.astro`
- Create: `src/components/Contact.astro`
- Modify: `src/styles/components.css`

- [ ] **Step 1: Create Writing.astro**

```astro
---
// src/components/Writing.astro
interface Props {
  title: string;
  essays: {
    label: string;
    items: Array<{ title: string; readUrl: string; pdfUrl: string; epubUrl: string }>;
  };
  newsletter: { label: string; text: string; ctaText: string; ctaUrl: string };
  ludoTries: { label: string; text: string; ctaText: string; ctaUrl: string };
}
const { title, essays, newsletter, ludoTries } = Astro.props;
---
<section id="writing" class="writing">
  <div class="container container--narrow">
    <h2>{title}</h2>

    <div class="writing__block">
      <p class="writing__label mono">{essays.label}</p>
      {essays.items.map(item => (
        <div class="writing__essay">
          <h3>{item.title}</h3>
          <div class="writing__essay-links">
            <a href={item.readUrl}>Read</a>
            <a href={item.pdfUrl}>PDF</a>
            <a href={item.epubUrl}>ePub</a>
          </div>
        </div>
      ))}
    </div>

    <div class="writing__block">
      <p class="writing__label mono">{newsletter.label}</p>
      <p>{newsletter.text}</p>
      <a href={newsletter.ctaUrl} class="writing__cta">{newsletter.ctaText} &rarr;</a>
    </div>

    <div class="writing__block">
      <p class="writing__label mono">{ludoTries.label}</p>
      <p>{ludoTries.text}</p>
      {ludoTries.ctaUrl !== 'TODO_LUDO_TRIES_THINGS_URL' ? (
        <a href={ludoTries.ctaUrl} class="writing__cta">{ludoTries.ctaText} &rarr;</a>
      ) : (
        <span class="writing__cta mono" style="color: var(--text-secondary)">{ludoTries.ctaText}</span>
      )}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create TrackRecord.astro**

```astro
---
// src/components/TrackRecord.astro
interface Props {
  title: string;
  maltLink: { text: string; url: string };
  entries: Array<{
    period: string;
    company: string;
    role: string;
    highlight: string;
  }>;
}
const { title, maltLink, entries } = Astro.props;
---
<section id="track-record" class="track-record">
  <div class="container container--narrow">
    <h2>{title}</h2>
    <div class="timeline">
      {entries.map(entry => (
        <div class="timeline__entry">
          <div class="timeline__marker"></div>
          <div class="timeline__content">
            <span class="timeline__date mono">{entry.period}</span>
            <span class="timeline__company">{entry.company}</span>
            <span class="timeline__role">{entry.role}</span>
            <p class="timeline__highlight">{entry.highlight}</p>
          </div>
        </div>
      ))}
    </div>
    <a href={maltLink.url} class="track-record__malt">{maltLink.text} &rarr;</a>
  </div>
</section>
```

- [ ] **Step 3: Create Stack.astro**

```astro
---
// src/components/Stack.astro
interface Props {
  title: string;
  intro: string;
  items: Array<{ name: string; description: string }>;
  mcpLink: { text: string; url: string };
}
const { title, intro, items, mcpLink } = Astro.props;
---
<section id="stack" class="stack-section">
  <div class="container container--narrow">
    <h2>{title}</h2>
    <p class="stack-section__intro">{intro}</p>
    <dl class="stack-section__list">
      {items.map(item => (
        <div class="stack-section__item">
          <dt class="mono">{item.name}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
    <a href={mcpLink.url} class="stack-section__link">{mcpLink.text} &rarr;</a>
  </div>
</section>
```

- [ ] **Step 4: Create Advisory.astro**

```astro
---
// src/components/Advisory.astro
interface Props {
  title: string;
  pillars: Array<{ label: string; text: string }>;
  closing: string;
}
const { title, pillars, closing } = Astro.props;

// Parse /call link in closing text
const closingHtml = closing.replace('/call', '<a href="/call">/call</a>');
---
<section id="advisory" class="advisory">
  <div class="container container--narrow">
    <h2>{title}</h2>
    {pillars.map(pillar => (
      <div class="advisory__pillar">
        <p class="advisory__label mono">{pillar.label}</p>
        <p class="advisory__text">{pillar.text}</p>
      </div>
    ))}
    <p class="advisory__closing" set:html={closingHtml} />
  </div>
</section>
```

- [ ] **Step 5: Create Contact.astro**

```astro
---
// src/components/Contact.astro
interface Props {
  title: string;
  ctaText: string;
  ctaUrl: string;
  email: string;
  linkedinText: string;
  linkedinUrl: string;
  newsletterText: string;
  newsletterUrl: string;
  location: string;
}
const props = Astro.props;
---
<section id="contact" class="contact">
  <div class="container container--narrow" style="text-align: center;">
    <h2>{props.title}</h2>
    <a href={props.ctaUrl} class="contact__cta">{props.ctaText}</a>
    <div class="contact__links">
      <a href={`mailto:${props.email}`}>{props.email}</a>
      <a href={props.linkedinUrl}>{props.linkedinText}</a>
      <a href={props.newsletterUrl}>{props.newsletterText}</a>
    </div>
    <p class="contact__location mono">{props.location}</p>
  </div>
</section>
```

- [ ] **Step 6: Add styles for Writing, TrackRecord, Stack, Advisory, Contact to components.css**

Append to `src/styles/components.css`:

```css
/* ==================== WRITING ==================== */
.writing__block {
  padding-top: 32px;
  border-top: 1px solid var(--border);
  margin-top: 32px;
}

.writing__block:first-of-type {
  margin-top: 24px;
}

.writing__label {
  color: var(--gold);
  margin-bottom: 16px;
}

.writing__essay h3 {
  margin-bottom: 8px;
}

.writing__essay-links {
  display: flex;
  gap: 16px;
  font-size: 0.9375rem;
}

.writing__cta {
  display: inline-block;
  margin-top: 8px;
}

/* ==================== TRACK RECORD ==================== */
.timeline {
  position: relative;
  padding-left: 28px;
  margin-top: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--terracotta);
}

.timeline__entry {
  position: relative;
  padding-bottom: 28px;
}

.timeline__entry:last-child {
  padding-bottom: 0;
}

.timeline__marker {
  position: absolute;
  left: -28px;
  top: 4px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--gold);
  border: 2px solid var(--bg-page);
}

.timeline__date {
  color: var(--gold);
  margin-right: 12px;
}

.timeline__company {
  font-weight: 600;
  margin-right: 12px;
}

.timeline__role {
  color: var(--text-secondary);
}

.timeline__highlight {
  margin-top: 4px;
  font-size: 0.9375rem;
}

.track-record__malt {
  display: inline-block;
  margin-top: 32px;
  font-size: 0.9375rem;
}

/* ==================== STACK ==================== */
.stack-section__intro {
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.stack-section__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stack-section__item {
  display: flex;
  gap: 16px;
  align-items: baseline;
}

.stack-section__item dt {
  min-width: 160px;
  color: var(--text-primary);
  flex-shrink: 0;
}

.stack-section__item dd {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.stack-section__link {
  display: inline-block;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .stack-section__item {
    flex-direction: column;
    gap: 4px;
  }

  .stack-section__item dt {
    min-width: auto;
  }
}

/* ==================== ADVISORY ==================== */
.advisory__pillar {
  margin-top: 32px;
}

.advisory__label {
  color: var(--gold);
  margin-bottom: 8px;
}

.advisory__text {
  color: var(--text-secondary);
}

.advisory__closing {
  margin-top: 40px;
  font-style: italic;
}

.advisory__closing a {
  font-style: normal;
}

/* ==================== CONTACT ==================== */
.contact {
  padding-bottom: 64px;
}

.contact__cta {
  display: inline-block;
  margin-top: 24px;
  padding: 16px 48px;
  background: var(--navy-deep);
  color: var(--cream-light);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
}

.contact__cta:hover {
  background: var(--navy-light);
  text-decoration: none;
}

.contact__links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  font-size: 0.9375rem;
}

.contact__location {
  margin-top: 16px;
  color: var(--text-secondary);
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/Writing.astro src/components/TrackRecord.astro src/components/Stack.astro src/components/Advisory.astro src/components/Contact.astro src/styles/components.css
git commit -m "feat: add Writing, TrackRecord, Stack, Advisory, and Contact sections"
```

---

## Task 8: Assemble Home Pages (FR + EN)

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/en/index.astro`
- Create: `src/utils/i18n.ts`

- [ ] **Step 1: Create i18n utility**

```typescript
// src/utils/i18n.ts
import frContent from '../content/home/fr.json';
import enContent from '../content/home/en.json';

export function getHomeContent(lang: 'fr' | 'en') {
  return lang === 'fr' ? frContent : enContent;
}
```

- [ ] **Step 2: Create FR home page (src/pages/index.astro)**

```astro
---
// src/pages/index.astro
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import Now from '../components/Now.astro';
import Reports from '../components/Reports.astro';
import Writing from '../components/Writing.astro';
import TrackRecord from '../components/TrackRecord.astro';
import Stack from '../components/Stack.astro';
import Advisory from '../components/Advisory.astro';
import Contact from '../components/Contact.astro';
import { getHomeContent } from '../utils/i18n';

const lang = 'fr';
const c = getHomeContent(lang);
---
<Base title={c.meta.title} description={c.meta.description} lang={lang}>
  <Hero h1Line1={c.hero.h1Line1} h1Line2={c.hero.h1Line2} subtitle={c.hero.subtitle} micro={c.hero.micro} />
  <Now title={c.now.title} subtitle={c.now.subtitle} lastUpdated={c.now.lastUpdated} items={c.now.items} />
  <Reports title={c.reports.title} subtitle={c.reports.subtitle} subtitleLink={c.reports.subtitleLink} ctaText={c.reports.ctaText} ctaUrl={c.reports.ctaUrl} cards={c.reports.cards} />
  <Writing title={c.writing.title} essays={c.writing.essays} newsletter={c.writing.newsletter} ludoTries={c.writing.ludoTries} />
  <TrackRecord title={c.trackRecord.title} maltLink={c.trackRecord.maltLink} entries={c.trackRecord.entries} />
  <Stack title={c.stack.title} intro={c.stack.intro} items={c.stack.items} mcpLink={c.stack.mcpLink} />
  <Advisory title={c.advisory.title} pillars={c.advisory.pillars} closing={c.advisory.closing} />
  <Contact title={c.contact.title} ctaText={c.contact.ctaText} ctaUrl={c.contact.ctaUrl} email={c.contact.email} linkedinText={c.contact.linkedinText} linkedinUrl={c.contact.linkedinUrl} newsletterText={c.contact.newsletterText} newsletterUrl={c.contact.newsletterUrl} location={c.contact.location} />
</Base>
```

- [ ] **Step 3: Create EN home page (src/pages/en/index.astro)**

```astro
---
// src/pages/en/index.astro
import Base from '../../layouts/Base.astro';
import Hero from '../../components/Hero.astro';
import Now from '../../components/Now.astro';
import Reports from '../../components/Reports.astro';
import Writing from '../../components/Writing.astro';
import TrackRecord from '../../components/TrackRecord.astro';
import Stack from '../../components/Stack.astro';
import Advisory from '../../components/Advisory.astro';
import Contact from '../../components/Contact.astro';
import { getHomeContent } from '../../utils/i18n';

const lang = 'en';
const c = getHomeContent(lang);
---
<Base title={c.meta.title} description={c.meta.description} lang={lang}>
  <Hero h1Line1={c.hero.h1Line1} h1Line2={c.hero.h1Line2} subtitle={c.hero.subtitle} micro={c.hero.micro} />
  <Now title={c.now.title} subtitle={c.now.subtitle} lastUpdated={c.now.lastUpdated} items={c.now.items} />
  <Reports title={c.reports.title} subtitle={c.reports.subtitle} subtitleLink={c.reports.subtitleLink} ctaText={c.reports.ctaText} ctaUrl={c.reports.ctaUrl} cards={c.reports.cards} />
  <Writing title={c.writing.title} essays={c.writing.essays} newsletter={c.writing.newsletter} ludoTries={c.writing.ludoTries} />
  <TrackRecord title={c.trackRecord.title} maltLink={c.trackRecord.maltLink} entries={c.trackRecord.entries} />
  <Stack title={c.stack.title} intro={c.stack.intro} items={c.stack.items} mcpLink={c.stack.mcpLink} />
  <Advisory title={c.advisory.title} pillars={c.advisory.pillars} closing={c.advisory.closing} />
  <Contact title={c.contact.title} ctaText={c.contact.ctaText} ctaUrl={c.contact.ctaUrl} email={c.contact.email} linkedinText={c.contact.linkedinText} linkedinUrl={c.contact.linkedinUrl} newsletterText={c.contact.newsletterText} newsletterUrl={c.contact.newsletterUrl} location={c.contact.location} />
</Base>
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/ src/utils/
git commit -m "feat: assemble FR and EN home pages with all sections"
```

---

## Task 9: Static Assets Migration + /call Restyle

**Files:**
- Move: existing essais/ to public/essais/
- Move: existing call/ to public/call/
- Move: existing assets/ to public/assets/
- Copy: favicon.ico to public/
- Create: `public/robots.txt`

- [ ] **Step 1: Move static assets to public/**

```bash
# Create public directory structure
mkdir -p public/essais public/assets

# Move essais (entire directory contents)
cp -r essais/* public/essais/

# Move call directory
cp -r call/* public/call/ 2>/dev/null || mkdir -p public/call && cp call/index.html public/call/

# Move assets
cp -r assets/* public/assets/

# Copy favicon
cp favicon.ico public/

# Copy existing robots.txt
cp robots.txt public/robots.txt
```

- [ ] **Step 2: Verify /call/index.html preserved in public/**

Read `public/call/index.html` and confirm it contains the Cal.com redirect with language detection. Do not modify the redirect logic.

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "feat: migrate static assets to public/ directory for Astro build"
```

---

## Task 10: Privacy + Terms Pages

**Files:**
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`
- Create: `src/pages/en/privacy.astro`
- Create: `src/pages/en/terms.astro`

- [ ] **Step 1: Create FR privacy page**

```astro
---
// src/pages/privacy.astro
import Base from '../layouts/Base.astro';
---
<Base title="Confidentialite - Ludovic Bostral" description="Politique de confidentialite" lang="fr">
  <section>
    <div class="container container--narrow">
      <h1>Politique de confidentialite</h1>
      <p>Ce site utilise Google Analytics (GA4) pour mesurer l'audience. Les donnees sont collectees de maniere anonyme et ne sont pas partagees avec des tiers. Vous pouvez refuser le suivi via la banniere de consentement.</p>
      <h2>Cookies</h2>
      <p>Seul un cookie de consentement analytique est utilise. Aucun cookie publicitaire ou de tracking tiers n'est present.</p>
      <h2>Contact</h2>
      <p>Pour toute question relative a la protection des donnees : <a href="mailto:ludovic@streaming-radar.com">ludovic@streaming-radar.com</a></p>
    </div>
  </section>
</Base>
```

- [ ] **Step 2: Create FR terms page**

```astro
---
// src/pages/terms.astro
import Base from '../layouts/Base.astro';
---
<Base title="Mentions legales - Ludovic Bostral" description="Mentions legales" lang="fr">
  <section>
    <div class="container container--narrow">
      <h1>Mentions legales</h1>
      <h2>Editeur</h2>
      <p>Ludovic Bostral<br>Nantes, France<br><a href="mailto:ludovic@streaming-radar.com">ludovic@streaming-radar.com</a></p>
      <h2>Hebergement</h2>
      <p>Vercel Inc.<br>340 S Lemon Ave #4133<br>Walnut, CA 91789, USA</p>
    </div>
  </section>
</Base>
```

- [ ] **Step 3: Create EN privacy and terms pages (same structure, English text)**

Create `src/pages/en/privacy.astro` and `src/pages/en/terms.astro` with English translations of the above.

- [ ] **Step 4: Commit**

```bash
git add src/pages/privacy.astro src/pages/terms.astro src/pages/en/privacy.astro src/pages/en/terms.astro
git commit -m "feat: add privacy and terms pages in FR and EN"
```

---

## Task 11: OG Image Generation

**Files:**
- Create: `public/assets/og-image.png`

- [ ] **Step 1: Generate OG image**

Create a 1200x630 PNG with:
- Background: #F5EDE1 (cream-light)
- Text: "Je construis l'intelligence du streaming." in #0F1C26 (navy-deep), Space Grotesk 600
- Small accent line in #D4A944 (gold) below the text
- "LUDOVIC BOSTRAL" in small mono at bottom

Use a canvas script or satori/sharp to generate this. If no image generation tool is available, create a minimal SVG and convert:

```bash
# If sharp is available via Node, generate programmatically
# Otherwise create a placeholder and note it for manual generation
```

- [ ] **Step 2: Commit**

```bash
git add public/assets/og-image.png
git commit -m "feat: add OG image for social sharing"
```

---

## Task 12: Clean Up Old Files + Redirects

**Files:**
- Delete: `index.html` (root - old site)
- Delete: `style.css` (root - old site)
- Delete: `script.js` (root - old site)
- Delete: `streaming-predictions-en.html` (and FR/ES/ZH)
- Delete: old sitemap.xml (Astro generates it)
- Keep: `scripts/build-essai.py` (essay build tool)
- Verify: `astro.config.mjs` redirects are correct

- [ ] **Step 1: Remove old site files**

```bash
# Remove old vanilla site files (they're replaced by Astro)
rm -f index.html style.css script.js
rm -f streaming-predictions-en.html streaming-predictions-fr.html streaming-predictions-es.html streaming-predictions-zh.html
rm -f predictions.css predictions.js
rm -f sitemap.xml
# Keep: robots.txt is now in public/, CLAUDE.md, README.md, scripts/, docs/
```

- [ ] **Step 2: Verify redirects in astro.config.mjs**

The redirects defined in Task 1 handle the streaming-predictions-*.html archive. Verify they work by checking the build output.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old vanilla site files, Astro replaces them"
```

---

## Task 13: Build + Verify

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: Clean build, static HTML in `dist/`.

- [ ] **Step 2: Preview locally**

```bash
npm run preview
```

Open http://localhost:4321 and verify:
- FR home loads at /
- EN home loads at /en/
- All 9 sections render correctly
- FR/EN switch works
- Header sticks on scroll
- Cookie consent appears
- /call redirects to Cal.com
- /essais/ loads the essay catalog
- /privacy and /terms load
- No old consulting strings visible

- [ ] **Step 3: Check acceptance criteria**

Run through each of the 12 acceptance criteria:
1. Lighthouse mobile >= 95 on 4 axes
2. Zero "Strategic Technology Consulting", "Fractional CTO", "Executive Placement", "1,000/day", "from €"
3. 5 report cards with correct statuses (2 LIVE, 1 IN UPDATE, 2 PIPELINE)
4. Timeline includes all 7 companies
5. FR/EN switch functional
6. No M6/Afrostream modals
7. Stack links to lens.streaming-radar.com/mcp
8. Zero "Kinza", "Lume-saudade", "TYPECAST", "IRL", "Les Veilleurs Felins", "Bienvenue a"
9. Advisory = single prose block per pillar
10. Mobile responsive (test with Chrome DevTools)
11. No em dashes in content
12. www -> apex redirect (handled by Vercel domain config)

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: address acceptance criteria issues found during verification"
```

---

## Task 14: Update CLAUDE.md + README.md

**Files:**
- Modify: `CLAUDE.md`
- Modify: `README.md`

- [ ] **Step 1: Update CLAUDE.md to reflect new Astro architecture**

Replace the current CLAUDE.md with updated project instructions reflecting:
- New tech stack (Astro + Vercel)
- New file structure
- New content editing workflow (edit JSON files)
- Updated section order
- Remove references to vanilla HTML/CSS/JS patterns

- [ ] **Step 2: Write README.md with migration notes**

Document:
- Why migration from vanilla to Astro (content/code separation, i18n routing, build pipeline)
- Local development setup (`npm install && npm run dev`)
- Content editing (edit `src/content/home/*.json`)
- Deployment (auto via Vercel on push to main)
- /call integration preserved
- /essais/ preserved as static assets

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md README.md
git commit -m "docs: update CLAUDE.md and README.md for Astro architecture"
```

---

## Verification Checklist (Self-Review)

**Spec coverage:**
- [x] Hero with two-line H1, subtitle, micro - Task 6
- [x] Now with 4 items, gold bullets, mono dates - Task 6
- [x] Reports with 5 cards, statuses, 2-col grid - Task 6
- [x] Writing with 3 sub-blocks, essay links - Task 7
- [x] Track Record with timeline, 7 entries - Task 7
- [x] Stack with mono list, MCP link - Task 7
- [x] Advisory with 3 pillars, prose only - Task 7
- [x] Contact with big CTA, 3 secondary links - Task 7
- [x] Footer single line - Task 5
- [x] Header sticky, logo left, nav right, FR/EN switch - Task 5
- [x] Fonts self-hosted - Task 2
- [x] CSS variables identical to Lens - Task 2
- [x] GA4 with cookie consent, ContentSquare removed - Task 4
- [x] /call preserved - Task 9
- [x] /essais/ preserved - Task 9
- [x] Redirects for streaming-predictions-*.html - Task 1
- [x] Privacy + Terms pages - Task 10
- [x] OG image - Task 11
- [x] i18n FR/EN with route prefixes - Task 1, 8
- [x] Content separated from rendering (JSON files) - Task 3
- [x] sitemap.xml auto-generated - Task 1 (plugin)
- [x] robots.txt - Task 9

**Placeholder scan:** No TBD/TODO in code. One intentional `TODO_LUDO_TRIES_THINGS_URL` per spec.

**Type consistency:** All component props match JSON schema. Nav labels in Header match content file keys.
