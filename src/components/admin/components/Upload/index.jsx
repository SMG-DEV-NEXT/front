"use client";

import { axiosWithoutAuth } from "@/api";
import Icon from "@/components/Icons";
import Text from "@/components/Text";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";

const types = {
  image: ".jpg, .jpeg, .png, .gif, .bmp, .webp, .svg, .tiff, .ico",
  video: ".mp4, .mov, .avi, .wmv, .flv, .mkv, .webm, .mpeg",
};

const AdminUpload = ({
  links = [],
  onChange,
  name,
  countOfFiles = 1,
  label,
  width = 240,
  height = 130,
  type = "image",
}) => {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const t = useTranslations("admin");
  const fileInputRef = useRef(null);
  const handleClick = () => {
    if (uploading || countOfFiles === links.length) return;
    fileInputRef.current.click(); // Open file picker
  };
  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   setUploading(true);

  //   // Check if file is an image or video
  //   const isImage = file.type.startsWith("image/");
  //   const isVideo = file.type.startsWith("video/");

  //   if (isImage) {
  //     // Handle image as Base64
  //     const reader = new FileReader();
  //     reader.onloadend = async () => {
  //       try {
  //         const response = await fetch("/api/upload", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ image: reader.result }), // Send base64 data
  //         });

  //         const data = await response.json();
  //         if (data.url) {
  //           onChange(name, [...links, data.url]);
  //         }
  //       } catch (error) {
  //         console.error("Upload failed:", error);
  //       } finally {
  //         setUploading(false);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   } else if (isVideo) {
  //     // Handle video as FormData
  //     const formData = new FormData();
  //     formData.append("video", file);

  //     try {
  //       const response = await fetch("/api/upload", {
  //         method: "POST",
  //         body: formData, // Send raw file for videos
  //       });

  //       const data = await response.json();
  //       if (data.url) {
  //         onChange(name, [...links, data.url]);
  //       }
  //     } catch (error) {
  //       console.error("Upload failed:", error);
  //     } finally {
  //       setUploading(false);
  //     }
  //   } else {
  //     alert("Unsupported file type");
  //     setUploading(false);
  //   }
  // };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file); // MUST be 'file'
    try {
      const { data } = await axiosWithoutAuth.post("upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.url) {
        onChange(name, [
          ...links,
          `${process.env.NEXT_PUBLIC_API_URL}${data.url}`,
        ]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const clear = (i) => {
    const files = links.filter((e, index) => index !== i);
    onChange(name, files);
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
    <div className="flex p-4 flex-col gap-4 bg-input rounded-[16px] w-full">
      <div className="w-full flex items-center justify-between">
        <Text T="admin" weight="semi" size="md" className="text-primary10">
          {label}
        </Text>
        <Text T="none" weight="medium" size="md" className="text-linkColor">
          {links.length}/{countOfFiles}
        </Text>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept={types[type]}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
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
            : "bg-input border-[#7B829333]"
        }`}
      >
        {uploading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <Icon name="upload" folder="admin" size={40} />
            <Text T="admin" weight="medium" className="text-linkColor">
              {links.length === countOfFiles ? "uploaded" : "upload"}
            </Text>
          </>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {links.map((e, i) => {
          if (type === "video") {
            return (
              <div
                key={e}
                className="mt-2 relative"
                style={{ maxWidth: "max-content" }}
              >
                <div
                  onClick={() => clear(i)}
                  className="absolute top-0 right-0 z-[2] rounded-full bg-[#0000007A] cursor-pointer p-[5px]"
                >
                  <Icon name="close" folder="admin" size={18} />
                </div>
                <video
                  width={width}
                  height={height}
                  controls
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                  }}
                  alt="Uploaded preview"
                  className={`rounded-2xl mt-1 z-[1]`}
                >
                  <source src={e} type="video/mp4" />
                </video>
              </div>
            );
          }
          return (
            <div
              key={e}
              className="mt-2 relative"
              style={{ maxWidth: "max-content" }}
            >
              <div
                onClick={() => clear(i)}
                className="absolute top-0 right-0 rounded-full bg-[#0000007A] cursor-pointer p-[5px]"
              >
                <Icon name="close" folder="admin" size={18} />
              </div>
              <img
                src={e}
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
          );
        })}
      </div>
    </div>
  );
};

export default AdminUpload;
