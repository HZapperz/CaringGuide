import { useApp } from "@/context/app";
import { FC, PropsWithChildren, useEffect } from "react";
import Loader from "./loader";
import { useRouter } from "next/router";

export function WithOnBoarding({ children }: PropsWithChildren) {
  const { isLoading, profile, session } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      router.replace("/signin");
      return;
    }

    if (session && !profile) {
      router.replace("/onboarding");
      return;
    }

    if (profile?.role === "ADMIN") {
      router.replace("/admin/accounts");
      return;
    }

    if (session && profile && router.pathname === "/onboarding") {
      router.replace("/dashboard");
      return;
    }
  }, [isLoading, profile, session]);

  if (isLoading || !session || !profile) return <Loader />;

  return <>{children}</>;
}
