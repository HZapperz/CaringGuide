import Articles from "@/components/articles";
import ArticlesCard from "@/components/articlesCard";
import DashboardCareCard from "@/components/dashboardCareCard";
import DashboardCard from "@/components/dashboardGuideCard";
import JournalCard from "@/components/journalCard";
import Nav from "@/components/nav";
import JournalPage from "@/dump/journalpage";
import React from "react";

const MenteeDashBoard = (props: any) => {
  return (
    <main className="min-h-screen bg-white w-screen">
      <Nav />
      <div className="flex lg:flex-row flex-col justify-between items-start p-10 w-full">
        <div className="mr-2 w-full lg:w-[22%]">
          <div>
            <div className="max-w-md mx-auto rounded-xl overflow-hidden bg-white border-2 border-[#ECEEED] mb-2">
              <div className="flex justify-between items-center p-4 w-full">
                <div className="w-[40%]">
                  <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex flex-col justify-center items-start w-[60%]">
                  <div className="flex flex-col justify-start items-start ">
                    <h2 className="text-2xl font-poppins mr-1 font-medium">
                      MARK SMITH
                    </h2>
                    <p className="text-[#4E4E4E] opacity-50 text-[15px] font-[300] font-poppins">
                      view my profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <DashboardCard />
          </div>
        </div>
        <div className="mr-2 w-full lg:w-[58%] my-2">
          <div className="container flex flex-col justify-start items-start min-h-full rounded-xl border-2 border-[#ECEEED p-4 w-full overflow-auto">
            <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4">
              <div>FAVORITE ARTICLES</div>
            </div>
            <div className="container grid grid-cols-2 xl:grid-cols-3 gap-4 w-full overflow-auto">
              <div className="mr-2">
                <ArticlesCard />
              </div>
              <div className="mr-2">
                <ArticlesCard />
              </div>
              <div className="mr-2">
                <ArticlesCard />
              </div>
              <div className="mr-2">
                <ArticlesCard />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[20%] mb-2">
          <div className="container flex flex-col justify-start items-start min-h-full rounded-xl border-2 border-[#ECEEED p-4 w-full overflow-auto">
            <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4">
              <div>JOURNAL</div>
            </div>
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full overflow-auto">
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
    </main>
  );
};

export default MenteeDashBoard;
