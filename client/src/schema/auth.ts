import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
    acceptedTerms: z.boolean().refine((data) => data === true, {
      message: "You must accept the terms and conditions",
      path: ["acceptTerms"],
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
