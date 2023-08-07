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
      primaryEmail: z.string().email(),
    })
  ),
  mentorOnboardingSchema.merge(
    z.object({
      password,
      primaryEmail: z.string().email(),
    })
  ),
  adminOnboardingSchema.merge(
    z.object({
      password,
      primaryEmail: z.string().email(),
    })
  ),
]);

export const createAccountSchema = accountSchema;

export const updateAccountSchema = z.union([
  menteeOnboardingSchema.merge(
    z.object({
      password: password.optional(),
    })
  ),
  mentorOnboardingSchema.merge(
    z.object({
      password: password.optional(),
    })
  ),
  adminOnboardingSchema.merge(
    z.object({
      password: password.optional(),
    })
  ),
]);
