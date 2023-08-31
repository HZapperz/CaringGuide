import { ICategory } from "@/types/category";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
} & ICategory;

const CategoryCard = ({ label, value, setSelectedCategory }: Props) => {
  return (
    <div
      onClick={() => setSelectedCategory(value)}
      className={`aspect-[5/3] flex justify-center items-center xl:w-full xl:min-w-0 min-w-[240px] cursor-pointer shadow-xl`}
      style={{
        backgroundImage: `url(/images/category/general.jpg)`,
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
