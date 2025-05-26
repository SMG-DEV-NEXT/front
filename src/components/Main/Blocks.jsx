"use clients";
import React from "react";
import Icon from "../Icons";
import Text from "../Text";
import Effect from "../Animations/Effect";
import { BottomAxyusBlock } from "./i";

export const StartsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={510}
      height={510}
      viewBox="0 0 510 510"
      fill="none"
      className="z-1"
      style={{ overflow: "visible" }}
    >
      <g filter="url(#a32)">
        <circle cx="50%" cy="50%" r="118" fill="#8B6DCA" fillOpacity="0.6" />
      </g>
      <g filter="url(#b32)" style={{ mixBlendMode: "overlay" }}>
        <circle cx="50%" cy="50%" r="118" fill="#D5C2FC" fillOpacity="0.4" />
      </g>
      <defs>
        <filter
          id="a32"
          x="-150%"
          y="-150%"
          width="400%"
          height="400%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="80" />
        </filter>
        <filter
          id="b32"
          x="-150%"
          y="-150%"
          width="400%"
          height="400%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="80" />
        </filter>
      </defs>
    </svg>
  );
};

const EasyUseBlock = () => {
  return (
    <div className="flex h-full relative p-6 bg-input rounded-2xl bg-[url('/images/easyBG.webp')] bg-no-repeat bg-center bg-cover">
      {/* <Image fill src="/images/easyBG.webp" alt="background" /> */}
      <div className="flex z-[2] flex-col justify-between">
        <div
          className="flex items-center gap-2 p-3 rounded-xl"
          style={{
            backgroundColor: "rgba(139, 109, 202, 0.15)",
            maxWidth: "max-content",
          }}
        >
          <Icon name="squareTick" />
          <Text T="Main" className="text-primary80" weight="medium" size="sm">
            reg
          </Text>
        </div>
        <div className="flex flex-col gap-2 w-[80%]">
          <Text
            T="Main"
            weight="bold"
            size="lg"
            className="text-primary10 leading-[20px]"
          >
            same
          </Text>
          <Text T="Main" className="text-linkColor" weight="medium" size="sm">
            sameTitle
          </Text>
        </div>
      </div>
    </div>
  );
};

const Choose = () => {
  return (
    <div className="flex relative  bg-[url('/images/chooseBG.webp')] bg-no-repeat bg-center bg-cover min-h-[295px]">
      {/* <Image
        src="/images/chooseBG.png"
        alt="background"
        width={552}
        height={295}
      /> */}
      <div className="absolute bottom-[24px]">
        <div className="flex flex-col px-6 gap-2">
          <Text
            T="Main"
            weight="bold"
            size="lg"
            className="text-primary10 leading-[20px]"
          >
            choose
          </Text>
          <Text T="Main" className="text-linkColor" weight="medium" size="sm">
            chooseText
          </Text>
        </div>
      </div>
    </div>
  );
};

const Starts = () => {
  return (
    <div className="p-6 flex flex-col  gap-2 rounded-2xl bg-input relative overflow-hidden">
      <div className="absolute top-[-250%] left-0 right-0">
        <StartsIcon />
      </div>
      <div className="flex items-center gap-[6px] z-[3]">
        <Text
          T="Main"
          className="text-primary10 leading-[20px] z-[3]"
          size="lg"
          weight="bold"
        >
          starts
        </Text>
        <Icon name="stars" size={124} />
      </div>
      <Text T="Main" className="text-linkColor z-[2]" size="sm" weight="medium">
        startsT
      </Text>
    </div>
  );
};

function Blocks() {
  return (
    <div className="relative flex pb-[164px] z-[10]">
      <div className="absolute bottom-[-14%] left-[0]">
        <BottomAxyusBlock />
      </div>
      <div className="container">
        <div className="flex gap-6">
          <Effect type="to-right">
            <EasyUseBlock />
          </Effect>
          <div className="flex flex-col gap-6">
            <Effect type="to-left">
              <Starts />
            </Effect>
            <Effect type="to-left">
              <Choose />
            </Effect>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blocks;
