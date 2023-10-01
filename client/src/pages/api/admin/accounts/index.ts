import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { paginationSchema } from "@/schema/common";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/env.mjs";
import { createAccountSchema } from "@/schema/accounts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case "GET": {
        const { skip, take } = paginationSchema.parse(req.query);

        const [items, count] = await prisma.$transaction([
          prisma.profile.findMany({
            skip,
            take,
          }),
          prisma.profile.count({}),
        ]);

        return res.json({
          items,
          pageCount: Math.ceil(count / take),
        });
      }

      case "POST": {
        const { password, ...data } = createAccountSchema.parse(req.body);

        const supabase = createPagesServerClient(
          {
            req,
            res,
          },
          {
            supabaseKey: env.NEXT_SUPABASE_SERVICE_KEY,
            supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
          },
        );

        const { data: supaData, error } = await supabase.auth.admin.createUser({
          email: data.email,
          password,
        });

        if (error) {
          return res.status(400).json({
            message: error.message,
          });
        }

        if (supaData.user) {
          await prisma.profile.create({
            data: {
              id: supaData.user.id,
              ...data,
            },
          });
        }

        return res.status(200).json({
          message: "Account created",
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
