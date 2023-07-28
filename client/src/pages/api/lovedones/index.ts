// pages/api/lovedones/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const lovedOnes = await prisma.lovedOne.findMany();
      res.status(200).json(lovedOnes);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch loved ones" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
