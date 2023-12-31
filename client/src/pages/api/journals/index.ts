import isLoggedIn from "@/lib/isLoggedIn";
import { journalSchema } from "@/schema/journal";
import { prisma } from "@/lib/client";

export default isLoggedIn(async (req, res, user) => {
  switch (req.method) {
    case "POST": {
      const data = journalSchema.parse(req.body);

      await prisma.$transaction(async (tx) => {
        await prisma.journal.create({
          data: {
            authorId: user.id,
            title: data.title,
            description: data.description,
          },
        });
      });

      return res.status(200).json({
        message: "User Journal created!",
      });
    }
    case "GET": {
      const journals = await prisma.journal.findMany({
        where: {
          authorId: user.id,
        },
      });

      return res.status(200).json(journals);
    }

    case "PUT": {
      const { jId, title, description } = req.body;

      try {
        const updatedJournal = await prisma.journal.update({
          where: {
            id: jId,
            authorId: user.id,
          },
          data: {
            title,
            description,
          },
        });

        return res.status(200).json(updatedJournal);
      } catch (error) {
        console.error("Error updating Journal:", error);
        return res.status(500).json({ error: "Failed to update journal." });
      }
    }

    default: {
      return res.status(405).end();
    }
  }
});
