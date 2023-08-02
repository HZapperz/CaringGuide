import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Image from "next/image";
import Link from "next/link";

const FeedCard = (props: any) => {
  const [isStarred, setIsStarred] = useState(false);

  const handleStarClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    setIsStarred(!isStarred);
  };
  return (
    <Link
      href={props.data.link}
      className="relative flex flex-col p-2 items-center bg-white border-2 border-[#D9D9D9] rounded-2xl hover:border-[#245B48] md:flex-row md:max-w-4xl dark:border-[#D9D9D9] dark:bg-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={props.data.imgsrc}
        alt="image"
        aria-required
        width={200}
        height={200}
        className="rounded-2xl md:h-48 md:w-48 w-full h-full object-cover"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="-mt-4 text-2xl text-gray-500 font-semibold tracking-tight dark:text-gray-500">
          {props.data.title}
        </h5>
        <h5 className="mb-2 text-lg text-gray-500 font-normal tracking-tight dark:text-gray-500">
          {props.data.sub}
        </h5>
        <p className="text-sm font-normal text-gray-400 dark:text-gray-400">
          {props.data.text}
        </p>
      </div>
      <div className="absolute bottom-1 right-1">
        {isStarred ? (
          <StarIcon
            className="h-10 w-10 text-green-800 cursor-pointer"
            onClick={handleStarClick}
          />
        ) : (
          <StarBorderIcon
            className="h-10 w-10 text-gray-500 cursor-pointer"
            onClick={handleStarClick}
          />
        )}
      </div>
    </Link>
  );
};

export default FeedCard;
