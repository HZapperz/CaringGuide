import { z } from "zod";

export const paginationSchema = z.object({
  skip: z.coerce.number().default(0),
  take: z.coerce.number().default(20),
});
