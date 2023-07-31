import isLoggedIn from "@/lib/isLoggedIn";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res, user) => {
  switch (req.method) {
    case "GET": {
      try {
        const userProfile = await prisma.profile.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!userProfile) {
          return res.status(404).json({
            message: "User profile not found!",
          });
        }

        return res.status(200).json(userProfile);
      } catch (error) {
        return res.status(500).json({
          message: "Error fetching user profile!",
          error: error,
        });
      }
    }

    default:
      return res.status(405).json({
        message: "Method not allowed for this endpoint.",
      });
  }
});
