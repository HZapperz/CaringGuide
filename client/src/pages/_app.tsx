import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { env } from "../env.mjs";
import { useRouter } from "next/router";
import Nav from "@/components/nav";
import NavbarComp from "@/components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@/context/app";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: "#08291e",
      secondary: "#ab1d41",
      tertiary: "#142850",
      background: "#ffffff",
      text: "#333",
      white: "#fff",
      black: "#000",
      gray: "#888",
      success: "#4bb543",
      warning: "#ffc107",
      error: "#dc3545",
      info: "#17a2b8",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#ff4ecd",
    },
    space: {},
    fonts: {},
  },
});

function App({ Component, pageProps }: AppProps) {
  const pagesWithoutLayout = ["/signin", "/signup", "/login", "/"];
  const router = useRouter();
  const shouldApplyLayout = pagesWithoutLayout.includes(router.pathname);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      }),
  );

  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    }),
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <NextUIProvider theme={theme}>
            {!shouldApplyLayout ? (
              <div className="flex flex-col w-screen h-screen min-h-screen bg-white">
                <NavbarComp />
                <Component {...pageProps} />
              </div>
            ) : (
              <div className="flex flex-col w-screen h-screen min-h-screen bg-white">
                <Nav />
                <Component {...pageProps} />
              </div>
            )}
            <Toaster position={"bottom-right"} />
          </NextUIProvider>
        </AppProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default App;
