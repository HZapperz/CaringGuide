import { ICategory } from "@/types/category";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
} & ICategory;

const CategoryCard = ({ label, value, setSelectedCategory }: Props) => {
  return (
    <div
      onClick={() => setSelectedCategory(value)}
      className={`aspect-[5/3] flex justify-center items-center h-40 cursor-pointer shadow-xl`}
      style={{
        backgroundImage: `url(/images/category/${value.toLocaleLowerCase()}.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="z-10 text-2xl font-semibold text-white lg:text-4xl">
        {label}
      </h1>
    </div>
  );
};

export default CategoryCard;
