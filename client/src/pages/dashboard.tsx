import React from "react";
import DashboardCard from "../components/dashboardGuideCard";
import DashboardCareCard from "@/components/dashboardCareCard";
import MenteeDashBoard from "@/components/mentee-dashboard";
import { WithOnBoarding } from "@/components/WithOnboarding";
import { useApp } from "@/context/app";
import MentorMatch from "@/components/mentor-match";

const Dashboard: React.FC = () => {
  const data = useApp();
  const profile = data.profile!;

  const mentees = profile.mentees || [];

  console.log(data);

  if (profile.role === "MENTEE" && !profile.mentor) {
    return <MentorMatch />;
  }

  if (profile.role === "MENTEE") {
    return <MenteeDashBoard />;
  }

  return (
    <main className="w-full bg-white">
      <div className="flex flex-col items-center h-full p-10 lg:flex-row lg:items-start xl:w-full">
        <div className="mb-2 lg:mr-2 lg:mb-0">
          <DashboardCard user={profile} care={true} />
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start min-h-fit rounded-xl border-2 border-[#ECEEED p-4 w-fit lg:w-full overflow-auto">
          <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4 h-fit">
            <div>MY CAREGIVERS</div>
          </div>
          <div className="flex flex-col items-center justify-start h-full overflow-auto lg:flex-row w-fit">
            {mentees.map((mentee, index) => (
              <div key={index} className="w-full mb-2 mr-0 lg:mr-2 lg:mb-0">
                <DashboardCareCard profile={mentee} />
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
