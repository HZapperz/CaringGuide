import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/client";
import { updateAccountSchema } from "@/schema/accounts";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/env.mjs";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "PATCH": {
        const id = req.query.id as string;
        const data = updateAccountSchema.parse(req.body);
        const supabase = createPagesServerClient(
          {
            req,
            res,
          },
          {
            supabaseKey: env.NEXT_SUPABASE_SERVICE_KEY,
            supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
          }
        );

        if (data.password) {
          await supabase.auth.admin.updateUserById(id, {
            password: data.password,
          });
        }

        await prisma.profile.update({
          where: {
            id,
          },
          data,
        });

        return res.status(200).json({
          message: "Account updated",
        });
      }

      case "DELETE": {
        const id = req.query.id as string;
        const supabase = createPagesServerClient(
          {
            req,
            res,
          },
          {
            supabaseKey: env.NEXT_SUPABASE_SERVICE_KEY,
            supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
          }
        );

        await supabase.auth.admin.deleteUser(id);
        await prisma.profile.delete({
          where: {
            id,
          },
        });

        return res.status(200).json({
          message: "Account deleted",
        });
      }

      default: {
        return res.status(405).json({
          message: "Method Not Allowed",
        });
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: fromZodError(error).message,
      });
    } else {
      console.error(error);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}
