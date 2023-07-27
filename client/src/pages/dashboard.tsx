import React from "react";
import DashboardCard from "../components/dashboardGuideCard";
import Nav from "@/components/nav";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import DashboardCareCard from "@/components/dashboardCareCard";

const Dashboard: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <div className="flex p-10 h-full">
        <div className="mr-2">
          <DashboardCard />
        </div>
        <div className="container flex flex-col justify-start items-start min-h-full rounded-xl border-2 border-[#ECEEED p-4 overflow-x-scroll">
          <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-4 w-full">
            <div>MY CAREGIVERS</div>
            <div className="flex w-16">
              <ChevronLeftIcon color="#4E4E4E" className="cursor-pointer" />
              <ChevronRightIcon color="#4E4E4E" className="cursor-pointer" />
            </div>
          </div>
          {/* Make this below div to be scrolled on above button click */}
          <div className="flex justify-start items-center">
            <DashboardCareCard />
            <DashboardCareCard />
            <DashboardCareCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
