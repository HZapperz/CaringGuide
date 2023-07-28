// pages/api/profiles/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const newProfile = await prisma.profile.create({
        data: req.body,
      });
      res.status(201).json(newProfile);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create profile' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
