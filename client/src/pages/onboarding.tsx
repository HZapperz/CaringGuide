import React, { useState } from "react";
import Caregiver from "../components/caregiver";
import Guide from "../components/guide";
import { Role } from "@prisma/client";

const OnBoarding = () => {
  const [role, setRole] = useState<Role>(Role.MENTEE);

  return (
    <>
      <div className="p-16 bg-white">
        <div className="pb-8">
          <h1 className="font-poppins text-3xl font-[600]">Onboarding</h1>
        </div>
        <div className="flex justify-around items-center mb-8">
          <div
            onClick={() => {
              setRole("MENTEE");
            }}
            className={
              "w-96 h-56 p-8 text-center border-2 rounded-2xl flex flex-col justify-center items-center cursor-pointer" +
              (role === "MENTEE"
                ? " border-2 border-caring"
                : " border-2 border-inactive")
            }
          >
            <h1 className="font-poppins text-3xl font-[400] text-[#4E4E4E] mb-4">
              Become a Caregiver
            </h1>
            <p className="font-poppins text-xl font-[400] text-[#4E4E4E] p-3">
              Receive guidance with caregiving from an experienced mentor
            </p>
          </div>
          <div
            onClick={() => {
              setRole("MENTOR");
            }}
            className={
              "w-96 h-56 p-8 text-center border-2 rounded-2xl flex flex-col justify-center items-center cursor-pointer" +
              (role === "MENTOR"
                ? " border-2 border-caring"
                : " border-2 border-inactive")
            }
          >
            <h1 className="font-poppins text-3xl font-[400] text-[#4E4E4E] mb-4">
              Become a Guide
            </h1>
            <p className="font-poppins text-xl font-[400] text-[#4E4E4E] p-3">
              Help inexperienced caregivers by offering advice and resources
            </p>
          </div>
        </div>
        <hr />
        {role === "MENTEE" ? <Caregiver /> : <Guide />}
      </div>
    </>
  );
};

export default OnBoarding;
