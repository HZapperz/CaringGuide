import React from "react";
import DashboardCard from "../components/dashboardGuideCard";
import DashboardCareCard from "@/components/dashboardCareCard";
import MenteeDashBoard from "@/components/mentee-dashboard";
import { WithOnBoarding } from "@/components/WithOnboarding";
import { useApp } from "@/context/app";

const Dashboard: React.FC = () => {
  const data = useApp();
  const profile = data.profile!;

  const mentees = profile.mentees || [];

  if (profile.role === "MENTEE") {
    return <MenteeDashBoard />;
  }

  return (
    <main className="bg-white w-full">
      <div className="flex flex-col lg:flex-row items-center lg:items-start p-10 h-full xl:w-full">
        <div className="lg:mr-2 mb-2 lg:mb-0">
          <DashboardCard user={profile} care={true} />
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start min-h-fit rounded-xl border-2 border-[#ECEEED p-4 w-fit lg:w-full overflow-auto">
          <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4 h-fit">
            <div>MY CAREGIVERS</div>
          </div>
          <div className="flex flex-col lg:flex-row justify-start items-center h-full w-fit overflow-auto">
            {mentees.map((mentee, index) => (
              <div key={index} className="lg:mr-2 mr-0 mb-2 lg:mb-0 w-full">
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
