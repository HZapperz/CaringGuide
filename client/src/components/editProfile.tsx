import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const EditProfile: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <>
      <button
        type="button"
        onClick={togglePopup}
        className="flex justify-center items-center border-2 border-[#ECEEED] rounded-2xl text-[#4E4E4E] px-4 py-2 lg:px-8 lg:py-4 mt-2 font-poppins font-[400] text-[16px] tracking-normal text-center w-full"
      >
        Edit Profile
      </button>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="flex flex-col bg-white p-6 rounded-2xl shadow-lg w-[70%]">
            <div className="flex justify-end items-end">
              <div className="w-10 cursor-pointer" onClick={togglePopup}>
                <XMarkIcon />
              </div>
            </div>
            <div className="flex justify-between items-start mt-2">
              <div className="flex justify-start items-center p-4 w-full">
                <div className="w-[25%] mr-4">
                  <div className="w-[100%] aspect-square rounded-full bg-gray-300"></div>
                </div>
                <div className="flex flex-col justify-center items-start w-[60%]">
                  <div className="flex justify-start items-center ">
                    <h2 className="text-[40px] font-poppins mr-1 font-medium">
                      Tanner Myers
                    </h2>
                    <p className="text-[#4E4E4E] opacity-50 text-[20px] ml-2 font-poppins">
                      (he/him)
                    </p>
                  </div>
                  <div className="flex justify-start items-center font-poppins">
                    <p className="text-[#4E4E4E] text-[30px] font-[300] mr-2">
                      30 Years
                    </p>
                    <div className="w-1 bg-black aspect-square rounded-full"></div>
                    <p className="text-[#4E4E4E] text-[30px] font-[300] ml-2">
                      {"Alzheimer’s"}
                    </p>
                  </div>
                  <div className="flex justify-start items-center font-poppins">
                    <p className="text-[#4E4E4E] text-[30px] font-[300] mr-2">
                      7 years of caregiving experience
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-end w-[200px] font-poppins text-[20px] font-medium text-[#BE1347] cursor-pointer">
                edit profile
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-4">
              <div>
                <h3 className="text-2xl font-poppins mb-2">About</h3>
                <p className="text-[#4E4E4E] text-[20px] font-[300] p-4 rounded-xl font-poppins bg-[#ECEEED] h-80 overflow-auto">
                  {`Hi, I'm Tanner Myers, a caregiver for 7 years, specializing in Alzheimer's. With extensive knowledge, I'll share tips to provide better care for your loved one. Let me help improve the quality of care by sharing my expertise with you.`}
                </p>
              </div>
              <div className="font-poppins">
                <h3 className="text-2xl font-poppins mb-2">
                  Contact Information
                </h3>
                <div className="text-[#4E4E4E] p-4 rounded-xl bg-[#ECEEED] h-80">
                  <div className="text-[#4E4E4E]">
                    <p className="opacity-50 text-[15px]">PHONE NUMBER</p>
                    <p className="text-[25px] font-[300]">469-570-8561</p>
                  </div>
                  <div className="text-[#4E4E4E] mt-4">
                    <p className="opacity-50 text-[15px]">Email</p>
                    <p className="text-[25px] font-[300]">
                      tannermyers@gmail.com
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