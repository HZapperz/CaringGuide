import Articles from "@/components/articles";
import ArticlesCard from "@/components/articlesCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import DashboardCard from "@/components/dashboardGuideCard";
import JournalCard from "@/components/journalCard";
import React from "react";
import { useRouter } from "next/router";
import EditProfileGiver from "@/components/editProfileGiver";

const MenteeDashBoard = (props: any) => {
  const router = useRouter();
  return (
    <>
      <div className="flex lg:flex-row flex-col justify-center lg:justify-between items-center lg:items-start p-10 w-full min-h-screen">
        <div className="w-fit h-full">
          <div>
            <div className="max-w-md mx-auto rounded-xl overflow-hidden bg-white border-2 border-[#ECEEED] mb-2">
              <div className="flex justify-between items-center p-4 w-full">
                <div className="w-[40%]">
                  <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex flex-col justify-center items-start w-[60%]">
                  <div className="flex flex-col justify-start items-start ">
                    <h2 className="text-2xl font-poppins mr-1 font-medium">
                      {props.user.firstName + " " + props.user.lastName}
                    </h2>
                    <EditProfileGiver user={props.user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <DashboardCard user={props.user} />
          </div>
        </div>
        <div className="ml-0 sm:ml-2 xl:ml-0 flex xl:flex-row flex-col justify-center xl:items-start items-center w-full min-h-full">
          <div className="w-full flex justify-center items-center xl:w-[70%] mx-0 lg:mx-1 h-full mb-2 mt-2 lg:mt-0 xl:mb-0">
            <div className="container flex flex-col justify-start items-start min-h-full rounded-xl border-2 border-[#ECEEED p-4 w-full overflow-auto">
              <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4">
                <div>FAVORITE ARTICLES</div>
              </div>
              <div className="container grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 content-center w-full overflow-auto">
                <div className="mr-0 sm:mr-2 w-full flex justify-center items-center">
                  <ArticlesCard />
                </div>
                <div className="mr-0 sm:mr-2 w-full flex justify-center items-center">
                  <ArticlesCard />
                </div>
                <div className="mr-0 sm:mr-2 w-full flex justify-center items-center">
                  <ArticlesCard />
                </div>
                <div className="mr-0 sm:mr-2 w-full flex justify-center items-center">
                  <ArticlesCard />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center xl:w-[30%] mb-2 xl:mt-0 h-full">
            <div className="container flex flex-col justify-start items-start min-h-full rounded-xl border-2 border-[#ECEEED p-4 w-full overflow-auto">
              <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4 w-full">
                <div>JOURNAL</div>
                <div className="w-8">
                  <PlusIcon
                    className="cursor-pointer"
                    onClick={() => {
                      router.push("/journal-editor");
                    }}
                  />
                </div>
              </div>
              <div className="container grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-1 gap-y-4 w-full overflow-auto">
                <div className="mr-2">
                  <JournalCard />
                </div>
                <div className="mr-2">
                  <JournalCard />
                </div>
                <div className="mr-2">
                  <JournalCard />
                </div>
                <div className="mr-2">
                  <JournalCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeDashBoard;
