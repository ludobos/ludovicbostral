import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const essai = 'https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/';
const chapitres = ['1-definition', '2-densite', '3-puissance-collective', '4-desert-individuel', '5-france-forme', '6-calque-educatif', '7-comment-tweaker', '8-conclusion', 'bibliographie'];

export default defineConfig({
  site: 'https://www.bostral.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-US' } },
      customPages: [
        'https://www.bostral.com/essais/',
        essai,
        ...chapitres.map((c) => `${essai}${c}.html`),
      ],
    }),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    '/streaming-predictions-en.html': '/essais/',
    '/streaming-predictions-fr.html': '/essais/',
    '/streaming-predictions-es.html': '/essais/',
    '/streaming-predictions-zh.html': '/essais/',
  },
});
