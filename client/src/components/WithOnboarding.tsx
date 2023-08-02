import { useApp } from "@/context/app";
import { FC, PropsWithChildren, useEffect } from "react";
import Loader from "./loader";
import { useRouter } from "next/router";

export function WithOnBoarding({ children }: PropsWithChildren) {
  const { isLoading, profile, user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/signin");
    if (user && !profile) router.replace("/onboarding");
  }, [isLoading, profile, user]);

  if (isLoading || !profile) return <Loader />;

  return <>{children}</>;
}
