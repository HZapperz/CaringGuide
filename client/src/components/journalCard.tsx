import { Journal } from "@prisma/client";
import React, { useEffect } from "react";

interface JournalCardProps {
  data: Journal;
  onEdit?: (journal: Journal) => void;
  isDashboard?: boolean;
}

const JournalCard: React.FC<JournalCardProps> = ({
  data,
  onEdit,
  isDashboard,
}) => {
  const [time, setTime] = React.useState("");
  const handleEditClick = () => {
    if (onEdit) {
      onEdit(data);
    }
  };

  useEffect(() => {
    const originalDateString = data.time;
    const date = new Date(originalDateString);

    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setTime(formattedDate);
  }, [time]);

  return (
    <div
      className={`bg-[#ECEEED] rounded-2xl p-4 w-full cursor-pointer flex flex-col gap-2 max-h-full md:max-w-none ${
        !isDashboard && "max-w-xs"
      }`}
      onClick={handleEditClick}
    >
      <div className="flex justify-start items-center font-poppins text-[#4E4E4E] text-2xl font-medium">
        <p className="mr-1 text-xl font-medium uppercase font-poppins whitespace-nowrap">
          {data.title}
        </p>
        <p className="opacity-50 text-[11px] ml-2 font-poppins">{time}</p>
      </div>
      <div
        className={`text-[#4E4E4E] font-light text-[13px] md:whitespace-normal ${
          !isDashboard && "overflow-hidden text-ellipsis whitespace-nowrap"
        }`}
      >
        {data.description}
      </div>
    </div>
  );
};

export default JournalCard;
