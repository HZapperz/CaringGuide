import React from "react";
import DashboardCard from "../components/dashboardGuideCard";
import DashboardCareCard from "@/components/dashboardCareCard";

const Dashboard: React.FC = () => {
  return (
    <main className="bg-white w-full">
      <div className="flex flex-col lg:flex-row items-center lg:items-start p-10 h-full xl:w-full">
        <div className="lg:mr-2 mb-2 lg:mb-0">
          <DashboardCard />
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start min-h-fit rounded-xl border-2 border-[#ECEEED p-4 w-fit lg:w-full overflow-auto">
          <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4 h-fit">
            <div>MY CAREGIVERS</div>
          </div>
          <div className="flex flex-col lg:flex-row justify-start items-center h-full w-full overflow-auto">
            <div className="lg:mr-2 mr-0 mb-2 lg:mb-0 w-full">
              <DashboardCareCard />
            </div>
            <div className="lg:mr-2 mr-0 mb-2 lg:mb-0 w-full">
              <DashboardCareCard />
            </div>
            <div className="lg:mr-2 mr-0 mb-2 lg:mb-0 w-full">
              <DashboardCareCard />
            </div>
            <div className="lg:mr-2 mr-0 mb-2 lg:mb-0 w-full">
              <DashboardCareCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
