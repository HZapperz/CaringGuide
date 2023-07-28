import { Experience, Role } from "@prisma/client";
import { z } from "zod";

const commonDetailsSchema = z.object({
  firstName: z.string().min(2).max(50),
  middleName: z.string().optional(),
  lastName: z.string().min(2).max(50),
  dob: z.coerce.date(),
  gender: z.string(),
  conditions: z.string().array(),
  experience: z.nativeEnum(Experience),

  email: z.string().email(),
  phone: z.string(),
});

const menteeInformationSchema = z.object({
  patientName: z.string(),
  relation: z.string(),
  synopsis: z.string(),
});

const mentorInformationSchema = z.object({
  about: z.string(),
});

export const mentorOnboardingSchema = z
  .object({
    role: z.literal(Role.MENTOR),
  })
  .merge(commonDetailsSchema)
  .merge(mentorInformationSchema);

export const menteeOnboardingSchema = z
  .object({
    role: z.literal(Role.MENTEE),
  })
  .merge(commonDetailsSchema)
  .merge(menteeInformationSchema);

export const onBoardingSchema = z.union([
  menteeOnboardingSchema,
  mentorOnboardingSchema,
]);
