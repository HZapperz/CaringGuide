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

      if (existingProfile) {
        return res.status(409).json({
          message: "User profile already exists!",
        });
      }

      if (data.role === "MENTOR") {
        const code = await prisma.inviteCode.findUnique({
          where: { code: data.code },
        });

        if (!code) {
          return res.status(400).json({
            message: "Invalid invite code!",
          });
        }
      }

      await prisma.profile.create({
        data: {
          id: user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          dob: data.dob,
          role: data.role,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          experience: data.experience,
          condition: data.condition,
          about: data.role === "MENTOR" ? data.about : undefined,
          synopsis: data.role === "MENTEE" ? data.synopsis : undefined,
          relationShipToPatient:
            data.role === "MENTEE" ? data.relation : undefined,
          patientName: data.role === "MENTEE" ? data.patientName : undefined,
          city: data.city,
          country: data.country,
          avatar: data.avatar,
        },
      });

      if (data.role === "MENTOR") {
        await prisma.inviteCode.delete({
          where: { code: data.code },
        });
      }

      return res.status(200).json({
        message: "User profile created!",
      });
    }
  }
});
