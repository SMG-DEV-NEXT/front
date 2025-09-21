"use client";

import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaCarousel({ items, initialIndex = 0, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    setFirstLoad(true); // reset on carousel open
  }, [items]);
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
    <>
      <div className="fixed inset-0 z-50  flex flex-col">
        {/* Top Bar */}
        <div className="w-full h-[36px] flex relative z-[51] items-center justify-end px-4 bg-black/60">
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
          <div
            className="fixed top-0 left-0 z-[49] w-full h-screen bg-black bg-opacity-80 backdrop-blur-sm cursor-pointer"
            onClick={() => {
              onClose();
            }}
          ></div>
          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 z-[51] -translate-y-1/2 text-white text-5xl p-2 hover:text-gray-400 z-20 select-none"
            aria-label="Previous slide"
          >
            &#10094;
          </button>

          {/* Slide container */}

          <AnimatePresence custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              exit="exit"
              initial={
                firstLoad
                  ? { scale: 0, opacity: 0 }
                  : { x: direction > 0 ? 300 : -300, opacity: 0 }
              }
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={() => setFirstLoad(false)}
              className="inset-0 w-full h-full flex items-center justify-center"
            >
              {items[current].type === "video" ? (
                <video
                  controls
                  src={items[current].src}
                  className=" object-contain z-[51] rounded-lg  max-w-[100%] max-h-[90vh]"
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={items[current].src}
                  alt=""
                  className="z-[51]  w-full max-w-[70%] max-h-[90vh] object-contain"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-4  z-[51] top-1/2 -translate-y-1/2 text-white text-5xl p-2 hover:text-gray-400 z-20 select-none"
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </div>
      </div>
    </>
  );
}
