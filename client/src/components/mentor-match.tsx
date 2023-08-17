import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Loader from "./loader";
import { Profile } from "@prisma/client";
import { CheckIcon, Loader2 } from "lucide-react";
import useHandleErrors from "@/hooks/useHandleErrors";
import { Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useApp } from "@/context/app";

const MentorMatch: React.FC = () => {
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const { session } = useApp();
  const handleError = useHandleErrors();
  const router = useRouter();
  const queryClient = useQueryClient();

  const fetchMatch = useQuery(
    ["mentor", "match", skip],
    async () => {
      const response = await axios.get(
        `/api/match?skip=${skip === total ? 0 : skip}`
      );

      return response.data as {
        mentor: Profile | null;
        count: number;
      };
    },
    {
      onSuccess: (data) => {
        setTotal(data?.count ?? 0);
      },
      onError: handleError,
    }
  );

  const acceptMatch = useMutation(
    ["mentor", "match", "accept"],
    async () => {
      if (!fetchMatch.data?.mentor) {
        return;
      }

      const response = await axios.post("/api/match", {
        mentorId: fetchMatch.data?.mentor?.id,
      });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile", session?.user.id]);
        toast.success("Match accepted! Redirecting to dashboard...");
        router.replace("/dashboard");
      },
      onError: handleError,
    }
  );

  const profile = fetchMatch.data?.mentor;

  if (fetchMatch.isLoading) {
    return <Loader />;
  }

  if (!profile || total === 0) {
    return (
      <main className=" bg-white w-screen h-screen flex items-center justify-center">
        <div className="p-10 w-full">
          <h1 className="text-3xl">
            No matches found at the moment. Please check back later.
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="h-full bg-white w-screen">
      <div className="p-10 w-full">
        <div className="flex flex-col justify-between items-center font-poppins text-[#4E4E4E] text-5xl font-medium mb-4">
          <div className="flex justify-start items-start w-full">
            Your Top Match
          </div>
          <div className="absolute bottom-0 right-0 flex justify-center items-center w-full h-full">
            <div className="flex flex-col lg:flex-row justify-center items-center w-[85%] lg:w-[65%] xl:w-[50%] border-[3.5px] border-caring py-6 px-2 lg:py-12 lg:px-6 rounded-2xl">
              <div className="flex flex-col justify-center items-center mb-6 lg:mb-0 lg:mr-20 w-full lg:w-[40%]">
                <div className="w-48 h-48 rounded-full bg-gray-300 mb-4"></div>
                <div className="flex justify-start items-start ">
                  <h2 className="text-2xl font-poppins mr-1 font-medium">
                    {profile.firstName + " " + profile.lastName}
                  </h2>
                  <p className="text-[#4E4E4E] opacity-50 text-[11px] ml-2 font-poppins">
                    {profile.gender === "male"
                      ? "He/him"
                      : profile.gender === "female"
                      ? "She/her"
                      : "Other"}
                  </p>
                </div>
                <div className="flex justify-start items-center font-poppins">
                  <p className="text-[#4E4E4E] text-[15px] mr-2">
                    {new Date().getFullYear() -
                      new Date(profile.dob ?? 0).getFullYear()}
                    Years
                  </p>
                  <div className="w-1 bg-black aspect-square rounded-full"></div>
                  <p className="text-[#4E4E4E] text-[15px] ml-2">
                    {"Lewisville, TX"}
                  </p>
                </div>
              </div>
              <div className="w-[95%] sm:w-[80%] lg:w-[60%]">
                <div className="mt-0">
                  <h3 className="text-xl font-[500] font-poppins mb-2">
                    About
                  </h3>
                  <p className="text-[#4E4E4E] text-[16px] font-[300] rounded-xl font-poppins">
                    {profile.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 right-10 flex justify-end items-end w-full gap-2">
            <Button
              size={"sm"}
              color={"success"}
              onClick={() => acceptMatch.mutate()}
              className="flex justify-center items-center gap-1 w-12"
            >
              {!acceptMatch.isLoading ? (
                <>
                  <CheckIcon className="w-5 h-5" color="white" />
                  <span className="text-white font-poppins font-medium">
                    Accept
                  </span>
                </>
              ) : (
                <span>
                  <Loader2 className="animate animate-spin" />
                </span>
              )}
            </Button>
            <Button
              size={"sm"}
              color={"primary"}
              onClick={() => setSkip(skip + 1)}
              className="flex justify-center items-center gap-1 w-12"
            >
              {!fetchMatch.isFetching ? (
                <>
                  <span className="text-white font-poppins font-medium">
                    Next
                  </span>
                  <ChevronRightIcon className="w-5 h-5" color="white" />
                </>
              ) : (
                <span>
                  <Loader2 className="animate animate-spin" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MentorMatch;
