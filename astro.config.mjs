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
