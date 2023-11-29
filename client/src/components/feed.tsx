import { useApp } from "@/context/app";
import ThumbDownSharp from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltRounded from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpSharp from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltRounded from "@mui/icons-material/ThumbUpAltRounded";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Share_The_Care_Logo from "../../public/Share_The_Care_Logo.png";

const FeedCard = (props: any) => {
  const [isStarred, setIsStarred] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [likesCount, setLikesCount] = useState<number>(
    props.data.favoritedBy.reduce((count: number, obj: any) => {
      if (obj.isLiked) {
        return count + 1;
      }
      return count;
    }, 0),
  );

  const refreshPage = () => {
    window.location.reload();
  };
  

  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const { session } = useApp();

  async function handleApiResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  }

  async function fetchUserFavorites() {
    try {
      const response = await fetch(`/api/userFavourites`);
      return handleApiResponse(response);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      throw error;
    }
  }

  async function addUserFavorite(
    resourceId: any,
    isStarred: boolean | undefined,
    isLiked: boolean | undefined,
    isDisliked: boolean | undefined,
  ) {
    try {
      console.log(resourceId, isStarred, isLiked, isDisliked);
      const response = await fetch("/api/userFavourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resourceId,
          isStarred,
          isLiked,
          isDisliked,
        }),
      });
      return handleApiResponse(response);
    } catch (error) {
      console.error("Error adding user favorite:", error);
      throw error;
    }
  }

  async function setValues() {
    setIsStarred((isStarred) => !isStarred);
  }

  const handleStarClick = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    status: boolean,
  ) => {
    e.preventDefault();
    await setValues();
    try {
      const createdFavorite = await addUserFavorite(
        props.data.id,
        status,
        isLiked,
        isDisliked,
      );
      console.log("New user favorite:", createdFavorite);
    } catch (error) {
      console.error("Error adding user favorite:", error);
    }

    queryClient.invalidateQueries(["profile", session?.user.id]);
  };

  const handleLikeClick = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    status: boolean,
  ) => {
    e.preventDefault();
    setIsDisliked(false);
    if (isLiked) setLikesCount(likesCount - 1);
    else setLikesCount(likesCount + 1);
    setIsLiked(!isLiked);
    try {
      const createdFavorite = await addUserFavorite(
        props.data.id,
        isStarred,
        status,
        false,
      );
      queryClient.invalidateQueries(["profile", session?.user.id]);
    } catch (error) {
      console.error("Error adding user favorite:", error);
    }
  };

  const handleDislikeClick = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    status: boolean,
  ) => {
    e.preventDefault();
    setIsLiked(false);
    setIsDisliked(!isDisliked);
    try {
      await addUserFavorite(
        props.data.id,
        isStarred,
        false,
        status,
      );
      props.onDislike(props.data.id); // Call the callback passed from the parent
    } catch (error) {
      console.error("Error adding user favorite:", error);
    }
  };
  
  useEffect(() => {
    if (props.data.image.startsWith("http")) {
      setImageUrl(props.data.image);
      return;
    }

    const { data } = supabase.storage
      .from("resource-images")
      .getPublicUrl(props.data.image);

    setImageUrl(data?.publicUrl);
  }, [props.data.image]);

  useEffect(() => {
    fetchUserFavorites()
      .then((userFavorites) => {
        const matchingFavorite = userFavorites.find(
          (favorite: { resourceId: any }) =>
            favorite.resourceId === props.data.id,
        );

        if (matchingFavorite) {
          setIsStarred(matchingFavorite.isStarred);
          setIsLiked(matchingFavorite.isLiked);
          setIsDisliked(matchingFavorite.isDisliked);
        }
      })
      .catch((error) => {
        console.error("Error fetching user favorites:", error);
      });
  }, [props.data.id]);

  const textEllipse = (text: string) => {
    if (text.length > 100) {
      return text.slice(0, 100) + "...";
    } else {
      return text;
    }
  };

  return (
    <Link
      href={props.data.link}
      className="relative flex p-2 items-center bg-white border-2 border-[#D9D9D9] rounded-2xl hover:border-[#245B48] w-full dark:border-[#D9D9D9] dark:bg-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={imageUrl ?? ""}
        alt={props.data.title}
        aria-required
        className="object-cover object-center w-48 rounded-2xl bg-slate-200 aspect-square"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="-mt-4 text-2xl font-semibold tracking-tight text-gray-500 dark:text-gray-500">
          {props.data.title}
        </h5>
        <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-500 dark:text-gray-500">
          {textEllipse(props.data.description || "")}
        </h5>
        <p className="text-sm font-normal text-gray-400 dark:text-gray-400">
          {props.data.text}
        </p>
      </div>
      <div className="absolute bottom-2 right-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {isLiked ? (
              <ThumbUpAltRounded
                className="w-10 h-10 text-green-600 cursor-pointer"
                onClick={(event) => handleLikeClick(event, false)}
              />
            ) : (
              <ThumbUpSharp
                className="w-10 h-10 text-gray-500 cursor-pointer"
                onClick={(event) => handleLikeClick(event, true)}
              />
            )}
            <p className="font-medium text-gray-600"> {likesCount}</p>
          </div>
          {isDisliked ? (
            <ThumbDownAltRounded
              className="w-10 h-10 text-red-600 cursor-pointer"
              onClick={(event) => handleDislikeClick(event, false)}
            />
          ) : (
            <ThumbDownSharp
              className="w-10 h-10 text-gray-500 cursor-pointer"
              onClick={(event) => handleDislikeClick(event, true)}
            />
          )}
        </div>
      </div>
      <div className="absolute top-2 right-2">
        {isStarred ? (
          <FaStar
            className="text-yellow-500 cursor-pointer"
            size={20}
            onClick={(event) => handleStarClick(event, false)}
          />
        ) : (
          <FaRegStar
            className="text-gray-500 cursor-pointer"
            size={20}
            onClick={(event) => handleStarClick(event, true)}
          />
        )}
      </div>
    </Link>
  );
};

export default FeedCard;
