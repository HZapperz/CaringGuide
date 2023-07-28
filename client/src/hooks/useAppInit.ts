import { useEffect } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useProfile } from "./useProfile";
import { useRouter } from "next/router";

export const useAppInit = () => {
  const user = useUser();
  const router = useRouter();
  const profile = useProfile();

  useEffect(() => {
    if (user && !profile.isLoading && !profile.data) {
      router.push("/on-boarding");
    }
  }, [user, profile.isLoading]);

  return {
    isLoading: (user && profile.isLoading) || !router.isReady,
  };
};
