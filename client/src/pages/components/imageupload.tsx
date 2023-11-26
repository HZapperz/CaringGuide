import React from 'react';

interface ImageUploadProps {
    file: File | null;
    url: string;
    onFileChange: (file: File) => void;
  }
  
  const ImageUpload: React.FC<ImageUploadProps> = ({ file, url, onFileChange }) => {
    return (
      <div className="flex gap-8 py-4 items-center">
        <img
          className="p-0 rounded-full w-36 h-36 ring-4 ring-gray-300 dark:ring-gray-500"
          src={file ? URL.createObjectURL(file) : url || "default.jpeg"}
          alt="Profile"
          width={192}
          height={192}
        />
        <label className="p-2 text-sm bg-green-800 rounded-xl text-white hover:bg-green-700 cursor-pointer">
          <input
            title="file"
            type="file"
            name="image"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onFileChange(file);
              }
            }}
          />
          Upload Image
        </label>
      </div>
    );
  };
  
export default ImageUpload;