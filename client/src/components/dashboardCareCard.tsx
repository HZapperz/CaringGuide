import React from "react";

const DashboardCareCard = (props: any) => {
  return (
    <main className="container mx-auto w-96">
      <div className="max-w-md mx-auto rounded-xl overflow-hidden bg-[#ECEEED] border-2 border-white">
        <div className="flex justify-between items-center p-4 w-full">
          <div className="w-[40%]">
            <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col justify-center items-start w-[60%]">
            <div className="flex justify-start items-start ">
              <h2 className="text-xl font-poppins mr-2">John Doe</h2>
              <p className="text-gray-600 ml-2 font-poppins">(he/him)</p>
            </div>
            <div className="flex justify-start items-center font-poppins">
              <p className="text-gray-600 mr-2">30 Years</p>
              <div className="w-1 bg-black aspect-square rounded-full"></div>
              <p className="text-gray-600 ml-2">{"Alzheimer’s"}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mt-0 font-poppins">
            <h3 className="text-lg mb-2">Background Information</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-white">
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PATIENT RELATIONSHIP</p>
                <p className="text-[15px] font-[300]">Daughter</p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PATIENT CONDITION</p>
                <p className="text-[15px] font-[300]">
                  Intermediate (2-4 years)
                </p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">YEAR(S) AS CAREGIVER</p>
                <p className="text-[15px] font-[300]">1 year</p>
              </div>
            </div>
          </div>

          <div className="mt-4 font-poppins">
            <h3 className="text-lg mb-2">Contact Information</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-white">
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
            <h3 className="text-lg mb-2">About</h3>
            <p className="text-[#4E4E4E] text-[13px] font-[300] p-4 rounded-xl font-poppins bg-white">
              {`Hi, I'm Amy Jackson. My mother was diagnosed with Alzheimer's a couple years ago but I only started caregiving for her about a year ago. I am finding it difficult as someone who is also just beginning their career. I would love to get some advice from experienced caregivers.`}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default DashboardCareCard;
