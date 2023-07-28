// pages/api/mentors/create.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const newMentor = await prisma.mentor.create({
        data: req.body,
      });
      res.status(201).json(newMentor);
    } catch (error) {
      res.status(500).json({ error: "Unable to create mentor" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
