import { ICategory } from "@/types/category";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  description: string;
} & ICategory;

const getFontSize = (text: string) => {
  if (text.length > 20) return "text-xl";
  if (text.length > 10) return "text-2xl";
  return "text-4xl";
};

const CategoryCard = ({
  label,
  value,
  setSelectedCategory,
  selectedCategory,
  description,
}: Props) => {
  const isSelected = value === selectedCategory;
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    "aspect-[5/3] flex justify-center items-center xl:w-full xl:min-w-0 min-w-[240px] cursor-pointer shadow-xl";
  const selectedStyles = "bg-green-700 text-4xl";
  const unselectedStyles = "bg-green-900 text-2xl";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedCategory(value)}
      className={`${baseStyles} ${
        isSelected ? selectedStyles : unselectedStyles
      } relative`}
    >
      <h1 className={`z-10 font-semibold text-white ${getFontSize(label)}`}>
        {label}
      </h1>
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-full p-2 bg-white text-black overflow-auto text-xs z-20">
          {description}
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
