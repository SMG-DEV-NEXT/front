"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "../Icons";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import "./style.scss";
export default function ImageWithPreview({
  isHavePreview = true,
  ...imageProps
}) {
  const [isOpen, setIsOpen] = useState(false);
  const blockRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: 250,
    height: 300,
  });

  const [mediaSize, setMediaSize] = useState(null);

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
  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;

    // Рассчитаем ширину и высоту с ограничениями
    const maxWidth = window.innerHeight * 0.9; // 90vh
    const maxHeight = window.innerHeight - 200; // 100% - 30px
    let width = naturalWidth;
    let height = naturalHeight;

    // Масштабируем пропорционально, если превышает лимиты
    if (width > maxWidth) {
      const ratio = maxWidth / width;
      width = maxWidth;
      height = height * ratio;
    }

    if (height > maxHeight) {
      const ratio = maxHeight / height;
      height = maxHeight;
      width = width * ratio;
    }

    setMediaSize({ width, height });
  };
  if (dimensions.height === 0) return null;
  return (
    <>
      {/* Thumbnail */}
      <div
        onClick={() => {
          if (imageProps.onClick) {
            imageProps.onClick();
          } else if (isHavePreview) {
            setIsOpen(true);
          }
        }}
        ref={blockRef}
        style={{
          width: dimensions.width,
          maxWidth: "100%",
          cursor: isHavePreview ? "pointer" : "default",
        }}
        className="relative  overflow-hidden rounded-[16px] cursor-pointer w-full inline-block overflow-hidden group"
      >
        <Image
          {...imageProps}
          width={dimensions.width}
          height={dimensions.height}
          style={{ height: 180, objectFit: "cover" }}
        />

        {/* Overlay при наведении */}
        <div
          style={{ display: isHavePreview ? "flex" : "none" }}
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
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
          <div className="fixed flex items-center justify-center w-full h-[100vh] top-0 left-0 z-[200] bg-input bg-opacity-80">
            {" "}
            {/* Close Button */}{" "}
            <div
              className="fixed top-0 left-0 w-full h-screen z-[10] bg-input bg-opacity-80"
              onClick={() => setIsOpen(false)}
            ></div>{" "}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer z-[12]"
            >
              {" "}
              <Icon name="close" folder="admin" />{" "}
            </button>{" "}
            <div
              style={
                mediaSize
                  ? {
                      height: `calc(${mediaSize.height}px)`,
                      width: `calc(${mediaSize.width}px)`,
                    }
                  : { height: "auto", width: "auto" }
              }
              className="relative z-[15] flex items-center justify-center bg-black zoom-image"
            >
              {" "}
              <Image
                src={imageProps.src}
                alt={imageProps.alt || "preview"}
                fill
                className="object-contain "
                priority
                onLoad={handleLoad}
              />{" "}
            </div>{" "}
          </div>,
          document.body
        )}
    </>
  );
}
