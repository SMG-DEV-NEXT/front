"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Text from "@/components/Text";
import Icon from "@/components/Icons";
import { useTranslations } from "next-intl";

export default function AdminUploadImage({
  label,
  value,
  onChange,
  size,
  width = 72,
  height = 72,
}) {
  const [uploading, setUploading] = useState(false);
  const t = useTranslations("admin");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (uploading) return;
    fileInputRef.current.click(); // Open file picker
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FileReader();
    formData.onloadend = async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: formData.result }),
        });

        const data = await response.json();

        onChange(data.url);
      } catch (error) {
      } finally {
        setUploading(false);
      }
    };
    formData.readAsDataURL(file);
  };

  const clear = () => {
    onChange("");
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col">
        <Text T="admin" className="text-[#E9E3F7]" weight="semi">
          {label}
        </Text>
        <Text T="none" className="text-linkColor" weight="normal">
          {t("size")} {Number.isNaN(size) ? `${size} x ${size}` : size}
        </Text>
      </div>
      <div
        onClick={handleClick}
        className="flex cursor-pointer w-full flex-col gap-4 items-center justify-center  min-h-[102px] bg-input border border-dashed border-[#7B829333] rounded-[12px] p-5"
      >
        <Icon name="upload" folder="admin" size={40} />
      </div>
      <input
        type="file"
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
            className={`rounded-md mt-1`}
          />
        </div>
      )}
    </div>
  );
}
