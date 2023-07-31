import { z } from "zod";

export const journalSchema = z.object({
  title: z.string(),
  description: z.string(),
});
