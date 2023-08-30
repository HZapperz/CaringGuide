import { useEffect, useState } from "react";
import useHandleErrors from "@/hooks/useHandleErrors";
import { Profile } from "@prisma/client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const DashboardCareCard = ({ profile }: { profile: Profile }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const handleErrors = useHandleErrors();
  const supabase = useSupabaseClient();
  const age =
    new Date().getFullYear() -
    new Date(profile?.dob ?? undefined).getFullYear();

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
    <main className="container mx-auto w-full lg:w-96">
      <div className="max-w-md mx-auto rounded-xl overflow-hidden bg-[#ECEEED] border-2 border-white">
        <div className="flex justify-between items-center p-4 w-full">
          <div className="w-[40%]">
            <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col justify-center items-start w-[60%]">
            <div className="flex justify-start items-start ">
              <h2 className="text-xl font-poppins mr-2">
                {profile.firstName + " " + profile.lastName}
              </h2>
            </div>
            <div className="flex justify-start items-center font-poppins">
              <p className="text-gray-600 mr-2"> {age} Years</p>
              <div className="w-1 bg-black aspect-square rounded-full"></div>
              <p className="text-gray-600 ml-2"> {profile.condition}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mt-0 font-poppins">
            <h3 className="text-lg mb-2">Background Information</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-white">
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PATIENT RELATIONSHIP</p>
                <p className="text-[15px] font-[300]">
                  {profile.relationShipToPatient}
                </p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PATIENT CONDITION</p>
                <p className="text-[15px] font-[300]">{profile.condition}</p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">YEAR(S) AS CAREGIVER</p>
                <p className="text-[15px] font-[300]">
                  {profile.experience === "LESS_THAN_2"
                    ? "0 - 2 "
                    : profile.experience === "BETWEEN_2_AND_4"
                    ? "2 - 4 "
                    : "4+ "}
                  YEAR(S) AS CAREGIVER
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 font-poppins">
            <h3 className="text-lg mb-2">Contact Information</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-white">
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PHONE NUMBER</p>
                <p className="text-[15px] font-[300]">
                  {profile.phone ? profile.phone : "Not Provided"}
                </p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">Email</p>
                <p className="text-[15px] font-[300]">
                  {profile.email ? profile.email : "Not Provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 font-poppins">
            <h3 className="text-lg mb-2">About</h3>
            <p className="text-[#4E4E4E] text-[13px] font-[300] p-4 rounded-xl font-poppins bg-white">
              {profile.about || profile.synopsis}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default DashboardCareCard;
