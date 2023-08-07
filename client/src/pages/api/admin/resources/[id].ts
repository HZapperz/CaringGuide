import { NextApiRequest, NextApiResponse } from "next";
import { updateResourceSchema } from "@/schema/resources";
import { prisma } from "@/lib/client";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "PATCH": {
        const id = req.query.id as string;
        const data = updateResourceSchema.parse(req.body);

        await prisma.resources.update({
          where: {
            id,
          },
          data,
        });

        return res.status(200).json({
          message: "Resource updated",
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
