import React from "react";
import Text from "../../Text";
import Icon from "../../Icons";
import Image from "next/image";
import "../index.scss";

const Medias = ({ mobile, cheat }) => {
  console.log(cheat);
  if (mobile) {
    return (
      <div className="flex flex-col gap-4 ">
        <Text T="cheat" weight="bold" size="xl" className="text-primary10">
          media
        </Text>
        <div className="flex gap-6 items-center">
          <div className="flex overflow-x-auto gap-3 scrollbar-hide">
            <video
              width={170}
              height={170}
              controls
              style={{
                width: `${170}px`,
                height: `${170}px`,
              }}
              alt="Uploaded preview"
              className={`rounded-md mt-1 z-[1]`}
            >
              <source src={cheat.videos[0]} type="video/mp4" />
            </video>
            {cheat.images.map((e) => {
              return (
                <Image
                  src={e}
                  key={crypto.randomUUID()}
                  alt="MediaImage"
                  width={170}
                  height={170}
                  className="rounded-[16px] h-[170px] object-cover"
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
            width={170}
            height={170}
            controls
            style={{
              width: `${170}px`,
              height: `${170}px`,
            }}
            alt="Uploaded preview"
            className={`rounded-md mt-1 z-[1]`}
          >
            <source src={cheat.videos[0]} type="video/mp4" />
          </video>
          {cheat.images.map((e) => {
            return (
              <Image
                src={e}
                key={crypto.randomUUID()}
                alt="MediaImage"
                width={170}
                height={170}
                className="rounded-[16px] h-[170px] object-cover"
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
