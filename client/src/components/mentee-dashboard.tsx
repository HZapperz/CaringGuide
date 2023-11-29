import ArticlesCard from "@/components/articlesCard";
import DashboardArticleCard from "./dashboardCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import DashboardCard from "@/components/dashboardGuideCard";
import JournalCard from "@/components/journalCard";
import { useRouter } from "next/router";
import EditProfileGiver from "@/components/editProfileGiver";
import { useApp } from "@/context/app";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import useHandleErrors from "@/hooks/useHandleErrors";
import Loader from "./loader";
import Link from "next/link";
import { ICategory } from "@/types/category";
import { categoryLabels } from "@/utils/enumToLabel";
import CategoryCard from "@/components/category/category-card";
import MatchButton from "./matchButton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface JournalData {
  jId: string;
  id: string;
  title: string;
  description: string;
  time: string;
}

const MenteeDashBoard = () => {
  const app = useApp();
  const profile = app.profile;
  const router = useRouter();
  const [favoriteResources, setFavoriteResources] = useState(profile?.favoriteResources || []);
  const journals = profile?.journals || [];
  const [avatarUrl, setAvatarUrl] = useState<string | null>();
  const supabase = useSupabaseClient();
  const handleErrors = useHandleErrors();
  const mentor = profile?.mentor;
  
  const [matchedMentor, setMatchedMentor] = useState<typeof mentor | null>(mentor);
  //);
  //const [previousMatchedMentor, setPreviousMatchedMentor] = useState<
  //  typeof mentor | null
  //>(null);con

  const [selectedCategory, setSelectedCategory] =
    useState<ICategory["value"]>("ALL");

  useEffect(() => {
    if (router.query.category) {
      console.log("Category from URL:", router.query.category);
      setSelectedCategory(router.query.category as string);
    } else {
      setSelectedCategory("ALL");
    }
  }, [router.query]);

  //const handleUnmatch = () => {
  //  if (matchedMentor) {
  //    setPreviousMatchedMentor(matchedMentor);
  //    setMatchedMentor(null); // Clear the current matched mentor
  //  }
  //};

  //const handleRematch = () => {
  //  setMatchedMentor(previousMatchedMentor);
  //  setPreviousMatchedMentor(null);
  //};

  const fetchMatch = useQuery(["mentor", "match"], async () => {
    const response = await axios.get("/api/match");
    return response.data;
  });

  const handleFavoriteToggle = async (resourceId: string, newFavoriteStatus: boolean) => {
    try {
      const response = await axios.post('/api/userFavourites', {
          resourceId, 
          isStarred: newFavoriteStatus 
      });
  
      if (response.status === 200 || response.status === 201) {
        if (!newFavoriteStatus) {
          // Only update state if API call is successful
          setFavoriteResources(prevResources => 
            prevResources.filter(resource => resource.id !== resourceId));
        }
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };
  

  useEffect(() => {
    (async () => {
      try {
        if (!profile?.avatar) return;

        const { data } = await supabase.storage
          .from("avatars")
          .download(profile.avatar);

        if (data) {
          const url = URL.createObjectURL(data);
          setAvatarUrl(url);
        }
      } catch (error) {
        handleErrors(error);
      }
    })();
  }, [profile?.avatar]);

  if (!profile || !mentor) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-4 p-4 md:p-10 md:flex-row lg:justify-between lg:items-start">
      <div className="flex flex-col w-full h-full gap-4 md:w-fit md:max-w-sm">
        <div className="rounded-xl bg-white border-2 border-[#ECEEED] flex items-center w-full gap-4 p-4">
          <div className="w-fit">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="profile"
                className="w-[92px] rounded-full aspect-square"
              />
            ) : (
              <div className="w-[92px] bg-gray-300 rounded-full aspect-square" />
            )}
          </div>
          <div className="flex flex-col justify-center items-start w-[60%]">
            <div className="flex flex-col items-start justify-start gap-1">
              <h2 className="text-2xl font-medium leading-3 uppercase font-poppins whitespace-nowrap">
                {profile?.firstName}
              </h2>
              <EditProfileGiver user={profile} />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          {matchedMentor ? (
            <div>
              <DashboardCard user={matchedMentor} care={false} />
              {/* MatchButton removed. Only the DashboardCard is displayed */}
            </div>
          ) : (
            <div>
              No mentor matched. Find a match.
              {/* If you need a button for finding a match, add it here */}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-4 xl:flex-row md:items-start sm:h-full">
        <div className="flex flex-col justify-start items-start max-h-full rounded-xl border-4 border-[#ECEEED] p-4 w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="mb-0 text-3xl text-center md:text-4xl md:text-left">
              Resource Categories
            </h1>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-6 bg-slate-50 mb-4">
              {categoryLabels.map((category) => (
                <Link
                  href={`/resources?category=${category.value}`}
                  key={category.label}
                  passHref
                >
                  <CategoryCard
                    key={category.label}
                    {...category}
                    setSelectedCategory={(categoryValue) => {
                      setSelectedCategory(categoryValue);
                      router.push(`/resources?category=${categoryValue}`);
                    }}
                    selectedCategory={selectedCategory}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="font-poppins text-[#4E4E4E] text-2xl font-medium mb-4">
            Favorite Resources
          </div>

          <div className="grid w-full grid-cols-1 gap-4 overflow-auto min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {favoriteResources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-center sm:w-full">
                <DashboardArticleCard 
                  resource={resource} 
                  isFavorited={true}
                  onFavoriteToggle={handleFavoriteToggle} 
                />
              </div>
            ))}

            {favoriteResources.length === 0 && (
              <div
                className="opacity-50 font-poppins text-black cursor-pointer col-span-5"
                onClick={() => {
                  router.push("/resources");
                }}
              >
                Get started with your favorite resources! Check out your
                guidebook to explore.
              </div>
            )}
          </div>
        </div>
        {/* <div className="w-full flex justify-start sm:justify-center items-center xl:w-[30%] mb-2 xl:mt-0 h-full">
          <div className="container flex flex-col justify-start items-start min-h-full rounded-xl border-2 border-[#ECEEED] p-4 w-full overflow-auto max-h-full">
            <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4 w-full">
              <div>JOURNAL</div>
              <div className="w-8">
                <PlusIcon
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/journal");
                  }}
                />
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 overflow-auto place-items-center">
              {journals.map((journal, index) => (
                <JournalCard data={journal} key={index} isDashboard />
              ))}

              {journals.length === 0 && (
                <div
                  className="opacity-50 font-poppins text-black cursor-pointer"
                  onClick={() => {
                    router.push("/journal");
                  }}
                >
                  Click here to add a journal
                </div>
              )}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MenteeDashBoard;