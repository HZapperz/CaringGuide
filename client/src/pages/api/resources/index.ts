import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const resources = await prisma.resources.findMany();
        res.status(200).json(resources);
      } catch (error) {
        res.status(500).json({
          message: "Error retrieving resources",
          error: error,
        });
      }
      break;
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
