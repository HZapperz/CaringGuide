import isLoggedIn from "@/lib/isLoggedIn";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res, user) => {
  try {
    switch (req.method) {
      case "GET": {
        const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;

        const mentee = await prisma.profile.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!mentee) {
          return res.status(404).json({
            message: "User not onboarded",
          });
        }

        const [bestMatch, countryMatch, conditionMatch, count] =
          await Promise.all([
            prisma.profile.findFirst({
              where: {
                role: "MENTOR",
                condition: mentee.condition,
                city: mentee.city,
                country: mentee.country,
              },
              skip,
            }),
            prisma.profile.findFirst({
              where: {
                role: "MENTOR",
                condition: mentee.condition,
                country: mentee.country,
              },
              skip,
            }),
            prisma.profile.findFirst({
              where: {
                role: "MENTOR",
                condition: mentee.condition,
              },
              skip,
            }),
            prisma.profile.count({
              where: {
                role: "MENTOR",
              },
            }),
          ]);

        let mentor = bestMatch ?? countryMatch ?? conditionMatch;

        if (!mentor) {
          mentor = await prisma.profile.findFirst({
            where: {
              role: "MENTOR",
            },
            skip,
          });
        }

        return res.status(200).json({
          mentor,
          count,
        });
      }

      case "POST": {
        const { mentorId } = req.body;

        const mentor = await prisma.profile.findFirst({
          where: {
            id: mentorId,
          },
        });

        if (!mentor) {
          return res.status(404).json({
            message: "Mentor Not Found",
          });
        }

        await prisma.mentorMenteeMatch.create({
          data: {
            menteeId: user.id,
            mentorId,
          },
        });

        return res.status(200).json({
          message: "Matched Successfully",
        });
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
