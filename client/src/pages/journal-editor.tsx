import React from "react";
import JournalCard from "../components/journalCard";
import Nav from "@/components/nav";

const JournalEditor: React.FC = () => {
  return (
    <main className="min-h-screen bg-white w-screen">
      <Nav />
      <div className="p-10">
        <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb- h-full">
          <div>JOURNAL</div>
        </div>
        <div className="border-2 border-[#ECEEED h-full flex flex-col md:flex-row justify-start items-start">
          <div className="container flex flex-col justify-start items-start min-h-full p-4 w-full md:w-[40%]">
            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-fit overflow-auto">
              <div>
                <JournalCard />
              </div>
              <div>
                <JournalCard />
              </div>
              <div>
                <JournalCard />
              </div>
              <div>
                <JournalCard />
              </div>
            </div>
          </div>
          <hr className="w-2 h-full bg-[#ECEEED border-[#ECEEED" />
          <div className="w-full flex flex-col">
            <input type="text" placeholder="Title" className="text-[30]" />
            <textarea
              name="description"
              id="description"
              placeholder="Start typing"
              className="resize-none w-full h-full"
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JournalEditor;
