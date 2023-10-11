import { Resources } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useRouter } from "next/router";
import { useApp } from "@/context/app";
import { categoryLabels } from "../utils/enumToLabel";

const DashboardCard = ({ resource }: { resource: Resources }) => {
  const router = useRouter();
  const [isStarred, setIsStarred] = useState(false);

  const getDefaultCategoryImage = (category: string) => {
    const categoryInfo = categoryLabels.find((c) => c.value === category);
    return categoryInfo?.defaultImage || "/images/default.jpeg";
  };

  const [imageUrl, setImageUrl] = useState<string>(
    getDefaultCategoryImage(resource.category)
  );

  const handleStarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsStarred((prevState) => !prevState);
  };

  return (
    <div
      onClick={() => router.push(resource.link)}
      className="bg-[#ECEEED] cursor-pointer rounded-2xl w-full p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Resource Image */}
      <img
        src={imageUrl}
        alt={resource.title}
        className="object-cover w-full h-40 rounded-md mb-2"
      />
  
      {/* Title and Star Icon */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{resource.title}</h3>
        <div onClick={handleStarClick} className="cursor-pointer">
          {isStarred ? (
            <FaStar className="text-yellow-500" size={20} />
          ) : (
            <FaRegStar className="text-gray-500" size={20} />
          )}
        </div>
      </div>
    </div>
  );
};
  
export default DashboardCard;
