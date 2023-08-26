import { z } from "zod";

export const createInviteCodeSchema = z.object({
  code: z.string(),
});

export const deleteManyInviteCodeSchema = z.object({
  codes: z.string().array().min(1),
});
