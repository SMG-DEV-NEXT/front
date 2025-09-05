"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Text from "@/components/Text";
import Icon from "@/components/Icons";
import { useTranslations } from "next-intl";
import { axiosImageUpload } from "@/api";

const types = {
  image: ".jpg, .jpeg, .png, .gif, .bmp, .webp, .svg, .tiff, .ico",
  video: ".mp4, .mov, .avi, .wmv, .flv, .mkv, .webm, .mpeg",
};
export default function AdminUploadImage({
  label,
  value,
  onChange,
  size,
  width = 72,
  type = "image",
  height = 72,
}) {
  const [uploading, setUploading] = useState(false);
  const t = useTranslations("admin");
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (uploading) return;
    fileInputRef.current.click(); // Open file picker
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file); // MUST be 'file'
    try {
      const { data } = await axiosImageUpload.post("upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.url) {
        onChange(`${process.env.NEXT_PUBLIC_API_URL}${data.url}`); // your callback with uploaded URL
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // 👈 сброс значения
      }
    }
  };

  const clear = () => {
    onChange("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length === 1) {
      handleFileChange({ target: { files } }); // Simulate the same as file input change
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col">
        <Text
          T="admin"
          className="text-[#E9E3F7] dark:text-linkColor"
          weight="semi"
        >
          {label}
        </Text>
        {size && (
          <Text T="none" className="text-linkColor " weight="normal">
            {t("size")} {Number.isNaN(size) ? `${size} x ${size}` : size}
          </Text>
        )}
      </div>
      <div
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()} // Allow drop
        onDrop={handleDrop}
        aria-disabled={uploading}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        className={`flex cursor-pointer w-full flex-col gap-1 items-center justify-center min-h-[102px] border border-dashed rounded-[12px] p-5 transition-colors ${
          isDragging
            ? "bg-blue-100 border-blue-500"
            : "bg-input dark:bg-white border-[#7B829333]"
        }`}
      >
        {uploading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <Icon name="upload" folder="admin" size={40} />
          </>
        )}
      </div>
      <input
        type="file"
        accept={types[type] ? types[type] : type}
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {value && (
        <div className="mt-2 relative" style={{ maxWidth: "max-content" }}>
          <div
            onClick={clear}
            className="absolute top-0 right-0 rounded-full bg-[#0000007A] cursor-pointer p-[5px]"
          >
            <Icon name="close" folder="admin" size={18} />
          </div>
          <img
            src={value}
            width={width}
            height={height}
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            alt="Uploaded preview"
            className={`rounded-2xl mt-1`}
          />
        </div>
      )}
    </div>
  );
}
