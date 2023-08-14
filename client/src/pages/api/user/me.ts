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

        return res.json({
          ...profile,
          mentees: profile?.mentees.map((mentee) => mentee.mentee),
          mentor: profile?.mentor?.mentor,
          favoriteResources,
        });
      }

      case "PATCH": {
        const {
          firstName,
          middleName,
          lastName,
          location,
          state,
          about,
          avatar,
        } = req.body;

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
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            location: location,
            state: state,
            about: about,
            avatar: avatar,
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
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
});
