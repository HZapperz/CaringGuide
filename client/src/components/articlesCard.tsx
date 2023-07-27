import React from "react";
import articlsImage from "../../public/images/articles1.jpeg";
import Image from "next/image";

const ArticlesCard: React.FC = () => {
  return (
    <div className="bg-[#ECEEED] rounded-2xl w-60">
      <div className="flex justify-center items-center w-full h-40">
        <Image
          src={articlsImage}
          alt=""
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>
      <hr />
      <div className="flex flex-col p-2">
        <h2 className="text-[13px] font-[400] font-poppins mr-1">
          Alzheimer’s
        </h2>
        <p className="opacity-50 text-[10px] font-poppins">WebMD</p>
      </div>
    </div>
  );
};

export default ArticlesCard;
