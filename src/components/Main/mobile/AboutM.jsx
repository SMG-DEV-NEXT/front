import React from "react";
import Text from "../../Text";
import Image from "next/image";
import Effect from "../../Animations/Effect";

function AboutMobile() {
  return (
    <div className="flex relative items-end w-full min-h-[571px] py-[64px] bg-input">
      <Image
        src="/images/AboutBgMobile.png"
        alt="About"
        fill
        className="position-absolute top-0 z-[1]"
      />
      <div className="container relative z-[2] h-full flex items-bottom">
        <Effect type="to-right">
          <div className="flex flex-col gap-6 w-full">
            <Text T="Main" className="text-primary10" size="t48" weight="bold">
              aboutT
            </Text>
            <div className="flex flex-col gap-4">
              <Text
                T="Main"
                weight="medium"
                className="text-linkColor"
                size="sm"
              >
                aboutT1
              </Text>
              <Text
                T="Main"
                weight="medium"
                className="text-linkColor"
                size="sm"
              >
                aboutT2
              </Text>
            </div>
          </div>
        </Effect>
      </div>
    </div>
  );
}

export default AboutMobile;
