import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpSharp from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltRounded from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownSharp from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltRounded from "@mui/icons-material/ThumbDownAltRounded";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Image from "next/image";
import Link from "next/link";
import { Loading } from "@nextui-org/react";

const FeedCard = (props: any) => {
  const [isStarred, setIsStarred] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [loader, setLoader] = useState(false);

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
    isDisliked: boolean | undefined
  ) {
    setLoader(true);
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
      setLoader(false);
      return handleApiResponse(response);
    } catch (error) {
      console.error("Error adding user favorite:", error);
      throw error;
    }
  }

  async function setValues() {
    setIsStarred((isStarred) => !isStarred);
  }
  async function setLikeValues() {}

  const handleStarClick = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    status: boolean
  ) => {
    e.preventDefault();
    await setValues();
    setLoader(true);
    try {
      const createdFavorite = await addUserFavorite(
        props.data.id,
        status,
        isLiked,
        isDisliked
      );
      console.log("New user favorite:", createdFavorite);
    } catch (error) {
      console.error("Error adding user favorite:", error);
    }
    setLoader(false);
  };
  const handleLikeClick = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    status: boolean
  ) => {
    e.preventDefault();
    setIsDisliked(false);
    setIsLiked(!isLiked);
    try {
      const createdFavorite = await addUserFavorite(
        props.data.id,
        isStarred,
        status,
        false
      );
      console.log("New user favorite:", createdFavorite);
    } catch (error) {
      console.error("Error adding user favorite:", error);
    }
  };

  const handleDislikeClick = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    status: boolean
  ) => {
    e.preventDefault();
    setIsLiked(false);
    setIsDisliked(!isDisliked);
    setLoader(true);
    try {
      const createdFavorite = await addUserFavorite(
        props.data.id,
        isStarred,
        false,
        status
      );
      console.log("New user favorite:", createdFavorite);
    } catch (error) {
      console.error("Error adding user favorite:", error);
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchUserFavorites()
      .then((userFavorites) => {
        const matchingFavorite = userFavorites.find(
          (favorite: { resourceId: any }) =>
            favorite.resourceId === props.data.id
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

 if (loader)
   return (
     <div className="w-full h-full flex justify-center items-center">
       <Loading />
     </div>
   );

  return (
    <Link
      href={props.data.link}
      className="relative flex flex-col p-2 items-center bg-white border-2 border-[#D9D9D9] rounded-2xl hover:border-[#245B48] md:flex-row md:max-w-4xl dark:border-[#D9D9D9] dark:bg-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={props.data.imgsrc}
        alt="image"
        aria-required
        width={200}
        height={200}
        className="rounded-2xl md:h-48 md:w-48 w-full h-full object-cover"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="-mt-4 text-2xl text-gray-500 font-semibold tracking-tight dark:text-gray-500">
          {props.data.title}
        </h5>
        <h5 className="mb-2 text-lg text-gray-500 font-normal tracking-tight dark:text-gray-500">
          {props.data.sub}
        </h5>
        <p className="text-sm font-normal text-gray-400 dark:text-gray-400">
          {props.data.text}
        </p>
      </div>
      <div className="absolute top-1 right-1">
        <div className="flex">
          {isDisliked ? (
            <ThumbDownAltRounded
              className="h-10 w-10 text-green-800 cursor-pointer"
              onClick={(event) => handleDislikeClick(event, false)}
            />
          ) : (
            <ThumbDownSharp
              className="h-10 w-10 text-gray-500 cursor-pointer"
              onClick={(event) => handleDislikeClick(event, true)}
            />
          )}
          {isLiked ? (
            <ThumbUpAltRounded
              className="h-10 w-10 text-green-800 cursor-pointer"
              onClick={(event) => handleLikeClick(event, false)}
            />
          ) : (
            <ThumbUpSharp
              className="h-10 w-10 text-gray-500 cursor-pointer"
              onClick={(event) => handleLikeClick(event, true)}
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-1 right-1">
        {isStarred ? (
          <StarIcon
            className="h-10 w-10 text-green-800 cursor-pointer"
            onClick={(event) => handleStarClick(event, false)}
          />
        ) : (
          <StarBorderIcon
            className="h-10 w-10 text-gray-500 cursor-pointer"
            onClick={(event) => handleStarClick(event, true)}
          />
        )}
      </div>
    </Link>
  );
};

export default FeedCard;
