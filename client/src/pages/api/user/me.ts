import { updateProfileSchema } from "@/schema/onboarding";
import isLoggedIn from "../../../lib/isLoggedIn";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res, user) => {
  try {
    switch (req.method) {
      case "GET": {
        const [profile, favoriteResources] = await prisma.$transaction([
          prisma.profile.findUnique({
            where: {
              id: user.id,
            },
            include: {
              mentees: {
                include: {
                  mentee: true,
                },
              },
              mentor: {
                include: {
                  mentor: true,
                },
              },
              journals: true,
            },
          }),
          prisma.resources.findMany({
            where: {
              favoritedBy: {
                some: {
                  isStarred: true,
                  userId: user.id,
                },
              },
            },
          }),
        ]);

        if (!profile) {
          return res.json(null);
        }

        return res.json({
          ...profile,
          mentees: profile?.mentees.map((mentee) => mentee.mentee),
          mentor: profile?.mentor?.mentor,
          favoriteResources,
        });
      }

      case "PATCH": {
        const data = updateProfileSchema.parse(req.body);

        const existingProfile = await prisma.profile.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!existingProfile) {
          return res.status(404).json({
            message: "User profile not found.",
          });
        }

        await prisma.profile.update({
          where: {
            id: user.id,
          },
          data: {
            ...Object.fromEntries(
              Object.entries(data).filter(([key, _]) => key !== "relation")
            ),

            relationShipToPatient:
              data.role === "MENTEE" ? data.relation : null,
          },
        });

        return res.status(200).json({
          message: "Details updated successfully!",
        });
      }

      default:
        return res.status(405).json({
          message: "Method not allowed for this endpoint.",
        });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
});
