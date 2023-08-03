import isLoggedIn from "../../../lib/isLoggedIn";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        {
          const { id } = req.body;
          if (id) {
            let user = null;
            user = await prisma.profile.findUnique({
              where: {
                id: id,
              },
            });
            if (user) {
              console.log(user);
              return res.json(user);
            } else {
              return res.status(404).json({
                message: "Profile not found.",
              });
            }
          } else {
            return res.status(404).json({
              message: "Profile not found.",
            });
          }
        }
        break;
      default:
        return res.status(405).json({
          message: "Method not allowed for this endpoint.",
        });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});
