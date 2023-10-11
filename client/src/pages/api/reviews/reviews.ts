// pages/api/reviews/reviews.ts

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { resourceId, userId, comment, rating } = req.body;
    console.log("Received request with data:", req.body);


    // TODO: Add validation for input data as needed

    try {
      console.log("Attempting to create a new review in the database.");
      const newReview = await prisma.review.create({
        data: { resourceId, userId, comment, rating },
      });
      console.log("Successfully created a new review:", newReview);
      return res.status(200).json(newReview);
    } catch (error) {
        console.error("Database Error:", error);
          if (error instanceof Error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: "An unknown error occurred" });
  }
  
    
  }

  // Handle other HTTP methods or return an error
  res.status(405).end();
};
