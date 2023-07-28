import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const mentors = await prisma.mentor.findMany();
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch mentors" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
