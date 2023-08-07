import {
  createPagesServerClient,
  SupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

type LoggedInHandler<T> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  user: User,
  supabaseClient: SupabaseClient<any, "public", any>
) => void;

export default function isAdmin<T>(handler: LoggedInHandler<T>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const supabaseServerClient = createPagesServerClient({
        req,
        res,
      });

      const {
        data: { user },
      } = await supabaseServerClient.auth.getUser();

      if (!user) {
        return res.status(401).json({ message: "Not logged in" });
      }

      const profile = await prisma?.profile.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!profile || profile.role !== "ADMIN") {
        return res.status(401).json({ message: "Not authorized" });
      }

      return handler(req, res, user, supabaseServerClient);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: fromZodError(err).message,
        });
      } else {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  };
}
