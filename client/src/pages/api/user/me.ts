import isLoggedIn from "../../../lib/isLoggedIn";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res, user) => {
  switch (req.method) {
    case "GET": {
      const profile = await prisma.profile.findUnique({
        where: {
          id: user.id,
        },
      });

      return res.json({
        profile,
      });
    }
  }
});
