import { prisma } from "@/lib/client";
import isAdmin from "@/lib/isAdmin";
import { paginationSchema } from "@/schema/common";
import { deleteManyInviteCodeSchema } from "@/schema/invite-code";

export default isAdmin(async function handler(req, res, user) {
  switch (req.method) {
    case "GET":
      try {
        const { skip, take } = paginationSchema.parse(req.query);
        console.log(
          `Getting invite codes with skip: ${skip} and take: ${take}`,
        );
        const [items, count] = await prisma.$transaction([
          prisma.inviteCode.findMany({
            skip,
            take,
          }),
          prisma.inviteCode.count({}),
        ]);

        return res.json({
          items,
          pageCount: Math.ceil(count / take),
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving invite codes",
          error: error,
        });
      }
      break;
    case "POST":
      try {
        const { code } = req.body;
        const newCode = await prisma.inviteCode.create({
          data: {
            code: code,
          },
        });

        res.status(200).json(newCode);
      } catch (error) {
        res.status(500).json({
          message: "Error creating invite code",
          error: error,
        });
      }
      break;
    case "DELETE":
      try {
        console.log("zod has:", req.body);
        const data = deleteManyInviteCodeSchema.parse(req.body);

        const { count } = await prisma.inviteCode.deleteMany({
          where: {
            code: {
              in: data.codes,
            },
          },
        });

        return res.json({
          count,
          message: `${count} Code(s) deleted.`,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error deleteing invite code",
          error: error,
        });
      }
      break;

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
});
