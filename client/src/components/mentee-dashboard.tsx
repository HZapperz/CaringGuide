import ArticlesCard from "@/components/articlesCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import DashboardCard from "@/components/dashboardGuideCard";
import JournalCard from "@/components/journalCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditProfileGiver from "@/components/editProfileGiver";
import { Loading } from "@nextui-org/react";

interface JournalData {
  jId: string;
  id: string;
  title: string;
  description: string;
  time: string;
}

const MenteeDashBoard = (props: any) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [journals, setJournals] = useState<JournalData[]>([]);
  const [favouriteResources, setFavouriteResources] = useState<any[]>([]);
  const getAllJournals = async () => {
    setLoader(true);
    try {
      const response = await fetch("/api/journals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const journalsData = await response.json();
        setJournals(journalsData);
      } else {
        console.error("Error getting Journals:", response);
      }
    } catch (error) {
      console.error("Error getting Journals:", error);
    }
    setLoader(false);
  };

  async function handleApiResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  }

  async function fetchUserFavorites() {
    try {
      const response = await fetch(`/api/userFavourites`);
      return handleApiResponse(response);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      throw error;
    }
  }

  useEffect(() => {
    getAllJournals();
    fetchUserFavorites().then((data) => {
      setFavouriteResources(data);
    });
  }, []);

  const router = useRouter();

  if (loader)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="flex lg:flex-row flex-col justify-start lg:justify-between items-center lg:items-start p-10 w-full h-full">
        <div>
          <div className="w-full">
            <div className="max-w-md mx-auto rounded-xl overflow-hidden bg-white border-2 border-[#ECEEED] mb-2 w-full">
              <div className="flex justify-between items-center p-4 w-full min-w-[385px]">
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
            <DashboardCard user={props.mentorData} />
          </div>
        </div>
        <div className="ml-0 sm:ml-2 xl:ml-0 flex xl:flex-row flex-col justify-start xl:items-start items-center w-full min-w-[385px] sm:h-full">
          <div className="w-full flex justify-start sm:justify-center items-center xl:w-[70%] mx-0 lg:mx-1 h-full mb-2 mt-2 lg:mt-0 xl:mb-0">
            <div className="container flex flex-col justify-start items-start min-h-full rounded-xl border-2 border-[#ECEEED p-4 w-full overflow-auto">
              <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4">
                <div>FAVORITE RESOURCES</div>
              </div>
              <div className="container grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 content-center w-full overflow-auto">
                {favouriteResources.map((data, index) => (
                  <div
                    key={index}
                    className="mr-0 sm:mr-2 w-full flex justify-center items-center"
                  >
                    <ArticlesCard data={data} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start sm:justify-center items-center xl:w-[30%] mb-2 xl:mt-0 h-full">
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
                {journals.map((journal, index) => (
                  <div className="pr-2 w-full" key={index}>
                    <JournalCard data={journal} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeDashBoard;
