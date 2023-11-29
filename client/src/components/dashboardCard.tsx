import { Resources } from "@prisma/client";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { categoryLabels } from "../utils/enumToLabel";
import axios from "axios"; // Assuming you're using axios for HTTP requests

const DashboardCard = ({ resource, isFavorited, onFavoriteToggle }: { resource: Resources, isFavorited: boolean, onFavoriteToggle: (resourceId: string, newStatus: boolean) => void }) => {
  const [isStarred, setIsStarred] = useState(isFavorited);

  useEffect(() => {
    setIsStarred(isFavorited);
  }, [isFavorited]);

  const getDefaultCategoryImage = (category: string) => {
    const categoryInfo = categoryLabels.find((c) => c.value === category);
    return categoryInfo?.defaultImage || "/images/default.jpeg";
  };

  const [imageUrl, setImageUrl] = useState<string>(
    getDefaultCategoryImage(resource.category)
  );

  const handleStarClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const newStarredStatus = !isStarred;
    setIsStarred(newStarredStatus);

    try {
      // Update favorite status in the database
      await axios.post('api/userFavourites', { 
        resourceId: resource.id, 
        isStarred: newStarredStatus 
      });
     
      onFavoriteToggle(resource.id, newStarredStatus); // Notify parent component to update the list
    } catch (error) {
      console.error("Error updating favorite status:", error);
      // Optionally, revert the UI state if the update fails
      setIsStarred(!newStarredStatus);
    }
  };

  return (
    <div
      onClick={() => window.open(resource.link, '_blank')}
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
