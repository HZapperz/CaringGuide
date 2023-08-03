import React, { useEffect, useState } from "react";
import articlesImage from "../../public/images/articles1.jpeg";
import Image from "next/image";
import { Loading } from "@nextui-org/react";

const ArticlesCard = (props: any) => {
  const [data, setData] = useState<any>();
  const [loader, setLoader] = useState(false);

  const getResource = async () => {
    setLoader(true);
    try {
      const response = await fetch(`/api/resources/resourceById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props.data.resourceId }),
      });
      if (response.ok) {
        const resData = await response.json();
        console.log(resData);
        setData(resData);
      } else {
        console.error("Error getting Matches:", response);
      }
    } catch (error) {
      console.error("Error getting Matches:", error);
    }
    setLoader(false);
  };

  useEffect(() => {
    console.log(props.data.resourceId);
    if (props.data.resourceId) {
      getResource();
    }
  }, []);

  if (loader)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <div className="bg-[#ECEEED] rounded-2xl w-60">
      <div className="flex justify-center items-center w-full h-40">
        <Image
          src={data?.imgsrc || articlesImage}
          alt=""
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>
      <hr />
      <div className="flex flex-col p-2">
        <h2 className="text-[13px] font-[400] font-poppins mr-1">
          {data?.title}
        </h2>
        <p className="opacity-50 text-[10px] font-poppins">WebMD</p>
      </div>
    </div>
  );
};

export default ArticlesCard;
