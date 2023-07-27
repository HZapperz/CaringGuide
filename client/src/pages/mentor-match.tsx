import Nav from "@/components/nav";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";

const MentorMatch: React.FC = () => {
  return (
    <main className="min-h-screen bg-white w-screen">
      <Nav />
      <div className="p-10 w-full">
        <div className="flex flex-col justify-between items-center font-poppins text-[#4E4E4E] text-5xl font-medium mb-4">
          <div className="flex justify-start items-start w-full">
            Your Top Match
          </div>
          <div className="absolute bottom-0 right-0 flex justify-center items-center w-full h-full">
            <div className="flex flex-col lg:flex-row justify-center items-center w-[85%] lg:w-[65%] xl:w-[50%] border-[3.5px] border-caring py-6 px-2 lg:py-12 lg:px-6 rounded-2xl">
              <div className="flex flex-col justify-center items-center mb-6 lg:mb-0 lg:mr-20 w-full lg:w-[40%]">
                <div className="w-48 h-48 rounded-full bg-gray-300 mb-4"></div>
                <div className="flex justify-start items-start ">
                  <h2 className="text-2xl font-poppins mr-1 font-medium">
                    Tanner Myers
                  </h2>
                  <p className="text-[#4E4E4E] opacity-50 text-[11px] ml-2 font-poppins">
                    (he/him)
                  </p>
                </div>
                <div className="flex justify-start items-center font-poppins">
                  <p className="text-[#4E4E4E] text-[15px] mr-2">30 Years</p>
                  <div className="w-1 bg-black aspect-square rounded-full"></div>
                  <p className="text-[#4E4E4E] text-[15px] ml-2">
                    {"Lewisville, TX"}
                  </p>
                </div>
              </div>
              <div className="w-[95%] sm:w-[80%] lg:w-[60%]">
                <div className="mt-0">
                  <h3 className="text-xl font-[500] font-poppins mb-2">
                    About
                  </h3>
                  <p className="text-[#4E4E4E] text-[16px] font-[300] rounded-xl font-poppins">
                    {`Hi, I'm John Alday, and I was a caregiver for about 7 years for someone with Alzheimer’s. Through my experience, I gained extensive knowledge on how to properly care for those with Alzheimer's. I have many little tips and tricks that could help you provide better care. Let me share my expertise with you and help improve the quality of care for your loved one.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 right-10 flex justify-end items-end w-full">
            <button
              type="submit"
              className="flex justify-between items-center bg-[#BE1347] rounded-xl px-4 py-2 mt-4"
            >
              <span className="text-white font-poppins font-medium text-2xl">
                Continue
              </span>
              <span className="w-10">
                <ChevronRightIcon color="white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MentorMatch;
