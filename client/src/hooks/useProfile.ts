import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const user = useUser();

  const profile = useQuery(["profile"], {
    enabled: !!user,
  });

  return {
    data: profile.data,
    isLoading: profile.isLoading,
  };
};
