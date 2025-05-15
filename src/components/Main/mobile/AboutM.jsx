import React from "react";
import Text from "../../Text";
import Image from "next/image";
import Effect from "../../Animations/Effect";

const AboutLightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={390}
      height={411}
      viewBox="0 0 390 411"
      fill="none"
      style={{ overflow: "visible" }}
    >
      <g filter="url(#a22)">
        <ellipse
          cx="50%"
          cy="40%"
          rx="200"
          ry="170"
          fill="#8B6DCA"
          fillOpacity="0.6"
        />
      </g>
      <g filter="url(#b22)" style={{ mixBlendMode: "overlay" }}>
        <ellipse
          cx="50%"
          cy="40%"
          rx="200"
          ry="170"
          fill="#D5C2FC"
          fillOpacity="0.4"
        />
      </g>
      <defs>
        <filter
          id="a22"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="100" />
        </filter>
        <filter
          id="b22"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="100" />
        </filter>
      </defs>
    </svg>
  );
};

function AboutMobile() {
  return (
    <div className="flex relative items-end w-full min-h-[571px]  bg-input bg-input overflow-hidden bg-no-repeat bg-center bg-cover">
      <div className="container relative h-full flex items-bottom py-[64px]">
        <div className="absolute top-[-80%] right-[-30%]">
          <AboutLightIcon />
        </div>
        <div className="absolute w-full h-[150%] top-[-60%] left-0 right-0">
          <Image src={"/images/aboutBGM.png"} fill objectFit="contain" />
        </div>
        <Effect type="to-right">
          <div className="flex flex-col gap-6 w-full">
            <Text T="Main" className="text-primary10" size="t48" weight="bold">
              aboutT
            </Text>
            <div className="flex flex-col gap-6">
              <Text
                T="Main"
                weight="medium"
                className="text-linkColor leading-[120%]"
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
