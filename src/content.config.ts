import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({pattern: '**/*.md', base: './src/posts/portfolio'}),
  schema: z.object({
    isDraft: z.boolean(),
    title: z.string(),
    description: z.string(),
    imageName: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    tags: z.array(z.string())
  })
});

const works = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/posts/work"}),
  schema: z.object({
    isDraft: z.boolean(),
    title: z.string(),
    description: z.string(),
    imageName: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    tags: z.array(z.string())
  })
})

export const collections = { portfolio, works };