import isLoggedIn from "@/lib/isLoggedIn";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res, user) => {
  switch (req.method) {
    case "GET":
      {
        try {
          let userId = user.id;
          if (!userId || typeof userId !== "string") {
            return res
              .status(400)
              .json({ message: "Invalid or missing userId" });
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
      }
      break;

    case "POST":
      try {
        const { resourceId, isStarred, isLiked, isDisliked } = req.body;
        const userId = user.id;

        if (!userId || !resourceId) {
          return res
            .status(400)
            .json({ message: "userId and resourceId are required" });
        }

        const existingFavorite = await prisma.userFavourites.findFirst({
          where: {
            userId,
            resourceId,
          },
        });

        if (existingFavorite) {
          const updatedUserFavourite = await prisma.userFavourites.update({
            where: {
              id: existingFavorite.id,
            },
            data: {
              isStarred: isStarred,
              isLiked: isLiked,
              isDisliked: isDisliked,
            },
          });

          return res.status(200).json(updatedUserFavourite);
        }

        const createdUserFavourite = await prisma.userFavourites.create({
          data: {
            userId,
            resourceId,
            isStarred: isStarred || false,
            isLiked: isLiked || false,
            isDisliked: isDisliked || false,
          },
        });

        res.status(201).json(createdUserFavourite);
      } catch (error) {
        res.status(400).json({
          message: "Error creating or updating user favorite",
          error: error,
        });
      }

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
});
