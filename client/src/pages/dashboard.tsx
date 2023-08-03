import React, { useEffect, useState } from "react";
import DashboardCard from "../components/dashboardGuideCard";
import DashboardCareCard from "@/components/dashboardCareCard";
import MenteeDashBoard from "@/components/mentee-dashboard";
import { WithOnBoarding } from "@/components/WithOnboarding";
import { useApp } from "@/context/app";
import { Loading } from "@nextui-org/react";

const Dashboard: React.FC = () => {
  const data = useApp();
  const profile = data.profile!;
  const [mentorData, setMentorData] = useState();
  const [mentees, setMentees] = useState([]);
  const [loader, setLoader] = useState(false);

  const getDetailById = async (id: string) => {
    try {
      const response = await fetch(`/api/user/userById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const mentorData = await response.json();
        console.log(mentorData);
        setMentorData(mentorData);
      } else {
        console.error("Error getting Matches:", response);
      }
    } catch (error) {
      console.error("Error getting Matches:", error);
    }
  };

  const getMatchDetails = async () => {
    setLoader(true);
    try {
      const response = await fetch("/api/match", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const matchData = await response.json();
        if (profile.role === "MENTEE") {
          console.log(matchData.match[0]);
          await getDetailById(matchData.match[0].mentorId);
        } else {
          console.log(matchData);
          setMentees(matchData.match);
        }
      } else {
        console.error("Error getting Matches:", response);
      }
    } catch (error) {
      console.error("Error getting Matches:", error);
    }
    setLoader(false);
  };

  useEffect(() => {
    getMatchDetails();
  }, []);

  if (loader)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );

  if (profile.role === "MENTEE") {
    return <MenteeDashBoard user={profile} mentorData={mentorData} />;
  }

  return (
    <main className="bg-white w-full">
      <div className="flex flex-col lg:flex-row items-center lg:items-start p-10 h-full xl:w-full">
        <div className="lg:mr-2 mb-2 lg:mb-0">
          <DashboardCard user={profile} />
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start min-h-fit rounded-xl border-2 border-[#ECEEED p-4 w-fit lg:w-full overflow-auto">
          <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4 h-fit">
            <div>MY CAREGIVERS</div>
          </div>
          <div className="flex flex-col lg:flex-row justify-start items-center h-full w-fit overflow-auto">
            {mentees.map((mentee, index) => (
              <div key={index} className="lg:mr-2 mr-0 mb-2 lg:mb-0 w-full">
                <DashboardCareCard user={mentee} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default function Page() {
  return (
    <WithOnBoarding>
      <Dashboard />
    </WithOnBoarding>
  );
}
