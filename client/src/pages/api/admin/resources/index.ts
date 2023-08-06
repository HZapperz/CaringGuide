import { NextApiRequest, NextApiResponse } from "next";
import {
  createResourceSchema,
  deleteManyResourcesSchema,
} from "@/schema/resources";
import { prisma } from "@/lib/client";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import { paginationSchema } from "@/schema/common";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET": {
        const { skip, take } = paginationSchema.parse(req.query);

        const [items, count] = await prisma.$transaction([
          prisma.resources.findMany({
            skip,
            take,
          }),
          prisma.resources.count({}),
        ]);

        return res.json({
          items,
          pageCount: Math.ceil(count / take),
        });
      }

      case "POST": {
        const data = createResourceSchema.parse(req.body);

        const item = await prisma.resources.create({
          data: {
            title: data.title,
            sub: data.description,
            imgsrc: data.image,
            link: data.link,
            category: data.category,
          },
        });

        return res.json({
          item,
          message: "Resource created",
        });
      }

      case "DELETE": {
        const data = deleteManyResourcesSchema.parse(req.body);

        const { count } = await prisma.resources.deleteMany({
          where: {
            id: {
              in: data.ids,
            },
          },
        });

        return res.json({
          count,
          message: `${count} Resource(s) deleted.`,
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
