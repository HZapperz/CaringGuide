import { ICategory } from "@/types/category";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
} & ICategory;

const getFontSize = (text: string) => {
  if (text.length > 20) return "text-xl";
  if (text.length > 10) return "text-2xl";
  return "text-4xl";
};


const CategoryCard = ({ label, value, setSelectedCategory, selectedCategory }: Props) => {
  const isSelected = value === selectedCategory;
  
  const baseStyles = "aspect-[5/3] flex justify-center items-center xl:w-full xl:min-w-0 min-w-[240px] cursor-pointer shadow-xl";
  const selectedStyles = "bg-green-600 text-4xl";
  const unselectedStyles = "bg-green-300 text-2xl opacity-50";

  return (
    <div
      onClick={() => setSelectedCategory(value)}
      className={`${baseStyles} ${isSelected ? selectedStyles : unselectedStyles}`}
    >
      <h1 className={`z-10 font-semibold text-white ${getFontSize(label)}`}>
  {label}
</h1>
    </div>
  );
};


export default CategoryCard;
