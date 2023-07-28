// pages/api/profiles/delete.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await prisma.profile.delete({
        where: { id: String(id) },
      });
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Unable to delete profile" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
