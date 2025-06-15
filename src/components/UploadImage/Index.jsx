"use client";

import { useState, useRef } from "react";
import Text from "../Text";
import Icon from "../Icons";
import Image from "next/image";
import { axiosImageUpload } from "@/api";

export default function UploadImage({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // Open file picker
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file); // MUST be 'file'
    try {
      const { data } = await axiosImageUpload.post(
        "upload/image",
        formData,
        {}
      );
      if (data.url) {
        onChange(`${process.env.NEXT_PUBLIC_API_URL}${data.url}`); // your callback with uploaded URL
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Text className="text-primary10" weight="medium" size="sm">
        {label}
      </Text>
      <div className="flex bg-black rounded-[12px] py-[5px] px-4 justify-between items-center">
        <div className="flex items-center gap-2 w-[70%]">
          <Icon name="file" size={20} />
          {value ? (
            <Text
              T="none"
              className="text-linkColor w-[100%] overflow-hidden"
              weight="medium"
              size="sm"
            >
              {value}...
            </Text>
          ) : (
            <Text className="text-linkColor" weight="medium" size="sm">
              emptyFile
            </Text>
          )}
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            onClick={handleClick}
            className="cursor-pointer bg-primary10 py-2 px-3 rounded-[8px]"
            style={{ backgroundColor: "rgba(233, 227, 246, 0.2)" }}
            disabled={uploading}
          >
            {uploading ? (
              <Text className="text-primary10" weight="medium" size="sm">
                uploading
              </Text>
            ) : (
              <Text className="text-primary10" weight="medium" size="sm">
                choose
              </Text>
            )}
          </button>
        </div>
      </div>

      {value && (
        <div className="mt-2">
          <img
            src={value}
            width={24}
            height={24}
            alt="Uploaded preview"
            className="w-24 h-24 rounded-md mt-1"
          />
        </div>
      )}
    </div>
  );
}
