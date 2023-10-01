import { ICategory } from "@/types/category";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  description: string;
} & ICategory;

const getFontSize = (text: string) => {
  if (text.length > 15) return "text-xl";
  if (text.length > 8) return "text-2xl";
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
    "aspect-[3/2] flex justify-center items-center w-40 cursor-pointer shadow-xl p-2";
  const selectedStyles = "bg-green-800 text-xl border-8 border-green-900";
  const unselectedStyles = "bg-green-900 text-xl";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedCategory(value)}
      className={`${baseStyles} ${
        isSelected ? selectedStyles : unselectedStyles
      } relative`}
    >
      {!isHovered && (
        <h1 className={`z-10 font-semibold text-white ${getFontSize(label)}`}>
          {label}
        </h1>
      )}
      {isHovered && (
        <div className="absolute top-0 font-semibold left-0 w-full h-full bg-green-900 p-2 text-white overflow-auto text-xs z-20 button-hover flex justify-center items-center">
          {description}
        </div>
      )}
    </div>
  );
};
export default CategoryCard;
