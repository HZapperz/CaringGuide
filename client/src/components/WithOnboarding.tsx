import { useApp } from "@/context/app";
import { PropsWithChildren } from "react";
import Loader from "./loader";

export function WithOnBoarding({ children }: PropsWithChildren) {
  const { isLoading, profile, session } = useApp();

  if (isLoading || !session || !profile) return <Loader />;

  return <>{children}</>;
}
