import React from "react";

const SkeletonLoader = () => {
  return (
    <main className="container mx-auto w-full lg:w-96">
      <div className="max-w-md mx-auto rounded-xl overflow-hidden bg-[#ECEEED] border-2 border-white animate-pulse">
        <div className="flex justify-between items-center p-4 w-full">
          <div className="w-[40%]">
            <div className="w-24 h-24 my-2 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col justify-center items-start w-[60%]">
            <div className="flex justify-start items-start ">
              <div className="w-32 h-2 rounded my-2 bg-gray-300"></div>
              <div className="w-20 h-2 rounded my-2 bg-gray-300 ml-2"></div>
            </div>
            <div className="flex justify-start items-center">
              <div className="w-8 h-2 rounded my-2 bg-gray-300 mr-2"></div>
              <div className="w-2 h-2 my-2 rounded bg-gray-300 aspect-square rounded-full"></div>
              <div className="w-16 h-2 rounded my-2 bg-gray-300 ml-2"></div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mt-0">
            <h3 className="text-lg mb-2 bg-gray-300 h-2 my-2 rounded w-20">
              {""}
            </h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-white">
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px] bg-gray-300 w-20 h-2 rounded my-2"></p>
                <p className="text-[15px] font-[300] bg-gray-300 h-2 my-2 rounded w-40"></p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px] bg-gray-300 w-32 h-2 rounded my-2"></p>
                <p className="text-[15px] font-[300] bg-gray-300 h-2 my-2 rounded w-24"></p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px] bg-gray-300 w-56 h-2 rounded my-2"></p>
                <p className="text-[15px] font-[300] bg-gray-300 h-2 my-2 rounded w-32"></p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg mb-2 bg-gray-300 h-2 my-2 rounded w-32">
              {""}
            </h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-white">
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px] bg-gray-300 w-20 h-2 rounded my-2"></p>
                <p className="text-[15px] font-[300] bg-gray-300 h-2 my-2 rounded w-48"></p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px] bg-gray-300 w-16 h-2 rounded my-2"></p>
                <p className="text-[15px] font-[300] bg-gray-300 h-2 my-2 rounded w-40"></p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg mb-2 bg-gray-300 h-2 my-2 rounded w-20">
              {""}
            </h3>
            <p className="text-[#4E4E4E] text-[13px] font-[300] p-4 rounded-xl font-poppins bg-white h-16"></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SkeletonLoader;
