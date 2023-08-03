import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const { id } = req.body;
        const resource = await prisma.resources.findUnique({
          where: {
            id: id,
          },
        });

        res.status(201).json(resource);
      } catch (error) {
        res.status(400).json({ message: "Invalid data", error: error });
      }
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
