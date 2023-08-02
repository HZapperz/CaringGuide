import { z } from "zod";

export const resourcesSchema = z.object({
  imgsrc: z.string(),
  category: z.string(),
  title: z.string(),
  sub: z.string(),
  text: z.string(),
  link: z.string(),
  favorite: z.string(),
});
