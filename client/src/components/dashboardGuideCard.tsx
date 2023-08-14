import { useEffect, useState } from "react";
import EditProfile from "./editProfile";
import { useApp } from "@/context/app";
import useHandleErrors from "@/hooks/useHandleErrors";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const DashboardCard = (props: any) => {
  const app = useApp();
  const handleErrors = useHandleErrors();
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    "https://i.pravatar.cc/370"
  );
  const age =
    new Date().getFullYear() - new Date(props.user?.dob).getFullYear();

  useEffect(() => {
    (async () => {
      try {
        if (!props?.user?.avatar) return;

        const { data, error } = await supabase.storage
          .from("avatars")
          .download(props?.user?.avatar);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        handleErrors(error);
      }
    })();
  }, [props?.user?.avatar]);

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
              {props.user?.firstName + " " + props.user?.lastName}
            </p>
            <p className="text-[#4E4E4E] opacity-50 text-[11px] font-poppins">
              ({props.user?.gender === "male" ? "he/him" : "she/her"})
            </p>
          </div>
          <div className="flex items-center justify-start gap-3 text-xs font-poppins">
            <p className="text-[#4E4E4E]">{age} Years</p>
            <div className="w-1 bg-black rounded-full aspect-square"></div>
            <p className="text-[#4E4E4E]">{props.user?.condition}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="">
          <h3 className="m-0 text-lg font-poppins">About</h3>
          <p className="text-[#4E4E4E] text-[13px] font-lightfont-poppins">
            {props.user?.about}
          </p>
        </div>
        <div className="font-poppins">
          <h3 className="mb-2 text-lg font-poppins">Contact Information</h3>
          <div className="text-[#4E4E4E] p-4 rounded-xl bg-[#ECEEED] flex flex-col gap-2">
            <div className="text-[#4E4E4E]">
              <p className="opacity-50 text-[10px] leading-3">PHONE NUMBER</p>
              <p className="text-[15px] font-light">
                {props.user?.phone ? props.user?.phone : "Not Provided"}
              </p>
            </div>
            <div className="text-[#4E4E4E]">
              <p className="opacity-50 text-[10px] leading-3">Email</p>
              <p className="text-[15px] font-light">
                {props.user?.email ? props.user?.email : "Not Provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="font-poppins">
          <h3 className="mb-2 text-lg">Caregiving Experience</h3>
          <div className="text-[#4E4E4E] px-4 py-2 rounded-xl bg-[#ECEEED]">
            <p className="text-[#4E4E4E]">
              {props.user?.experience === "LESS_THAN_2"
                ? "0 - 2 "
                : props.user?.experience === "BETWEEN_2_AND_4"
                ? "2 - 4 "
                : "4+ "}
              years
            </p>
          </div>
        </div>
        <div className="mt-4">
          <EditProfile user={props.user} care={props?.care} />
        </div>
      </div>
    </div>
  );
};
export default DashboardCard;
