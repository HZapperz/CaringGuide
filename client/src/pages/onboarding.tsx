import React, { useState } from "react";
import Caregiver from "../components/caregiver";
import Guide from "../components/caregiver";

const OnBoarding = () => {
  const [caregiver, setCareGiver] = useState(1);

  return (
    <>
      <div className="p-16 bg-white">
        <div className="pb-8">
          <h1 className="font-poppins text-3xl font-[600]">Onboarding</h1>
        </div>
        <div className="flex justify-around items-center mb-8">
          <div
            onClick={() => {
              setCareGiver(1);
            }}
            className={
              "w-96 h-56 p-8 text-center border-2 rounded-2xl flex flex-col justify-center items-center cursor-pointer" +
              (caregiver === 1
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
              setCareGiver(2);
            }}
            className={
              "w-96 h-56 p-8 text-center border-2 rounded-2xl flex flex-col justify-center items-center cursor-pointer" +
              (caregiver === 2
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
        {caregiver === 1 ? <Caregiver /> : <Guide />}
      </div>
    </>
  );
};

export default OnBoarding;
