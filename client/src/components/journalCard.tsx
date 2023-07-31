import React from "react";

const JournalCard = (props: any) => {
  return (
    <div className="bg-[#ECEEED] rounded-2xl p-[15px] mr-0 w-full">
      <div className="flex justify-start items-start font-poppins text-[#4E4E4E] text-2xl font-medium">
        <h2 className="text-xl font-poppins mr-1 font-medium">
          {props.data.title}
        </h2>
        <p className="opacity-50 text-[11px] ml-2 font-poppins">
          {props.data.time}
        </p>
      </div>
      <div className="text-[#4E4E4E] font-[300] text-[13px]">
        {props.data.description}
      </div>
    </div>
  );
};

export default JournalCard;
