import { NextApiRequest, NextApiResponse } from "next";
import { resourceSchema } from "@/schema/resources";
import { prisma } from "@/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const data = resourceSchema.parse(req.body);

        const createdResource = await prisma.resources.create({
          data: {
            image: data.image,
            category: data.category,
            title: data.title,
            description: data.description,
            link: data.link,
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
