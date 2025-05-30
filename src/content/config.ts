import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
    type:'content',
    schema: z.object({
        title:z.string(),
        descriptiveTitle:z.string(),
        description:z.string(),
        pubDate:z.date(),
        author:z.string(),
        authorURL:z.string().optional(),
        photographer:z.string().optional(),
        photographerURL:z.string().optional(),
        image:z.string(),
        images: z.array(
            z.object({
              src: z.string(),
              alt: z.string(),
            })
          ).optional(),
        tags:z.array(z.string()),
    })
});

export const collections = {
    post: postCollection,
};