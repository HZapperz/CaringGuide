import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Profile } from "@prisma/client";

const EditProfileGiver = ({ user }: { user: Profile }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const age = new Date().getFullYear() - new Date(user.dob).getFullYear();
  const supabase = useSupabaseClient();

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  useEffect(() => {
    (async () => {
      if (!user.avatar) return;

      const { data, error } = await supabase.storage
        .from("avatars")
        .download(user.avatar);
      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    })();
  }, [user.avatar]);

  return (
    <>
      <button
        type="button"
        onClick={togglePopup}
        className="opacity-50 text-[15px] leading-3 font-[300] font-poppins"
      >
        view my profile
      </button>
      {showPopup && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col bg-white p-6 rounded-2xl shadow-lg w-[70%]">
            <div className="flex items-start justify-between">
              <div className="flex items-start justify-between w-full mt-2">
                <div className="flex items-center w-full p-4">
                  <div className="w-[20%] mr-4">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="profile"
                        className="w-[80%] aspect-square rounded-full"
                      />
                    ) : (
                      <div className="w-[80%] aspect-square rounded-full bg-gray-300"></div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-start w-[60%] text-[#4E4E4E]">
                    <div className="flex items-center gap-2">
                      <h2 className="text-[20px] lg:text-[30px] font-poppins font-medium leading-3 uppercase overflow-ellipsis">
                        {user.firstName + " " + user.lastName}
                      </h2>
                      <p className="opacity-50 text-[10px] lg:text-[16px] font-poppins">
                        ({user.gender === "male" ? "he/him" : "she/her"})
                      </p>
                    </div>
                    <div className="flex items-center font-poppins">
                      <p className="text-[15px] lg:text-[20px] font-[300] mr-2">
                        {age} Years
                      </p>
                      <div className="w-1 bg-black rounded-full aspect-square" />
                      <p className="text-[15px] lg:text-[20px] font-[300] ml-2">
                        {user.condition}
                      </p>
                    </div>
                    <div className="flex items-center font-poppins">
                      <p className="text-[15px] lg:text-[20px] font-[300] mr-2">
                        7 years of caregiving experience
                      </p>
                    </div>
                    <Link color="black" href="/settings">
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-10 cursor-pointer" onClick={togglePopup}>
                <XMarkIcon />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 mt-4 lg:grid-cols-2 xl:grid-cols-3">
              <div className="flex flex-col gap-3">
                <h3 className="mb-2 text-xl lg:text-2xl font-poppins">About</h3>
                <p className="text-[16px] lg:text-[20px] font-[300] p-4 rounded-xl font-poppins bg-[#ECEEED] h-fit max-h-60 lg:h-60 overflow-auto">
                  {user.synopsis}
                </p>
              </div>
              <div className="flex flex-col gap-3 font-poppins">
                <h3 className="mb-2 text-2xl font-poppins">
                  Contact Information
                </h3>
                <div className="p-4 rounded-xl bg-[#ECEEED] h-fit max-h-60 lg:h-60">
                  <div className="text-[#4E4E4E]">
                    <p className="opacity-50 text-[15px] leading-3">
                      PHONE NUMBER
                    </p>
                    <p className="text-[18px] font-[300]">
                      {user.phone ? user.phone : "Not Provided"}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="opacity-50 text-[15px] leading-3">Email</p>
                    <p className="text-[18px] font-[300]">
                      {user.email ? user.email : "Not Provided"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 font-poppins">
                <h3 className="mb-2 text-2xl font-poppins">
                  Background Information
                </h3>
                <div className="p-4 rounded-xl bg-[#ECEEED] h-fit max-h-60 lg:h-60">
                  <div className="text-[#4E4E4E]">
                    <p className="opacity-50 text-[15px] leading-3">
                      PATIENT RELATIONSHIP
                    </p>
                    <p className="text-[18px] font-[300]">
                      {user.relationShipToPatient}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="opacity-50 text-[15px] leading-3">
                      PATIENT CONDITION
                    </p>
                    <p className="text-[18px] font-[300]">{user.condition}</p>
                  </div>
                  <div className="mt-4">
                    <p className="opacity-50 text-[15px] leading-3">
                      YEAR(S) AS CAREGIVER
                    </p>
                    <p className="text-[18px] font-[300]">
                      {user.experience === "LESS_THAN_2"
                        ? "0 - 2 "
                        : user.experience === "BETWEEN_2_AND_4"
                        ? "2 - 4 "
                        : "4+ "}{" "}
                      years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileGiver;
