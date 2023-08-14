import ArticlesCard from "@/components/articlesCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import DashboardCard from "@/components/dashboardGuideCard";
import JournalCard from "@/components/journalCard";
import { useRouter } from "next/router";
import EditProfileGiver from "@/components/editProfileGiver";
import { useApp } from "@/context/app";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import useHandleErrors from "@/hooks/useHandleErrors";

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
  const favoriteResources = profile?.favoriteResources || [];
  const journals = profile?.journals || [];
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    "https://i.pravatar.cc/220"
  );
  const supabase = useSupabaseClient();
  const handleErrors = useHandleErrors();
  const mentor = profile?.mentor;

  useEffect(() => {
    (async () => {
      try {
        if (!profile?.avatar) return;

        const { data, error } = await supabase.storage
          .from("avatars")
          .download(profile.avatar);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        handleErrors(error);
      }
    })();
  }, [profile?.avatar]);

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
                {profile?.firstName + " " + profile?.lastName}
              </h2>
              <EditProfileGiver user={profile} />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          <DashboardCard user={mentor} care={false} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-4 xl:flex-row md:items-start sm:h-full">
        <div className="w-full flex justify-start sm:justify-center items-center xl:w-[70%] h-full">
          <div className="flex flex-col justify-start items-start max-h-full rounded-xl border-2 border-[#ECEEED] p-4 w-full">
            <div className="font-poppins text-[#4E4E4E] text-2xl font-medium mb-4">
              FAVORITE RESOURCES
            </div>
            <div className="grid w-full grid-cols-1 gap-4 overflow-scroll min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {favoriteResources
                // .slice(0, 7)
                .map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center sm:w-full"
                  >
                    <ArticlesCard resource={data} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start sm:justify-center items-center xl:w-[30%] mb-2 xl:mt-0 h-full">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashBoard;
