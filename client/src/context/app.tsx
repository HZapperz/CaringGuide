import { Profile } from "@prisma/client";
import { User, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";

type AppContext = {
  user: User | null;
  profile?: Profile | null;
  isLoading: boolean;
};

const AppContext = createContext<AppContext | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }

  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const router = useRouter();

  const profileQuery = useQuery(
    ["profile", user?.id],
    async () => {
      const res = await fetch(`/api/user/me`);
      const data = await res.json();
      return data as Profile | null;
    },
    {
      enabled: !!user?.id,
    }
  );

  const isLoading = !router.isReady || profileQuery.isLoading;

  return (
    <AppContext.Provider
      value={{ profile: profileQuery.data, isLoading, user }}
    >
      {children}
    </AppContext.Provider>
  );
};
