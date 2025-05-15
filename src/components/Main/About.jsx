import React from "react";
import Text from "../Text";
import Image from "next/image";
import Effect from "../Animations/Effect";

export const AboutLightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1088}
      height={600}
      viewBox="0 0 1088 600"
      fill="none"
      style={{ overflow: "visible" }}
    >
      <g filter="url(#a41)">
        <ellipse
          cx="50%"
          cy="40%"
          rx="240"
          ry="200"
          fill="#8B6DCA"
          fillOpacity="0.6"
        />
      </g>
      <g filter="url(#b41)" style={{ mixBlendMode: "overlay" }}>
        <ellipse
          cx="50%"
          cy="40%"
          rx="240"
          ry="200"
          fill="#D5C2FC"
          fillOpacity="0.4"
        />
      </g>
      <defs>
        <filter
          id="a41"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="120" />
        </filter>
        <filter
          id="b41"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="120" />
        </filter>
      </defs>
    </svg>
  );
};

function About() {
  return (
    <div className="flex relative w-full   bg-input bg-input bg-no-repeat bg-end bg-cover overflow-hidden">
      <div className="container relative py-[64px]">
        <div className="absolute top-[-80%] right-[-30%]">
          <AboutLightIcon />
        </div>
        <div className="absolute w-[900px] h-full bottom-[-20px] right-[-20%]">
          <Image src="/images/aboutBG.png" fill objectFit="contain" />
        </div>
        <Effect type="to-right">
          <div className="flex flex-col gap-6 w-[40%]">
            <Text
              T="Main"
              className="text-primary10 leading-[120%]"
              size="t48"
              weight="bold"
            >
              aboutT
            </Text>
            <div className="flex flex-col gap-5">
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

export default About;
