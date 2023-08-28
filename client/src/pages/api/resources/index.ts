import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/client";
import isLoggedIn from "@/lib/isLoggedIn";
import { Disease } from "@prisma/client";

export default isLoggedIn(async function handler(req, res, user) {
  switch (req.method) {
    case "GET":
      try {
        const loggedInUser = await prisma.profile.findUnique({
          where: { id: user.id },
          select: { condition: true },
        });

        const resources = await prisma.resources.findMany({
          where: {
            OR: [
              { disease: loggedInUser?.condition || undefined },
              { category: "GENERAL", disease: "UNKNOWN" },
            ],
          },
          include: {
            favoritedBy: {
              select: {
                isDisliked: true,
                isLiked: true,
              },
            },
          },
        });
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
});
