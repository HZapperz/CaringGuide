import { Journal } from "@prisma/client";
import React, { useEffect } from "react";

interface JournalCardProps {
  data: Journal;
  onEdit?: (journal: Journal) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({ data, onEdit }) => {
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
      className="bg-[#ECEEED] rounded-2xl p-[15px] mr-0 w-full cursor-pointer"
      onClick={handleEditClick}
    >
      <div className="flex justify-start items-start font-poppins text-[#4E4E4E] text-2xl font-medium">
        <h2 className="text-xl font-poppins mr-1 font-medium">{data.title}</h2>
        <p className="opacity-50 text-[11px] ml-2 font-poppins">{time}</p>
      </div>
      <div className="text-[#4E4E4E] font-[300] text-[13px]">
        {data.description}
      </div>
    </div>
  );
};

export default JournalCard;
