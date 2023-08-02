import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { userId } = req.query;

        if (!userId || typeof userId !== "string") {
          return res.status(400).json({ message: "Invalid or missing userId" });
        }

        const userFavorites = await prisma.userFavourites.findMany({
          where: {
            userId,
          },
        });

        res.status(200).json(userFavorites);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error retrieving user favorites", error: error });
      }
      break;

    case "POST":
      try {
        const { userId, resourceId, isStarred } = req.body;

        if (!userId || !resourceId) {
          return res
            .status(400)
            .json({ message: "userId and resourceId are required" });
        }

        const createdUserFavourite = await prisma.userFavourites.create({
          data: {
            userId,
            resourceId,
            isStarred: isStarred || false,
          },
        });

        res.status(201).json(createdUserFavourite);
      } catch (error) {
        res.status(400).json({
          message: "Error creating user favorite",
          error: error,
        });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
