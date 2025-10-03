import React, { useEffect, useRef, useState } from "react";
import Text from "../../Text";
import Icon from "../../Icons";
import ImageWithPreview from "@/components/PreviewImage";
import { createPortal } from "react-dom";
import MediaCarousel from "./MediaCarousel";

import "../index.scss";

const smoothScrollX = (element, distance, duration = 500) => {
  if (!element) return;

  const start = element.scrollLeft;
  const startTime = performance.now();

  const animate = (time) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);

    element.scrollLeft = start + distance * progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

const Medias = ({ mobile, cheat }) => {
  const [isOpenCarousel, setIsOpenCarousel] = useState({
    isOpen: false,
    index: 0,
  });
  const scrollRef = useRef(null);

  // --- drag state ---
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // multiplier controls speed
    scrollRef.current.scrollLeft = scrollStart.current - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const getMediaItems = () => {
    const items = [];
    if (cheat.videos[0]) {
      items.push({
        src: cheat.videos[0],
        type: "video",
      });
    }
    cheat.images.map((e) => {
      items.push({
        src: e,
        type: "image",
      });
    });
    return items;
  };

  const scrollRight = () => {
    smoothScrollX(scrollRef.current, mobile ? 200 : 250, 300);
  };

  const scrollLeft = () => {
    smoothScrollX(scrollRef.current, mobile ? -200 : -250, 300);
  };

  const isCanShowEmptyImages = () => {
    let CountOfEmptyVideos = 0;
    if (!cheat.videos[0]) {
      CountOfEmptyVideos += 1;
    }
    if (cheat.images.length < 2) {
      CountOfEmptyVideos += 2 - cheat.images.length;
    }
    return Array(CountOfEmptyVideos).fill(0);
  };

  const isHaveThumbnailVideo = cheat.thumbnailVideo
    ? cheat.thumbnailVideo[0]
    : undefined;

  if (mobile) {
    return (
      <div className="flex flex-col gap-4 max-w-[100%] select-none">
        {isOpenCarousel.isOpen &&
          createPortal(
            <MediaCarousel
              items={getMediaItems()}
              initialIndex={isOpenCarousel.index}
              onClose={() => setIsOpenCarousel({ isOpen: false, index: 0 })}
            />,
            document.body
          )}
        <Text
          T="cheat"
          weight="bold"
          size="xl"
          className="text-primary10 leading-[140%]"
        >
          media
        </Text>
        <div className="flex gap-6 relative rounded-[16px] overflow-hidden items-center">
          <div
            onClick={scrollLeft}
            className="cursor-pointer absolute h-[101%] w-15 top-1/2 left-0 z-10 items-center flex -translate-y-1/2 bg-input/50 backdrop-blur-md p-2 shadow-md hover:bg-input/60 transition"
          >
            <Icon
              name="arrowRightCricle"
              style={{ transform: "rotate(180deg)" }}
              className="cursor-pointer"
            />
          </div>
          <div
            ref={scrollRef}
            className="flex items-center overflow-x-auto max-w-[100%] gap-3 scrollbar-hide cursor-grab select-none active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {cheat.videos[0] && (
              <div
                onClick={() => setIsOpenCarousel({ isOpen: true, index: 0 })}
                className="h-[180px] relative min-w-[250px] rounded-[16px] bg-input flex items-center justify-center"
              >
                {isHaveThumbnailVideo && (
                  <ImageWithPreview
                    src={isHaveThumbnailVideo}
                    alt="ThumbnailVideo"
                    isHavePreview={false}
                    className="object-cover rounded-[16px]"
                  />
                )}
                <div className="absolute cursor-pointer inset-0 flex items-center justify-center group">
                  <div className="w-16 border border-primary10 h-16 rounded-full bg-black/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-black/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {cheat.images.map((e, i) => (
              <div
                key={i}
                className="relative min-w-[250px] flex items-center rounded-[16px] overflow-hidden"
              >
                <ImageWithPreview
                  src={e}
                  alt="MediaImage"
                  onClick={() =>
                    setIsOpenCarousel({
                      isOpen: true,
                      index: i + cheat.videos?.length,
                    })
                  }
                  className="object-contain rounded-[16px]"
                />
              </div>
            ))}
            {isCanShowEmptyImages().map((e, i) => (
              <div
                key={i}
                className="relative min-w-[250px] flex items-center rounded-[16px] overflow-hidden"
              >
                <ImageWithPreview
                  src={"/images/pic1.png"}
                  alt="MediaImage"
                  isHavePreview={false}
                  className="object-contain rounded-[16px]"
                />
              </div>
            ))}
          </div>
          <div
            onClick={scrollRight}
            className="absolute cursor-pointer h-[101%] w-15 top-1/2 right-0 items-center flex -translate-y-1/2 bg-input/50 backdrop-blur-md p-2 shadow-md hover:bg-input/60 transition"
          >
            <Icon name="arrowRightCricle" className="cursor-pointer" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-[100%] mt-[20px] select-none">
      {isOpenCarousel.isOpen &&
        createPortal(
          <MediaCarousel
            items={getMediaItems()}
            initialIndex={isOpenCarousel.index}
            onClose={() => setIsOpenCarousel({ isOpen: false, index: 0 })}
          />,
          document.body
        )}
      <Text
        T="cheat"
        weight="bold"
        size="xl"
        className="text-primary10 leading-[140%]"
      >
        media
      </Text>
      <div className="flex gap-6 rounded-[16px] overflow-hidden items-center max-w-[100%] relative">
        <div
          onClick={scrollLeft}
          className="absolute cursor-pointer h-[101%] w-15 top-1/2 left-0 z-10 items-center flex -translate-y-1/2 bg-input/50 backdrop-blur-md p-2 shadow-md hover:bg-input/60 transition"
        >
          <Icon
            name="arrowRightCricle"
            style={{ transform: "rotate(180deg)" }}
            className="cursor-pointer"
          />
        </div>
        <div
          ref={scrollRef}
          className="flex items-center overflow-x-auto max-w-[100%] gap-3 scrollbar-hide cursor-grab select-none active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {cheat.videos[0] && (
            <div
              onClick={() => setIsOpenCarousel({ isOpen: true, index: 0 })}
              className="h-[180px] relative min-w-[250px] rounded-[16px] bg-input flex items-center justify-center"
            >
              {isHaveThumbnailVideo && (
                <ImageWithPreview
                  src={isHaveThumbnailVideo}
                  alt="ThumbnailVideo"
                  isHavePreview={false}
                  className="object-cover rounded-[16px]"
                />
              )}
              <div className="absolute cursor-pointer inset-0 flex items-center justify-center group">
                <div className="w-16 border border-primary10 h-16 rounded-full bg-black/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-black/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {cheat.images.map((e, i) => (
            <div
              key={i}
              className="relative min-w-[250px] flex items-center rounded-[16px] overflow-hidden"
            >
              <ImageWithPreview
                src={e}
                alt="MediaImage"
                onClick={() =>
                  setIsOpenCarousel({
                    isOpen: true,
                    index: i + cheat.videos?.length,
                  })
                }
                className="object-contain rounded-[16px] border-2 border-linkColor"
              />
            </div>
          ))}
          {isCanShowEmptyImages().map((e, i) => (
            <div
              key={i}
              className="relative min-w-[250px] flex items-center rounded-[16px] overflow-hidden"
            >
              <ImageWithPreview
                src={"/images/pic1.png"}
                alt="MediaImage"
                isHavePreview={false}
                className="object-contain rounded-[16px] border-2 border-linkColor"
              />
            </div>
          ))}
        </div>
        <div
          onClick={scrollRight}
          className="absolute cursor-pointer h-[101%] w-15 top-1/2 right-0 items-center flex -translate-y-1/2 bg-input/50 backdrop-blur-md p-2 shadow-md hover:bg-input/60 transition"
        >
          <Icon name="arrowRightCricle" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Medias;
