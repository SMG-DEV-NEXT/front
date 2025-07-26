import React, { useEffect, useRef, useState } from "react";
import Text from "../../Text";
import Icon from "../../Icons";
import ImageWithPreview from "@/components/PreviewImage";
import { createPortal } from "react-dom";
import MediaCarousel from "./MediaCarousel";

import "../index.scss";

const Medias = ({ mobile, cheat }) => {
  const [isOpenCarousel, setIsOpenCarousel] = useState({
    isOpen: false,
    index: 0,
  });
  const scrollRef = useRef(null); // 👈 Create ref

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
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: mobile ? 200 : 250,
        behavior: "smooth",
      }); // 👈 Scroll right by 200px
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: mobile ? -200 : -250,
        behavior: "smooth",
      }); // 👈 Scroll right by 200px
    }
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const el = scrollRef.current;
  //     if (!el) return;

  //     const maxScrollLeft = el.scrollWidth - el.clientWidth;

  //     // Only scroll right if we are not at the end yet
  //     if (el.scrollLeft < maxScrollLeft - 10) {
  //       el.scrollBy({
  //         left: mobile ? 200 : 250,
  //         behavior: "smooth",
  //       });
  //     } else {
  //       // Optional: go back to the start when at the end
  //       el.scrollTo({ left: 0, behavior: "smooth" });
  //     }
  //   }, 3500); // every 5 seconds

  //   return () => clearInterval(interval); // cleanup on unmount
  // }, [mobile]);
  if (mobile) {
    return (
      <div className="flex flex-col gap-4 max-w-[100%]">
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
            className={`cursor-pointer absolute h-[101%] w-15 top-1/2 left-0 z-10 items-center flex -translate-y-1/2 bg-input/50 backdrop-blur-md p-2 shadow-md hover:bg-input/60 transition`}
          >
            <Icon
              name="arrowRightCricle"
              style={{ transform: "rotate(180deg)" }}
              className="cursor-pointer"
            />
          </div>
          <div
            ref={scrollRef}
            className="flex items-center overflow-x-auto max-w-[100%] gap-3 scrollbar-hide"
          >
            {cheat.videos[0] && (
              <div
                onClick={() => setIsOpenCarousel({ isOpen: true, index: 0 })}
                className="h-[180px] relative min-w-[250px] rounded-[16px] bg-input flex items-center justify-center"
              >
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
            {/* {cheat.videos[0] && (
            <video
              width={250}
              height={250}
              controls
              style={{
                width: `${250}px`,
                height: `${250}px`,
              }}
              alt="Uploaded preview"
              className={`rounded-2xl mt-1 z-[1]`}
            >
              <source src={cheat.videos[0]} type="video/mp4" />
            </video>
          )} */}

            {cheat.images.map((e, i) => {
              return (
                <div className="relative min-w-[250px] flex items-center  rounded-[16px] overflow-hidden">
                  <ImageWithPreview
                    src={e}
                    alt="MediaImage"
                    onClick={() =>
                      setIsOpenCarousel({
                        isOpen: true,
                        index: i + cheat.videos?.length,
                      })
                    }
                    className="object-contain rounded-[16px] "
                  />
                </div>
              );
            })}
          </div>
          <div
            onClick={scrollRight}
            className={`absolute cursor-pointer h-[101%] w-15 top-1/2 right-0 items-center flex -translate-y-1/2 bg-input/50 backdrop-blur-md p-2 shadow-md hover:bg-input/60 transition`}
          >
            <Icon name="arrowRightCricle" className="cursor-pointer" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 max-w-[100%] mt-[20px]">
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
      <div className="flex gap-6   rounded-[16px] overflow-hidden items-center max-w-[100%] relative">
        <div
          onClick={scrollLeft}
          className={`absolute cursor-pointer h-[101%] w-15 top-1/2 left-0 z-10 items-center flex -translate-y-1/2 bg-input/50 backdrop-blur-md p-2 shadow-md hover:bg-input/60 transition`}
        >
          <Icon
            name="arrowRightCricle"
            style={{ transform: "rotate(180deg)" }}
            className="cursor-pointer"
          />
        </div>
        <div
          ref={scrollRef}
          className="flex items-center overflow-x-auto max-w-[100%] gap-3 scrollbar-hide"
        >
          {cheat.videos[0] && (
            <div
              onClick={() => setIsOpenCarousel({ isOpen: true, index: 0 })}
              className="h-[180px] relative min-w-[250px] rounded-[16px] bg-input flex items-center justify-center"
            >
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
          {/* {cheat.videos[0] && (
            <video
              width={250}
              height={250}
              controls
              style={{
                width: `${250}px`,
                height: `${250}px`,
              }}
              alt="Uploaded preview"
              className={`rounded-2xl mt-1 z-[1]`}
            >
              <source src={cheat.videos[0]} type="video/mp4" />
            </video>
          )} */}

          {cheat.images.map((e, i) => {
            return (
              <div className="relative min-w-[250px] flex items-center  rounded-[16px] overflow-hidden">
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
            );
          })}
        </div>
        <div
          onClick={scrollRight}
          className={`absolute cursor-pointer h-[101%] w-15 top-1/2 right-0 items-center flex -translate-y-1/2 bg-input/50 backdrop-blur-md p-2 shadow-md hover:bg-input/60 transition`}
        >
          <Icon name="arrowRightCricle" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Medias;
