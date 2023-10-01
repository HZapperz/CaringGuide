import { z } from "zod";
import {
  menteeOnboardingSchema,
  mentorOnboardingSchema,
  commonDetailsSchema,
} from "./onboarding";
import { Role } from "@prisma/client";

const password = z.string().min(6);

const adminOnboardingSchema = commonDetailsSchema.merge(
  z.object({
    role: z.literal(Role.ADMIN),
  }),
);

export const accountSchema = z.union([
  menteeOnboardingSchema.merge(
    z.object({
      password,
    }),
  ),
  mentorOnboardingSchema.merge(
    z.object({
      password,
    }),
  ),
  adminOnboardingSchema.merge(
    z.object({
      password,
    }),
  ),
]);

export const createAccountSchema = accountSchema;
export const updateAccountSchema = z.union([
  menteeOnboardingSchema.merge(
    z.object({
      password: password.optional(),
    }),
  ),
  mentorOnboardingSchema.merge(
    z.object({
      password: password.optional(),
    }),
  ),
  adminOnboardingSchema.merge(
    z.object({
      password: password.optional(),
    }),
  ),
]);

export const mutateSchema = z.union([createAccountSchema, updateAccountSchema]);
