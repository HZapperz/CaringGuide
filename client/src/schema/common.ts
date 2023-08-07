import { z } from "zod";

export const paginationSchema = z.object({
  skip: z.coerce.number(),
  take: z.coerce.number().default(20),
});
