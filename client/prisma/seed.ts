import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

(async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_SUPABASE_SERVICE_KEY as string
  );

  const { data, error } = await supabase.auth.admin.createUser({
    email: "super_admin@caringguide.org",
    password: "admin",
    email_confirm: true,
  });

  if (data.user) {
    await prisma.profile.create({
      data: {
        id: data.user.id,
        email: "super_admin@caringguide.org",
        firstName: "Admin",
        lastName: "Admin",
        phone: "1234567890",
        dob: new Date("1990-01-01"),
        gender: "male",
        role: "ADMIN",
        experience: "MORE_THAN_4",
      },
    });
  }
})();
