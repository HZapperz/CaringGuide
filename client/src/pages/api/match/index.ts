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

        const [
          conditionMatch,
          genderMatch,
          relationshipMatch,
          locationMatch,
          ageMatch,
          count,
        ] = await Promise.all([
          // Priority 1: Match based on disease/condition
          prisma.profile.findFirst({
            where: {
              role: "MENTOR",
              condition: mentee.condition,
            },
            skip,
          }),
          // Priority 2: Match based on gender
          prisma.profile.findFirst({
            where: {
              role: "MENTOR",
              condition: mentee.condition,
              gender: mentee.gender,
            },
            skip,
          }),
          // Priority 3: Match based on relationship to loved one
          prisma.profile.findFirst({
            where: {
              role: "MENTOR",
              condition: mentee.condition,
              relationShipToPatient: mentee.relationShipToPatient,
            },
            skip,
          }),
          // Priority 4: Match based on location
          prisma.profile.findFirst({
            where: {
              role: "MENTOR",
              condition: mentee.condition,
              city: mentee.city,
              country: mentee.country,
            },
            skip,
          }),
          // Priority 5: Match based on age (you might need to adjust this to your needs)
          prisma.profile.findFirst({
            where: {
              role: "MENTOR",
              condition: mentee.condition,
              dob: {
                // For simplicity: Assuming a mentor and mentee with the same DOB are the same age
                // You can refine this further if needed
                equals: mentee.dob,
              },
            },
            skip,
          }),
          prisma.profile.count({
            where: {
              role: "MENTOR",
            },
          }),
        ]);

        let mentor =
          conditionMatch ??
          genderMatch ??
          relationshipMatch ??
          locationMatch ??
          ageMatch;

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
