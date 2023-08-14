import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useApp } from "@/context/app";

const EditProfileGiver = (props: any) => {
  const [showPopup, setShowPopup] = useState(false);
  const [age, setAge] = useState<number>();
  const app = useApp();
  const profile = app.profile;

  useEffect(() => {
    const today = new Date();
    const dobDate = new Date(props.user.dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    setAge(age);
  }, [age]);

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

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
                  <div className="flex flex-col justify-center items-start w-[60%] text-[#4E4E4E]">
                    <div className="flex items-center gap-2">
                      <h2 className="text-[20px] lg:text-[30px] font-poppins font-medium leading-3 uppercase ">
                        {props.user.firstName + " " + props.user.lastName}
                      </h2>
                      <p className="opacity-50 text-[10px] lg:text-[16px] font-poppins">
                        ({props.user.gender === "male" ? "he/him" : "she/her"})
                      </p>
                    </div>
                    <div className="flex items-center font-poppins">
                      <p className="text-[15px] lg:text-[20px] font-[300] mr-2">
                        {age} Years
                      </p>
                      <div className="w-1 bg-black rounded-full aspect-square" />
                      <p className="text-[15px] lg:text-[20px] font-[300] ml-2">
                        {props.user.condition}
                      </p>
                    </div>
                    <div className="flex items-center font-poppins">
                      <p className="text-[15px] lg:text-[20px] font-[300] mr-2">
                        7 years of caregiving experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-4">
                <div className="w-10 cursor-pointer" onClick={togglePopup}>
                  <XMarkIcon />
                </div>
                <Link
                  href={"/settings"}
                  className="text-end w-[200px] font-poppins text-[10px] lg:text-[20px] font-medium text-[#BE1347] cursor-pointer"
                >
                  edit profile
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 mt-4 lg:grid-cols-2 xl:grid-cols-3">
              <div className="flex flex-col gap-3">
                <h3 className="mb-2 text-xl lg:text-2xl font-poppins">About</h3>
                <p className="text-[16px] lg:text-[20px] font-[300] p-4 rounded-xl font-poppins bg-[#ECEEED] h-fit max-h-60 lg:h-60 overflow-auto">
                  {props.user.synopsis}
                </p>
              </div>
              <div className="flex flex-col gap-3 font-poppins">
                <h3 className="mb-2 text-2xl font-poppins">
                  Contact Information
                </h3>
                <div className="p-4 rounded-xl bg-[#ECEEED] h-fit max-h-60 lg:h-60">
                  <div className="text-[#4E4E4E]">
                    <p className="opacity-50 text-[15px] leading-3">PHONE NUMBER</p>
                    <p className="text-[18px] font-[300]">
                      {props.user.phone ? props.user.phone : "Not Provided"}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="opacity-50 text-[15px] leading-3">Email</p>
                    <p className="text-[18px] font-[300]">
                      {props.user.email ? props.user.email : "Not Provided"}
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
                      {props.user.relationShipToPatient}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="opacity-50 text-[15px] leading-3">PATIENT CONDITION</p>
                    <p className="text-[18px] font-[300]">
                      {props.user.condition}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="opacity-50 text-[15px] leading-3">
                      YEAR(S) AS CAREGIVER
                    </p>
                    <p className="text-[18px] font-[300]">
                      {props.user.experience === "LESS_THAN_2"
                        ? "0 - 2 "
                        : props.user.experience === "BETWEEN_2_AND_4"
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
