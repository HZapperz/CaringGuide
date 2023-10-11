// pages/api/reviews/[resourceId].ts

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { resourceId } = req.query;

    try {
      const reviews = await prisma.review.findMany({
        where: { resourceId: resourceId as string },
      });

      return res.status(200).json(reviews);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: "An unknown error occurred" });
    }
    
  }

  // Handle other HTTP methods or return an error
  res.status(405).end();
};
