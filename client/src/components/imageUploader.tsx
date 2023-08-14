import React, { useState, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { env } from "../env.mjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

interface ImageUploaderProps {
  setUrl: Function;
}

const Page = ({ setUrl }: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  async function getURL(path: string) {
    const { data } = supabase.storage.from("images").getPublicUrl(`${path}`);
    setUrl(data.publicUrl);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const filename = uuidv4() + "-" + file.name;
      console.log(filename, file);
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filename, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (data) {
        await getURL(data.path);
      }
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      console.log("No FIle");
      return;
    }
    setFile(files[0]);
  };

  return (
    <div>
      <input
        title="file"
        type="file"
        name="image"
        onChange={handleFileSelected}
      />
    </div>
  );
};

export default Page;
