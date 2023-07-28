import React from "react";

const JournalCard: React.FC = () => {
  return (
    <div className="bg-[#ECEEED] rounded-2xl p-[15px] mr-0 w-full">
      <div className="flex justify-start items-start font-poppins text-[#4E4E4E] text-2xl font-medium">
        <h2 className="text-xl font-poppins mr-1 font-medium">FINANCES</h2>
        <p className="opacity-50 text-[11px] ml-2 font-poppins">05/11/2023</p>
      </div>
      <div className="text-[#4E4E4E] font-[300] text-[13px]">
        Make a spreadsheet to account for finances and understand what spending
        looks like, use Tanner’s templ...
      </div>
    </div>
  );
};

export default JournalCard;
