import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useApp } from "@/context/app";

const EditProfile = (props: any) => {
  const [showPopup, setShowPopup] = useState(false);
  const app = useApp();
  const profile = app.profile;

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  const [age, setAge] = useState<number>();

  useEffect(() => {
    const today = new Date();
    const dobDate = new Date(props.user?.dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    setAge(age);
  }, [age]);

  return (
    <>
      <button
        type="button"
        onClick={togglePopup}
        className="flex justify-center uppercase items-center border-2 border-[#ECEEED] rounded-2xl text-[#4E4E4E] px-4 py-2 lg:px-8 lg:py-4 mt-2 font-poppins font-[400] text-[16px] tracking-normal text-center w-full"
      >
        {props?.care ? "Edit Profile" : "See Profile"}
      </button>
      {showPopup && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col bg-white p-6 rounded-2xl shadow-lg w-[70%]">
            <div className="flex items-end justify-between">
              {props?.care ? (
                <div>
                  <Link
                    href={"/settings"}
                    className="text-end w-[200px] font-poppins text-[10px] lg:text-[20px] ml-4 font-medium text-[#BE1347] cursor-pointer"
                  >
                    edit profile
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
              <div className="w-10 cursor-pointer" onClick={togglePopup}>
                <XMarkIcon />
              </div>
            </div>
            <div className="flex items-start justify-between mt-2">
              <div className="flex items-center justify-start w-full p-4">
                <div className="w-[20%] mr-4">
                  {profile?.avatar ? (
                    <img
                      src={profile?.avatar}
                      alt="profile"
                      className="w-[80%] aspect-square rounded-full"
                    />
                  ) : (
                    <div className="w-[80%] aspect-square rounded-full bg-gray-300"></div>
                  )}
                </div>
                <div className="flex flex-col justify-center items-start w-[60%]">
                  <div className="flex items-center justify-start ">
                    <h2 className="text-[20px] lg:text-[30px] font-poppins mr-1 font-medium">
                      {props.user?.firstName + " " + props.user?.lastName}
                    </h2>
                  </div>
                  <div className="flex items-center justify-start font-poppins">
                    <p className="text-[#4E4E4E] text-[15px] lg:text-[20px] font-[300] mr-2">
                      {age} Years
                    </p>
                    <div className="w-1 bg-black rounded-full aspect-square"></div>
                    <p className="text-[#4E4E4E] text-[15px] lg:text-[20px] font-[300] ml-2">
                      {props.user?.condition}
                    </p>
                  </div>
                  <div className="flex items-center justify-start font-poppins">
                    <p className="text-[#4E4E4E] text-[15px] lg:text-[20px] font-[300] mr-2">
                      {props.user?.experience === "LESS_THAN_2"
                        ? "0 - 2 "
                        : props.user?.experience === "BETWEEN_2_AND_4"
                        ? "2 - 4 "
                        : "4+ "}
                      years of Guiding experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 mt-4 lg:grid-cols-2">
              <div>
                <h3 className="mb-2 text-xl lg:text-2xl font-poppins">My Story</h3>
                <p className="text-[#4E4E4E] text-[16px] lg:text-[20px] font-[300] p-4 rounded-xl font-poppins bg-[#ECEEED] h-fit max-h-60 lg:h-60 overflow-auto">
                  {props.user?.about}
                </p>
              </div>
              <div className="font-poppins">
                <h3 className="mb-2 text-2xl font-poppins">
                  Contact Information
                </h3>
                <div className="text-[#4E4E4E] p-4 rounded-xl bg-[#ECEEED] h-fit max-h-60 lg:h-60">
                  <div className="text-[#4E4E4E]">
                    <p className="opacity-50 text-[15px]">PHONE NUMBER</p>
                    <p className="text-[18px] font-[300]">
                      {props.user?.phone ? props.user?.phone : "Not Provided"}
                    </p>
                  </div>
                  <div className="text-[#4E4E4E] mt-4">
                    <p className="opacity-50 text-[15px]">Email</p>
                    <p className="text-[18px] font-[300]">
                      {props.user?.email ? props.user?.email : "Not Provided"}
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

export default EditProfile;
