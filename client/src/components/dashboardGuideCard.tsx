import { useEffect, useState } from "react";
import EditProfile from "./editProfile";
import { useApp } from "@/context/app";
import useHandleErrors from "@/hooks/useHandleErrors";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Profile } from "@prisma/client";

const DashboardCard = ({ user, care }: { user: Profile; care: boolean }) => {
  const app = useApp();
  const handleErrors = useHandleErrors();
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>();
  const age = new Date().getFullYear() - new Date(user?.dob).getFullYear();

  useEffect(() => {
    (async () => {
      try {
        if (!user?.avatar) return;

        const { data, error } = await supabase.storage
          .from("avatars")
          .download(user?.avatar);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        handleErrors(error);
      }
    })();
  }, [user?.avatar]);

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white border-2 border-[#ECEEED] p-4 gap-4 flex flex-col">
      <h1 className="uppercase text-2xl text-[#4e4e4e] font-medium m-0">
        my mentor
      </h1>
      <div className="flex items-center justify-start w-full gap-4">
        <div className="w-[92px]">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="profile"
              className="w-full rounded-full aspect-square"
            />
          ) : (
            <div className="w-full bg-gray-300 rounded-full aspect-square" />
          )}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-baseline justify-start gap-2">
            <p className="text-xl font-medium font-poppins whitespace-nowrap">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-[#4E4E4E] opacity-50 text-[11px] font-poppins">
              ({user?.gender === "male" ? "he/him" : "she/her"})
            </p>
          </div>
          <div className="flex items-center justify-start gap-3 text-xs font-poppins">
            <p className="text-[#4E4E4E]">{age} Years</p>
            <div className="w-1 bg-black rounded-full aspect-square"></div>
            <p className="text-[#4E4E4E]">{user?.condition}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="">
          <h3 className="m-0 text-lg font-poppins">About</h3>
          <p className="text-[#4E4E4E] text-[13px] font-lightfont-poppins">
            {user?.about}
          </p>
        </div>
        <div className="font-poppins">
          <h3 className="mb-2 text-lg font-poppins">Contact Information</h3>
          <div className="text-[#4E4E4E] p-4 rounded-xl bg-[#ECEEED] flex flex-col gap-2">
            <div className="text-[#4E4E4E]">
              <p className="opacity-50 text-[10px] leading-3">PHONE NUMBER</p>
              <p className="text-[15px] font-light">
                {user?.phone ? user?.phone : "Not Provided"}
              </p>
            </div>
            <div className="text-[#4E4E4E]">
              <p className="opacity-50 text-[10px] leading-3">Email</p>
              <p className="text-[15px] font-light">
                {user?.email ? user?.email : "Not Provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="font-poppins">
          <h3 className="mb-2 text-lg">Caregiving Experience</h3>
          <div className="text-[#4E4E4E] px-4 py-2 rounded-xl bg-[#ECEEED]">
            <p className="text-[#4E4E4E]">
              {user?.experience === "LESS_THAN_2"
                ? "0 - 2 "
                : user?.experience === "BETWEEN_2_AND_4"
                ? "2 - 4 "
                : "4+ "}
              years
            </p>
          </div>
        </div>
        <div className="mt-4">
          <EditProfile user={user} care={care} />
        </div>
      </div>
    </div>
  );
};
export default DashboardCard;
