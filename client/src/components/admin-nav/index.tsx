import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app";
import { cn } from "@/lib/utils";
import { Text } from "@nextui-org/react";
import { Role } from "@prisma/client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PowerIcon, Tag, User2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function AdminDashboard({ children }: PropsWithChildren) {
  const router = useRouter();
  const route = router.route;
  const [adminPass, setAdminPass] = useLocalStorage("adminPass", "");
  const { profile, session, isLoading } = useApp();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      router.push("/signin");
      return;
    }

    if (!profile) {
      router.push("/welcome");
      return;
    }

    if (profile?.role !== Role.ADMIN) {
      router.push("/dashboard");
      return;
    }
  }, [profile, isLoading, session]);

  return (
    <div className="flex min-h-screen bg-background">
      <nav
        className={cn(
          "hidden w-full max-w-[18rem] border-r border-zinc-200 pb-12 dark:border-zinc-900 md:block"
        )}
      >
        <div className="py-4 space-y-4">
          <div className="flex justify-center px-3 mr-1">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <Text
              h4
              weight="bold"
              css={{
                textGradient: "45deg, $green900 -10%, $red800 50%",
              }}
            >
              Caring Guide
            </Text>
          </div>

          <div className="px-3 py-2">
            <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <div className="space-y-1">
              <Button
                className="justify-start w-full"
                variant={
                  route.startsWith("/admin/accounts") ? "secondary" : "ghost"
                }
                onClick={() => router.push("/admin/accounts")}
              >
                <User2Icon className="w-4 h-4 mr-2" />
                Accounts
              </Button>
              <Button
                className="justify-start w-full"
                variant={
                  route.startsWith("/admin/resources") ? "secondary" : "ghost"
                }
                onClick={() => router.push("/admin/resources")}
              >
                <Tag className="w-4 h-4 mr-2" />
                Resources
              </Button>
              <Button
                className="justify-start w-full"
                variant={
                  route.startsWith("/admin/resources") ? "secondary" : "ghost"
                }
                onClick={() => supabase.auth.signOut()}
              >
                <PowerIcon className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full h-screen overflow-hidden">{children}</div>
    </div>
  );
}
