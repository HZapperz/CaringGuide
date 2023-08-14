import { useEffect, useState } from "react";
import articlesImage from "../../public/images/articles1.jpeg";
import Image from "next/image";
import useHandleErrors from "@/hooks/useHandleErrors";
import { Resources } from "@prisma/client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const ArticlesCard = ({ resource }: { resource: Resources }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const supabase = useSupabaseClient();
  const handleErrors = useHandleErrors();

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.storage
          .from("resource-images")
          .download(resource.image);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setImageUrl(url);
      } catch (error) {
        handleErrors(error);
      }
    })();
  }, [resource.image]);

  return (
    <div className="bg-[#ECEEED] rounded-2xl w-60">
      <div className="flex justify-center items-center w-full h-40">
        <Image
          src={imageUrl || articlesImage}
          alt=""
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>
      <hr />
      <div className="flex flex-col p-2">
        <h2 className="text-[13px] font-[400] font-poppins mr-1">
          {resource.title}
        </h2>
        <p className="opacity-50 text-[10px] font-poppins">
          {resource.description}
        </p>
      </div>
    </div>
  );
};

export default ArticlesCard;
