"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icons";

export default function ImageWithPreview(imageProps) {
  const [isOpen, setIsOpen] = useState(false);

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
  return (
    <>
      {/* Thumbnail */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer inline-block"
      >
        <Image {...imageProps} />
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
