import { Role, Experience, Disease } from "@prisma/client";
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
  address1: z.string().min(2).max(100),
  address2: z.string().max(100).optional(),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  zip: z.string().min(2).max(100),
  country: z.string(),
  // patient info
  avatar: z.string().optional(),
  condition: z.nativeEnum(Disease),
  experience: z.nativeEnum(Experience),
});

const menteeInformationSchema = z.object({
  role: z.literal(Role.MENTEE),
  patientName: z.string(),
  relation: z.string(),
  synopsis: z.string(),
});

const mentorInformationSchema = z.object({
  role: z.literal(Role.MENTOR),
  about: z.string(),
  relation: z.string(),
  //lovedOneName: z.string().min(2).max(50),
  code: z.string().min(2).max(50),
  //synopsis: z.string(),
});

export const mentorOnboardingSchema = commonDetailsSchema.merge(
  mentorInformationSchema,
);

export const menteeOnboardingSchema = commonDetailsSchema.merge(
  menteeInformationSchema,
);

export const updateProfileSchema = z.union([
  mentorOnboardingSchema.partial(),
  menteeOnboardingSchema.partial(),
]);

export const onBoardingSchema = z.union([
  menteeOnboardingSchema,
  mentorOnboardingSchema,
]);
