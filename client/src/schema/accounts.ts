import { z } from "zod";
import {
  menteeOnboardingSchema,
  mentorOnboardingSchema,
  commonDetailsSchema,
} from "./onboarding";
import { Role } from "@prisma/client";

const password = z.string().min(6);

const adminOnboardingSchema = z
  .object({
    role: z.literal(Role.ADMIN),
  })
  .merge(commonDetailsSchema);

export const accountSchema = z.union([
  menteeOnboardingSchema.merge(
    z.object({
      password,
    })
  ),
  mentorOnboardingSchema.merge(
    z.object({
      password,
    })
  ),
  adminOnboardingSchema.merge(
    z.object({
      password,
    })
  ),
]);

export const createAccountSchema = accountSchema;
export const updateAccountSchema = accountSchema;
