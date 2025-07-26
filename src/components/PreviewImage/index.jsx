"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icons";

export default function ImageWithPreview({ ...imageProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const blockRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: 250,
    height: 300,
  });

  // useEffect(() => {
  //   const img = new window.Image();
  //   img.src = imageProps.src;
  //   img.onload = () => {
  //     const aspectRatio = img.naturalHeight / img.naturalWidth;
  //     setDimensions({
  //       width: img.naturalWidth,
  //       height: 200,
  //       // height: Math.round(img.naturalWidth * aspectRatio),
  //     });
  //   };
  // }, [imageProps.src]);

  // Wait until height is known

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (dimensions.height === 0) return null;
  return (
    <>
      {/* Thumbnail */}
      <div
        onClick={() => imageProps.onClick()}
        ref={blockRef}
        style={{ width: dimensions.width, maxWidth: "100%" }}
        className="relative  overflow-hidden rounded-[16px] cursor-pointer w-full inline-block overflow-hidden group"
      >
        <Image
          {...imageProps}
          width={dimensions.width}
          height={dimensions.height}
          style={{ height: 180, objectFit: "cover" }}
        />

        {/* Overlay при наведении */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/10 p-3 rounded-full border border-white/30 backdrop-blur-sm hover:scale-110 transition-transform">
            {/* SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>

      {/* Fullscreen Preview */}
      {isOpen &&
        createPortal(
          <div className="fixed w-full h-[100vh] top-0 left-0 z-[200] bg-input  bg-opacity-80">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer z-[12]"
            >
              <Icon name="close" folder="admin" />
            </button>

            <Image
              src={imageProps.src}
              alt={imageProps.alt || "preview"}
              fill
              className="object-contain"
              priority
            />
          </div>,
          document.body
        )}
    </>
  );
}
