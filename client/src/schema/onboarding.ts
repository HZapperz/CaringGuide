import { z } from "zod";

const personalSchema = z.object({
  firstName: z.string().min(2).max(50),
  middleName: z.string().optional(),
  lastName: z.string().min(2).max(50),
  dob: z.date(),
  gender: z.string(),
});

const contactDetailsSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
});

const patientInformationSchema = z.object({
  name: z.string(),
  condition: z.string(),
  relation: z.string(),
  experience: z.nativeEnum(Experience),
  synopsis: z.string(),
});

const mentorInformationSchema = z.object({
  condition: z.string(),
  experience: z.nativeEnum(Experience),
  about: z.string(),
});

export const onBoardingSchema = z.union([
  z.object({
    role: z.nativeEnum([Role.MENTEE]),
    personalSchema,
    contactDetailsSchema,
    patientInformationSchema,
  }),
  z.object({
    role: z.nativeEnum([Role.MENTOR]),
    personalSchema,
    contactDetailsSchema,
    mentorInformationSchema,
  }),
]);

export default onBoardingSchema;
