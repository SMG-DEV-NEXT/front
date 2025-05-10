import React from "react";
import Text from "../../Text";
import Icon from "../../Icons";
import ImageWithPreview from "@/components/PreviewImage";
import "../index.scss";

const Medias = ({ mobile, cheat }) => {
  if (mobile) {
    return (
      <div className="flex flex-col gap-4 ">
        <Text T="cheat" weight="bold" size="xl" className="text-primary10">
          media
        </Text>
        <div className="flex gap-6 items-center">
          <div className="flex overflow-x-auto gap-3 scrollbar-hide">
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
            {cheat.images.map((e) => {
              return (
                <ImageWithPreview
                  src={e}
                  key={crypto.randomUUID()}
                  alt="MediaImage"
                  width={250}
                  height={250}
                  className="rounded-[16px] h-[250px] min-w-[250px] object-cover"
                />
              );
            })}
          </div>
          <Icon name="arrowRightCricle" className="cursor-pointer" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 mt-[48px]">
      <Text T="cheat" weight="bold" size="xl" className="text-primary10">
        media
      </Text>
      <div className="flex gap-6 items-center">
        <div className="flex overflow-x-auto gap-3 scrollbar-hide">
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
          {cheat.images.map((e) => {
            return (
              <ImageWithPreview
                src={e}
                key={crypto.randomUUID()}
                alt="MediaImage"
                width={250}
                height={250}
                className="rounded-[16px] h-[250px] object-cover min-w-[250px]"
              />
            );
          })}
        </div>
        <Icon name="arrowRightCricle" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Medias;
