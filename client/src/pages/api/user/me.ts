import isLoggedIn from "../../../lib/isLoggedIn";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res, user) => {
  try {
    switch (req.method) {
      case "GET": {
        const profile = await prisma.profile.findUnique({
          where: {
            id: user.id,
          },
        });

        return res.json(profile);
      }
      default:
        return res.status(405).json({
          message: "Method not allowed for this endpoint.",
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
});
