import useHandleErrors from "@/hooks/useHandleErrors";
import { Resources } from "@prisma/client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { HeartFilledIcon } from "@radix-ui/react-icons";

const ArticlesCard = ({ resource }: { resource: Resources }) => {
  const [imageUrl, setImageUrl] = useState<string>("/images/articles1.jpeg");
  const supabase = useSupabaseClient();
  const handleErrors = useHandleErrors();

  useEffect(() => {
    (async () => {
      if (!resource.image || resource.image === "NaN") {
        return;
      }

      if (resource.image.startsWith("http")) {
        return setImageUrl(resource.image ?? null);
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

  return (
    <div className="bg-[#ECEEED] rounded-2xl w-full aspect-[2/1] min-[400px]:aspect-square">
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
          <div className="w-10">
            <HeartFilledIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesCard;
