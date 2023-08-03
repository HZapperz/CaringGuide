import { Profile } from "@prisma/client";
import {
  Session,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

type AppContext = {
  session: Session | null;
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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = useSupabaseClient();

  const profileQuery = useQuery(
    ["profile", session],
    async () => {
      const res = await fetch(`/api/user/me`);
      const data = await res.json();
      return data as Profile | null;
    },
    {
      enabled: !!session,
    }
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isLoading =
    !router.isReady || loading || (!!session && profileQuery.isLoading);

  return (
    <AppContext.Provider
      value={{ profile: profileQuery.data, isLoading, session }}
    >
      {children}
    </AppContext.Provider>
  );
};
