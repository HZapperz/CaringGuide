import { Category, Disease } from "@prisma/client";
import { z } from "zod";

export const resourceSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  image: z.string(),
  category: z.nativeEnum(Category),
  disease: z.nativeEnum(Disease),
});

export const createResourceSchema = resourceSchema;

export const updateResourceSchema = resourceSchema.partial();

export const deleteManyResourcesSchema = z.object({
  ids: z.string().array().min(1),
});
