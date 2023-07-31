import React, { useEffect, useState } from "react";
import EditProfile from "./editProfile";

const DashboardCard = (props: any) => {
  const [age, setAge] = useState<number>();

  useEffect(() => {
    const today = new Date();
    const dobDate = new Date(props.user.dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    setAge(age);
  }, [age]);

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
                {props.user.firstName + " " + props.user.lastName}
              </h2>
              <p className="text-[#4E4E4E] opacity-50 text-[11px] ml-2 font-poppins">
                ({props.user.gender === "male" ? "he/him" : "she/her"})
              </p>
            </div>
            <div className="flex justify-start items-center font-poppins">
              <p className="text-[#4E4E4E] mr-2">{age} Years</p>
              <div className="w-1 bg-black aspect-square rounded-full"></div>
              <p className="text-[#4E4E4E] ml-2">{props.user.condition}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mt-0">
            <h3 className="text-lg font-poppins mb-2">About</h3>
            <p className="text-[#4E4E4E] text-[13px] font-[300] p-4 rounded-xl font-poppins bg-[#ECEEED]">
              {props.user.about}
            </p>
          </div>
          <div className="mt-4 font-poppins">
            <h3 className="text-lg font-poppins mb-2">Contact Information</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-[#ECEEED]">
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PHONE NUMBER</p>
                <p className="text-[15px] font-[300]">
                  {props.user.phone ? props.user.phone : "Not Provided"}
                </p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">Email</p>
                <p className="text-[15px] font-[300]">
                  {props.user.email ? props.user.email : "Not Provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 font-poppins">
            <h3 className="text-lg mb-2">Caregiving Experience</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-[#ECEEED]">
              <p className="text-[#4E4E4E]">
                {props.user.experience === "LESS_THAN_2"
                  ? "0 - 2 "
                  : props.user.experience === "BETWEEN_2_AND_4"
                  ? "2 - 4 "
                  : "4+ "}
                years
              </p>
            </div>
          </div>
          <div className="mt-4">
            <EditProfile user={props.user} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default DashboardCard;
