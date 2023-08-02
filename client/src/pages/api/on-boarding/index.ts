import isLoggedIn from "@/lib/isLoggedIn";
import { onBoardingSchema } from "@/schema/onboarding";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res, user) => {
  switch (req.method) {
    case "POST": {
      const data = onBoardingSchema.parse(req.body);

      const existingProfile = await prisma.profile.findUnique({
        where: {
          id: user.id,
        },
      });

      console.log(existingProfile, user.id);

      if (existingProfile) {
        return res.status(409).json({
          message: "User profile already exists!",
        });
      }

      await prisma.profile.create({
        data: {
          id: user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          dob: data.dob,
          role: data.role,
          email: data.role,
          gender: data.role,
          phone: data.phone,
          experience: data.experience,
          condition: data.condition,
          about: data.role === "MENTOR" ? data.about : undefined,
          synopsis: data.role === "MENTEE" ? data.synopsis : undefined,
          relationShipToPatient:
            data.role === "MENTEE" ? data.relation : undefined,
          patientName: data.role === "MENTEE" ? data.patientName : undefined,
        },
      });

      const match = await prisma.profile.findFirst({
        where: {
          role: data.role === "MENTEE" ? "MENTOR" : "MENTEE",
          condition: data.condition,
        },
      });

      console.log(match);

      if (match) {
        const menteeId = data.role === "MENTEE" ? user.id : match.id;
        const mentorId = data.role === "MENTOR" ? user.id : match.id;

        await prisma.mentorMenteeMatch.create({
          data: {
            menteeId,
            mentorId,
          },
        });
      }

      return res.status(200).json({
        message: "User profile created!",
      });
    }
    case "PATCH": {
      const { firstName, middleName, lastName } = req.body;

      if (!firstName) {
        return res.status(400).json({
          message: "First name is required for update.",
        });
      }

      if (!lastName) {
        return res.status(400).json({
          message: "Last name is required for update.",
        });
      }

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
          middleName: middleName ? middleName : null,
          lastName: lastName,
        },
      });

      return res.status(200).json({
        message: "Details updated successfully!",
      });
    }
  }
});
