import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { resourcesSchema } from "@/schema/resources";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const data = resourcesSchema.parse(req.body);
        const createdResource = await prisma.resources.create({
          data: {
            imgsrc: data.imgsrc,
            category: data.category,
            title: data.title,
            sub: data.sub,
            text: data.text,
            link: data.link,
            favorite: data.favorite === "true",
          },
        });

        res.status(201).json(createdResource);
      } catch (error) {
        res.status(400).json({ message: "Invalid data", error: error });
      }
      break;
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
