import React, { useRef } from "react";
import DashboardCard from "../components/dashboardGuideCard";
import Nav from "@/components/nav";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import DashboardCareCard from "@/components/dashboardCareCard";

const Dashboard: React.FC = () => {
  return (
    <main className="min-h-screen bg-white w-screen">
      <Nav />
      <div className="flex p-10 h-full w-full">
        <div className="mr-2">
          <DashboardCard />
        </div>
        <div className="container flex flex-col justify-start items-start min-h-full rounded-xl border-2 border-[#ECEEED p-4 w-full overflow-auto">
          <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4">
            <div>MY CAREGIVERS</div>
          </div>
          <div className="container flex justify-start items-center w-full overflow-auto">
            <div className="mr-2">
              <DashboardCareCard />
            </div>
            <div className="mr-2">
              <DashboardCareCard />
            </div>
            <div className="mr-2">
              <DashboardCareCard />
            </div>
            <div className="mr-2">
              <DashboardCareCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
