import { Profile, Resources, Journal } from "@prisma/client";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

type ProfileResponse =
  | (Profile & {
      mentor?: Profile;
      mentees?: Profile[];
      favoriteResources: Resources[];
      journals: Journal[];
    })
  | null;

type AppContext = {
  session: Session | null;
  profile?: ProfileResponse;
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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = useSupabaseClient();

  const profileQuery = useQuery(
    ["profile", session],
    async () => {
      const res = await fetch(`/api/user/me`);
      const data = await res.json();
      return data as ProfileResponse;
    },
    {
      enabled: !!session,
      onSuccess: (data) => {
        if (!data && router.pathname !== "/onboarding") {
          return router.replace("/onboarding");
        }

        if (data && data.role === "ADMIN") {
          router.replace("/admin/accounts");
          return;
        }
      },
    }
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.getSession();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!session) {
      router.replace("/signin");
      return;
    }
  }, [loading, session]);

  const isLoading = !router.isReady || loading || profileQuery.isLoading;

  return (
    <AppContext.Provider
      value={{ profile: profileQuery.data, isLoading, session }}
    >
      {children}
    </AppContext.Provider>
  );
};
