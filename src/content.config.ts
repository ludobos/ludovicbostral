import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const home = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/home' }),
  schema: z.object({
    lang: z.enum(['fr', 'en']),
    meta: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({ h1Line1: z.string(), h1Line2: z.string(), subtitle: z.string(), micro: z.string() }),
    now: z.object({
      title: z.string(), subtitle: z.string(), lastUpdated: z.string(),
      items: z.array(z.object({ text: z.string(), date: z.string() })),
    }),
    reports: z.object({
      title: z.string(), subtitle: z.string(), subtitleLink: z.string(),
      ctaText: z.string(), ctaUrl: z.string(),
      cards: z.array(z.object({ status: z.string(), title: z.string(), pitch: z.string(), meta: z.string(), url: z.string() })),
    }),
    writing: z.object({
      title: z.string(),
      essays: z.object({ label: z.string(), items: z.array(z.object({ title: z.string(), readUrl: z.string(), pdfUrl: z.string(), epubUrl: z.string() })) }),
      newsletter: z.object({ label: z.string(), text: z.string(), ctaText: z.string(), ctaUrl: z.string() }),
      ludoTries: z.object({ label: z.string(), text: z.string(), ctaText: z.string(), ctaUrl: z.string() }),
    }),
    trackRecord: z.object({
      title: z.string(),
      maltLink: z.object({ text: z.string(), url: z.string() }),
      entries: z.array(z.object({ period: z.string(), company: z.string(), role: z.string(), highlight: z.string() })),
    }),
    stack: z.object({
      title: z.string(), intro: z.string(),
      items: z.array(z.object({ name: z.string(), description: z.string() })),
      mcpLink: z.object({ text: z.string(), url: z.string() }),
    }),
    advisory: z.object({
      title: z.string(),
      pillars: z.array(z.object({ label: z.string(), text: z.string() })),
      closing: z.string(),
    }),
    contact: z.object({
      title: z.string(), ctaText: z.string(), ctaUrl: z.string(),
      email: z.string(), linkedinText: z.string(), linkedinUrl: z.string(),
      newsletterText: z.string(), newsletterUrl: z.string(), location: z.string(),
    }),
    nav: z.object({ now: z.string(), writing: z.string(), trackRecord: z.string(), stack: z.string(), contact: z.string() }),
    footer: z.object({ copyright: z.string(), privacy: z.string(), terms: z.string() }),
  }),
});

export const collections = { home };
