import { Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const DashboardCareCard = (props: any) => {
  const [age, setAge] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    avatar: "",
    experience: "",
    condition: "",
    about: "",
    patientName: "",
    synopsis: "",
    relationShipToPatient: "",
    email: "",
    phone: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  const getDetailById = async (id: string) => {
    setLoading(true);
    try {
      console.log(id);
      const response = await fetch(`/api/user/userById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      console.log(response);
      if (response.ok) {
        const dataUser = await response.json();
        console.log("dataUser", dataUser);
        const today = new Date();
        const dobDate = new Date(dataUser?.dob);
        const age = today.getFullYear() - dobDate.getFullYear();
        setAge(age);
        setData(dataUser);
      } else {
        console.error("Error getting Matches:", response);
      }
    } catch (error) {
      console.error("Error getting Matches:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDetailById(props.user?.menteeId);
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  return (
    <main className="container mx-auto w-full lg:w-96">
      <div className="max-w-md mx-auto rounded-xl overflow-hidden bg-[#ECEEED] border-2 border-white">
        <div className="flex justify-between items-center p-4 w-full">
          <div className="w-[40%]">
            <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col justify-center items-start w-[60%]">
            <div className="flex justify-start items-start ">
              <h2 className="text-xl font-poppins mr-2">
                {data?.firstName + " " + data?.lastName}
              </h2>
              <p className="text-gray-600 ml-2 font-poppins">
                ({data?.gender === "male" ? "he/him" : "she/her"})
              </p>
            </div>
            <div className="flex justify-start items-center font-poppins">
              <p className="text-gray-600 mr-2"> {age} Years</p>
              <div className="w-1 bg-black aspect-square rounded-full"></div>
              <p className="text-gray-600 ml-2"> {data?.condition}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mt-0 font-poppins">
            <h3 className="text-lg mb-2">Background Information</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-white">
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PATIENT RELATIONSHIP</p>
                <p className="text-[15px] font-[300]">
                  {data?.relationShipToPatient}
                </p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PATIENT CONDITION</p>
                <p className="text-[15px] font-[300]">{data?.condition}</p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">YEAR(S) AS CAREGIVER</p>
                <p className="text-[15px] font-[300]">
                  {data?.experience === "LESS_THAN_2"
                    ? "0 - 2 "
                    : data?.experience === "BETWEEN_2_AND_4"
                    ? "2 - 4 "
                    : "4+ "}
                  YEAR(S) AS CAREGIVER
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 font-poppins">
            <h3 className="text-lg mb-2">Contact Information</h3>
            <div className="text-[#4E4E4E] p-4 rounded-xl bg-white">
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">PHONE NUMBER</p>
                <p className="text-[15px] font-[300]">
                  {data?.phone ? data?.phone : "Not Provided"}
                </p>
              </div>
              <div className="text-[#4E4E4E]">
                <p className="opacity-50 text-[10px]">Email</p>
                <p className="text-[15px] font-[300]">
                  {data?.email ? data?.email : "Not Provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 font-poppins">
            <h3 className="text-lg mb-2">About</h3>
            <p className="text-[#4E4E4E] text-[13px] font-[300] p-4 rounded-xl font-poppins bg-white">
              {data?.about || data?.synopsis}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default DashboardCareCard;
