// pages/api/lovedones/create.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const newLovedOne = await prisma.lovedOne.create({
        data: req.body,
      });
      res.status(201).json(newLovedOne);
    } catch (error) {
      res.status(500).json({ error: "Unable to create loved one" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
