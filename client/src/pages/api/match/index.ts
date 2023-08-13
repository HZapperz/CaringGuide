import isLoggedIn from "@/lib/isLoggedIn";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res, user) => {
  try {
    switch (req.method) {
      case "GET": {
        let match;

        match = await prisma.mentorMenteeMatch.findMany({
          where: {
            OR: [{ mentorId: user.id }, { menteeId: user.id }],
          },
        });

        if (match) {
          return res.status(200).json({
            message: "Match found!",
            match,
          });
        } else {
          return res.status(404).json({
            message: "No match found for the user.",
          });
        }
      }
      default:
        return res.status(405).json({
          message: "Method Not Allowed",
        });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
