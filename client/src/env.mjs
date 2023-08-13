import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXT_SUPABASE_SERVICE_KEY: z.string(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_SUPABASE_SERVICE_KEY: process.env.NEXT_SUPABASE_SERVICE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
});
