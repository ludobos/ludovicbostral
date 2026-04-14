import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const linkSchema = z.object({ text: z.string(), url: z.string() });

const home = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/home' }),
  schema: z.object({
    lang: z.enum(['fr', 'en']),
    meta: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      name: z.string(), tagline: z.string(), context: z.string(),
      ctaPrimary: linkSchema, ctaSecondary: linkSchema, location: z.string(),
    }),
    profile: z.object({
      title: z.string(), intro: z.string(), lensLink: linkSchema,
      careerTitle: z.string(),
      career: z.array(z.object({ period: z.string(), company: z.string(), role: z.string(), detail: z.string() })),
      also: z.string(),
      alsoLinks: z.array(linkSchema),
    }),
    contact: z.object({
      title: z.string(), ctaText: z.string(), ctaUrl: z.string(),
      email: z.string(), linkedinText: z.string(), linkedinUrl: z.string(), location: z.string(),
    }),
    nav: z.object({ reports: z.string(), reportsUrl: z.string(), contact: z.string() }),
    footer: z.object({ copyright: z.string(), privacy: z.string(), terms: z.string(), essais: z.string() }),
  }),
});

export const collections = { home };
