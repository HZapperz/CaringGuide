import { Role, Experience } from "@prisma/client";
import { z } from "zod";

export const commonDetailsSchema = z.object({
  firstName: z.string().min(2).max(50),
  middleName: z.string().optional(),
  lastName: z.string().min(2).max(50),
  dob: z.coerce.date(),
  gender: z.string(),
  // contact info
  email: z.string().email(),
  phone: z.string(),
  // address info
  city: z.string(),
  country: z.string(),
  // patient info
  patientName: z.string(),
  relation: z.string(),
  condition: z.string(),
  synopsis: z.string(),
  experience: z.nativeEnum(Experience),
});

const menteeInformationSchema = z.object({
  role: z.literal(Role.MENTEE),
  patientName: z.string(),
  relation: z.string(),
  condition: z.string(),
  synopsis: z.string(),
  experience: z.nativeEnum(Experience),
});

const mentorInformationSchema = z.object({
  role: z.literal(Role.MENTOR),
  condition: z.string(),
  about: z.string(),
  experience: z.nativeEnum(Experience),
});

export const mentorOnboardingSchema = commonDetailsSchema.merge(
  mentorInformationSchema
);

export const menteeOnboardingSchema = commonDetailsSchema.merge(
  menteeInformationSchema
);

export const updateDetail = commonDetailsSchema.partial();

export const onBoardingSchema = z.union([
  menteeOnboardingSchema,
  mentorOnboardingSchema,
]);
