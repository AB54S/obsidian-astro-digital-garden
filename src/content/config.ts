import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.date(),
		summary: z.string().optional(),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
		image: z.string().optional(),
	}),
});

export const collections = { posts };
