import React from "react";
import EditProfile from "./editProfile";

const DashboardCard = (props: any) => {
  return (
    <main className="container mx-auto">
      <div className="max-w-md mx-auto rounded-xl overflow-hidden bg-white border-2 border-[#ECEEED]">
        <div className="flex justify-between items-center p-4 w-full">
          <div className="w-[40%]">
            <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col justify-center items-start w-[60%]">
            <div className="flex justify-start items-start ">
              <h2 className="text-xl font-poppins mr-1 font-medium">
                Tanner Myers
              </h2>
              <p className="text-[#4E4E4E] opacity-50 text-[11px] ml-2 font-poppins">
                (he/him)
              </p>
            </div>
            <div className="flex justify-start items-center font-poppins">
              <p className="text-[#4E4E4E] mr-2">30 Years</p>
              <div className="w-1 bg-black aspect-square rounded-full"></div>
              <p className="text-[#4E4E4E] ml-2">{"Alzheimer’s"}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mt-0">
            <h3 className="text-lg font-poppins mb-2">About</h3>
            <p className="text-[#4E4E4E] text-[13px] font-[300] p-4 rounded-xl font-poppins bg-[#ECEEED]">
              {`Hi, I'm Tanner Myers, a caregiver for 7 years, specializing in Alzheimer's. With extensive knowledge, I'll share tips to provide better care for your loved one. Let me help improve the quality of care by sharing my expertise with you.`}
            </p>
          </div>
          <div className="mt-4 font-poppins">
            <h3 className="text-lg font-poppins mb-2">Contact Information</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-[#ECEEED]">
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PHONE NUMBER</p>
                <p className="text-[15px] font-[300]">469-570-8561</p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">Email</p>
                <p className="text-[15px] font-[300]">tannermyers@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="mt-4 font-poppins">
            <h3 className="text-lg mb-2">Caregiving Experience</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-[#ECEEED]">
              <p className="text-[#4E4E4E]">4+ years</p>
            </div>
          </div>
          <div className="mt-4">
            <EditProfile />
          </div>
        </div>
      </div>
    </main>
  );
};
export default DashboardCard;
