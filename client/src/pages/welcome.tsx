import { useRouter } from "next/router";
import React from "react";

type Props = {};

const WelcomePage = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <h1 className="text-6xl text-green-950">Welcome Page</h1>
      <button
        onClick={() => router.push("/onboarding")}
        className="bg-[#114D38] text-white rounded-2xl px-4 py-2 text-xl"
      >
        Go to onboarding
      </button>
    </div>
  );
};

export default WelcomePage;
