import { Resources } from "@prisma/client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useRouter } from "next/router";
import { getCategoryLabel, categoryLabels } from "../utils/enumToLabel";
import { useApp } from "@/context/app";
import { useQueryClient } from "@tanstack/react-query";

const ArticlesCard = ({ resource }: { resource: Resources }) => {
  const [isStarred, setIsStarred] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { session } = useApp(); // Get session from useApp hook
  const queryClient = useQueryClient();

  const handleApiResponse = async (response: Response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  };

  const getDefaultCategoryImage = (category: string) => {
    const categoryInfo = categoryLabels.find((c) => c.value === category);
    return categoryInfo?.defaultImage || "/images/articles1.jpeg";
};


  const [imageUrl, setImageUrl] = useState<string>(
    getDefaultCategoryImage(resource.category)
  );
  
  const addUserFavorite = async (resourceId: any, isStarred: boolean) => {
    try {
      const response = await fetch("/api/userFavourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resourceId,
          isStarred,
        }),
      });
      return handleApiResponse(response);
    } catch (error) {
      console.error("Error adding user favorite:", error);
      throw error;
    }
  };

  const handleStarClick = async (event: React.MouseEvent) => {
    event.stopPropagation(); 

    setIsStarred((prevState) => !prevState);
    try {
      await addUserFavorite(resource.id, !isStarred);
      queryClient.invalidateQueries(["profile", session?.user.id]);
    } catch (error) {
      console.error("Error adding user favorite:", error);
    }
};



  useEffect(() => {
    (async () => {
      if (!resource.image || resource.image === "NaN") {
        return;
      }

      if (resource.image.startsWith("http")) {
        return setImageUrl(resource.image);
      }

      const { data, error } = await supabase.storage
        .from("resource-images")
        .download(resource.image);

      if (error) {
        return;
      }

      const url = URL.createObjectURL(data);
      setImageUrl(url);
    })();
  }, [resource.image]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/userFavourites`);
      const userFavorites = await handleApiResponse(response);
      const matchingFavorite = userFavorites.find(
        (favorite: { resourceId: any }) => favorite.resourceId === resource.id
      );
      if (matchingFavorite) {
        setIsStarred(matchingFavorite.isStarred);
      }
    })();
  }, [resource.id]);

  return (
    <div
      onClick={() => router.push(resource.link)}
      className="bg-[#ECEEED] cursor-pointer rounded-2xl w-full aspect-[2/1] min-[400px]:aspect-square button-hover"
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={imageUrl}
          alt=""
          width={200}
          height={200}
          className="object-cover w-full h-full rounded-t-2xl"
        />
      </div>
      <div className="flex flex-col p-2">
        <p className="text-sm font-[400] font-poppins whitespace-nowrap text-ellipsis overflow-hidden">
          {resource.title}
        </p>
        <div className="flex items-center justify-between gap-2">
          <p className="opacity-50 text-[10px] font-poppins whitespace-nowrap text-ellipsis overflow-hidden">
            {resource.description}
          </p>
          <div className="w-10 cursor-pointer star-hover" onClick={handleStarClick}>
            {isStarred ? (
              <FaStar className="text-yellow-500" size={20} />
            ) : (
              <FaRegStar className="text-gray-500" size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesCard;
