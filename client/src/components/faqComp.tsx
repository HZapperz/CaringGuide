import React, { useState } from "react";
import Image from "next/image";

const FAQComp = (props: any) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div
      className={`flex flex-col justify-between items-center bg-white w-[100%] lg:w-[60%] px-6 xl:px-8 py-2 xl:py-4 rounded-xl mb-2 xl:mb-6 mt-4 xl:mt-8 ${
        showAnswer ? "open" : ""
      }`}
      onClick={toggleAnswer}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex justify-start items-center">
          <div className="mr-10">
            <Image src={props.image} alt="" className="w-10 aspect-square" />
          </div>
          <div className="text-[#4E4E4E] text-center font-poppins text-[20px] xl:text-[30px] font-medium">
            {props.question}
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-8 h-8 ${showAnswer ? "rotate-180" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
      {showAnswer && (
        <div className="w-full font-poppins text-[16px] xl:text-[24px] font-normal mt-2 xl:mt-4">
          {props.answer}
        </div>
      )}
    </div>
  );
};

export default FAQComp;
