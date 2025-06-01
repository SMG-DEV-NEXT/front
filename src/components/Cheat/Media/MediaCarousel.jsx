"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Icon from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaCarousel({ items, initialIndex = 0, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const changeSlide = (newIndex, dir) => {
    const nextIndex = (newIndex + items.length) % items.length;
    setDirection(dir);
    setCurrent(nextIndex);
  };

  const prevSlide = () => changeSlide(current - 1, -1);
  const nextSlide = () => changeSlide(current + 1, 1);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    },
    [current]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col">
      {/* Top Bar */}
      <div className="w-full h-[36px] flex items-center justify-end px-4 bg-black/60">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-white hover:text-gray-300 p-1 mt-2"
          aria-label="Close carousel"
        >
          <Icon name="close" folder="admin" size={26} />
        </button>
      </div>

      {/* Carousel content */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl p-2 hover:text-gray-400 z-20 select-none"
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        {/* Slide container */}
        <div className="relative w-[90vw] h-[calc(100vh-36px)] flex items-center justify-center">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              {items[current].type === "video" ? (
                <video
                  controls
                  src={items[current].src}
                  className="max-h-full max-w-full object-contain rounded-lg"
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={items[current].src}
                    alt={`media-${current}`}
                    fill
                    className="object-contain rounded-lg"
                    priority
                    objectFit="contain"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl p-2 hover:text-gray-400 z-20 select-none"
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
