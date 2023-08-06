import { z } from "zod";

export const resourceSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  image: z.string().url(),
  category: z.string(),
});

export const createResourceSchema = resourceSchema;

export const updateResourceSchema = resourceSchema.partial();

export const deleteManyResourcesSchema = z.object({
  ids: z.string().array().min(1),
});
