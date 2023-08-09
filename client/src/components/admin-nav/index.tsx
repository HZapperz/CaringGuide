import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { Role } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DollarSignIcon,
  GraduationCapIcon,
  GroupIcon,
  LayoutTemplateIcon,
  MailIcon,
  PieChartIcon,
  Tag,
  TagIcon,
  User2Icon,
} from "lucide-react";
import Image from "next/image";
import { Text } from "@nextui-org/react";
import { useApp } from "@/context/app";

export default function AdminDashboard({ children }: PropsWithChildren) {
  const router = useRouter();
  const route = router.route;

  const { profile, session, isLoading } = useApp();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      router.push("/login");
    }

    if (!profile) {
      router.push("/onboarding");
    }

    if (profile?.role !== Role.ADMIN) {
      router.push("/");
    }
  }, [profile, isLoading, session]);

  return (
    <div className="flex min-h-screen bg-background">
      <nav
        className={cn(
          "hidden w-full max-w-[18rem] border-r border-zinc-200 pb-12 dark:border-zinc-900 md:block"
        )}
      >
        <div className="space-y-4 py-4">
          <div className="mr-1 flex justify-center px-3">
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
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <div className="space-y-1">
              <Button
                className="w-full justify-start"
                variant={
                  route.startsWith("/admin/accounts") ? "secondary" : "ghost"
                }
                onClick={() => router.push("/admin/accounts")}
              >
                <User2Icon className="mr-2 h-4 w-4" />
                Accounts
              </Button>
              <Button
                className="w-full justify-start"
                variant={
                  route.startsWith("/admin/resources") ? "secondary" : "ghost"
                }
                onClick={() => router.push("/admin/resources")}
              >
                <Tag className="mr-2 h-4 w-4" />
                Resources
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-screen w-full overflow-hidden">{children}</div>
    </div>
  );
}
