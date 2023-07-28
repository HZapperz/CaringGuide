import React from "react";
import JournalCard from "../components/journalCard";
import Nav from "@/components/nav";

const JournalEditor: React.FC = () => {
  return (
    <main className="bg-white w-screen min-h-screen">
      <div className="p-10 h-full">
        <div className="flex justify-between items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-2">
          <div>JOURNAL</div>
        </div>
        <div className="border-2 border-[#ECEEED flex flex-col md:flex-row justify-start items-start">
          <div className="container flex flex-col justify-start items-start min-h-full p-4 w-full md:w-96">
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 w-full md:w-80 overflow-auto">
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
          <div className="w-full flex flex-col justify-between items-start p-4">
            <input
              type="text"
              placeholder="Title"
              className="text-[30px] mb-2"
            />
            <textarea
              name="description"
              id="description"
              placeholder="Start typing"
              className="resize-none w-full h-96"
            ></textarea>
            <button
              type="button"
              className="bg-[#114D38] text-white rounded-lg px-4 py-2 mt-4"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JournalEditor;
