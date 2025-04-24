"use clients";
import React from "react";
import Icon from "../../Icons";
import Text from "../../Text";
import Image from "next/image";
import Effect from "../../Animations/Effect";

const EasyUseBlock = () => {
  return (
    <div className="flex h-full relative p-6 bg-input rounded-2xl min-h-[443px] bg-[url('/images/easyBG.png')] bg-no-repeat bg-center bg-cover">
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
          <Text T="Main" weight="bold" size="xl" className="text-primary10">
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
    <div className="flex relative w-full h-[295px] bg-[url('/images/chooseBG.png')] bg-no-repeat bg-center bg-cover">
      <div className="absolute bottom-[24px]">
        <div className="flex flex-col px-6 gap-2">
          <Text T="Main" weight="bold" size="xl" className="text-primary10">
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
    <div className="p-6 flex flex-col gap-2 rounded-2xl bg-input relative h-[144px] overflow-hidden">
      <Image
        src="/images/lights/light1.png"
        fill
        alt="light"
        className="z-[1]"
        style={{
          opacity: 0.7,
        }}
      />
      <div className="flex items-center gap-[6px] z-[2]">
        <Text T="Main" className="text-primary10" size="xl" weight="bold">
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

function BlocksMobile() {
  return (
    <div className="relative flex pb-[164px] bg-mainBlack mt-[-40%] z-[1]">
      <div className="absolute bottom-[-14%] left-[0]">
        {/* <Icon name="frame301" size={1500} /> */}
      </div>
      <div className="container">
        <div className="flex gap-6 flex-col">
          <Effect type="to-right">
            <EasyUseBlock />
          </Effect>
          <div className="flex flex-col gap-6">
            <Effect type="to-left">
              <Starts />
            </Effect>
            <Effect type="to-right">
              <Choose />
            </Effect>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlocksMobile;
