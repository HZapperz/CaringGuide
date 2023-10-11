import { Resources } from "@prisma/client";
import ReviewForm from "./reviewForm";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
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

  const [reviews, setReviews] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const response = await fetch(`/api/reviews/${resource.id}`);
  //     const data = await response.json();
  //     if (Array.isArray(data)) {
  //       setReviews(data);
  //     } else {
  //       // Handle error or set a default state here
  //       console.error("Expected reviews to be an array, got:", data);
  //       setReviews([]);
  //     }
  //   };

  //   fetchReviews();
  // }, [resource.id]);

  const getFaviconLink = (link: string) => {
    try {
      const url = new URL(link);
      return `${url.origin}/favicon.ico`;
    } catch (err) {
      console.error("Error generating favicon link:", err);
      return ""; // default or error image link
    }
  };

  const faviconLink = getFaviconLink(resource.link);

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
      onClick={() => router.push(resource.link)} // Making the entire card clickable
      className="bg-[#ECEEED] cursor-pointer rounded-2xl w-full p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Title, Image as profile and Star Icon */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src={faviconLink || imageUrl} // fallback to `imageUrl` if favicon link is not valid
            alt={resource.title}
            width={48}
            height={48}
            className="mr-3 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium">{resource.title}</h3>
            <span className="text-xs opacity-80">Wrote an Article</span>
          </div>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            handleStarClick(e);
          }}
          className="cursor-pointer"
        >
          {isStarred ? (
            <FaStar className="text-yellow-500" size={20} />
          ) : (
            <FaRegStar className="text-gray-500" size={20} />
          )}
        </div>
      </div>

      {/* Resource Description */}
      <div className="mt-4 mb-4 p-3 bg-gray-100 rounded-md">
        {resource.description}
      </div>

      {/* Reviews */}
      <div>
        {Array.isArray(reviews) &&
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-3 rounded mt-2 shadow-sm"
            >
              <h4 className="font-medium">{review.authorName}</h4>
              <div className="flex items-center mt-2 mb-2">
                {/* Display thumbs up or thumbs down based on rating */}
                {review.rating >= 3 ? (
                  <FaThumbsUp className="text-green-500" size={14} />
                ) : (
                  <FaThumbsDown className="text-red-500" size={14} />
                )}
              </div>
              <div className="text-xs">{review.comment}</div>
            </div>
          ))}
      </div>

      {/* Review Form */}
      {session && (
        <ReviewForm
          resourceId={resource.id}
          userId={session.user.id}
          onNewReview={(review) =>
            setReviews((prev) =>
              Array.isArray(prev) ? [...prev, review] : [review]
            )
          }
        />
      )}
    </div>
  );
};

export default ArticlesCard;
