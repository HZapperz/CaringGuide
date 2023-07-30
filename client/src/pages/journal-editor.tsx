import React from "react";
import JournalCard from "../components/journalCard";

const JournalEditor: React.FC = () => {
  return (
    <main className="p-10 flex flex-col bg-white w-full h-full">
      <div className="flex justify-start items-center font-poppins text-[#4E4E4E] text-2xl font-medium mb-2">
        JOURNAL
      </div>
      <div className="border-2 border-[#ECEEED flex flex-col md:flex-row justify-start items-start h-full rounded-xl">
        <div className="flex flex-col justify-start items-start p-4 w-fit h-fit">
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
        <hr className="md:h-full h-[2px] md:w-[2px] w-full bg-[#ECEEED  border border-[#ECEEED "></hr>
        <div className="w-full flex flex-col justify-between items-start p-4 h-full">
          <input
            type="text"
            placeholder="Title"
            className="font-poppins text-[30px] text-[#4E4E4E] font-[500] w-full mb-2"
          />
          <textarea
            name="description"
            id="description"
            placeholder="Start typing"
            className="font-poppins text-[20px] resize-none w-full h-full text-[#4E4E4E] font-[300]"
          ></textarea>
          <button
            type="button"
            className="bg-[#114D38] text-white rounded-lg px-4 py-2 mt-4"
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export default JournalEditor;
