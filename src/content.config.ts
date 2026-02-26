import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    author: z.string().default('Unknown'),
    tags: z.array(z.string()).default([]),
    tagSlugs: z.array(z.string()).default([]),
    authorSlug: z.string().optional(),
    draft: z.boolean().default(false),
    type: z.enum(['post', 'page']).default('post'),
    slug: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
