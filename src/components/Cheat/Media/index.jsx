import React, { useState } from "react";
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
        <div className="flex gap-6 items-center">
          <div className="flex overflow-x-auto items-center gap-3 scrollbar-hide">
            {cheat.videos[0] && (
              <div
                onClick={() => setIsOpenCarousel({ isOpen: true, index: 0 })}
                className="h-[150px] relative min-w-[150px] rounded-[16px] bg-input flex items-center justify-center"
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
            {cheat.images.map((e, i) => {
              return (
                <div
                  key={crypto.randomUUID()}
                  className="relative min-w-[250px] flex items-center  overflow-hidden"
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
                    sizes="250px"
                  />
                </div>
              );
            })}
          </div>
          <Icon name="arrowRightCricle" className="cursor-pointer" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4  max-w-[100%] mt-[20px]">
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
      <div className="flex gap-6 items-center max-w-[100%]">
        <div className="flex items-center overflow-x-auto max-w-[100%] gap-3 scrollbar-hide">
          {cheat.videos[0] && (
            <div
              onClick={() => setIsOpenCarousel({ isOpen: true, index: 0 })}
              className="h-[150px] relative min-w-[150px] rounded-[16px] bg-input flex items-center justify-center"
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
              <div className="relative min-w-[250px] flex items-center  overflow-hidden">
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
                  sizes="250px"
                />
              </div>
            );
          })}
        </div>
        <Icon name="arrowRightCricle" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Medias;
