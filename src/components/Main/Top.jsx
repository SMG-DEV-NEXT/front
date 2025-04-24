"use client";
import React from "react";
import Text from "../Text";
import Button from "../Button";
import Icon from "../Icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../Carousel";
import Effect from "../Animations/Effect";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import getLanguage from "@/utils/get-language";
function MainTop({ data }) {
  const router = useRouter();
  const locale = useLocale();
  const items = data.data.map((e) => {
    return {
      imageUrl: e.imageUrl,
      id: e.id,
      title: `title${getLanguage(locale)}`,
      cheats: e.cheats,
    };
  });
  return (
    <div className="flex w-full relative  pb-[200px] bg-mainBlack overflow-hidden">
      <div className="absolute top-[2] z-[2] left-[0] h-full">
        <Icon name="light" size={200} className="z-[0]" />
      </div>
      <div className="absolute top-[-15%] z-[2] right-[0] h-full opacity-[0.2]">
        <Icon name="frame145" size={1500} className="z-[1]" />
      </div>
      <div className="absolute top-[-30%] left-[20%] z-[2]  h-full opacity-[1]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="900"
          height="439"
          viewBox="0 0 900 439"
          fill="none"
        >
          <g filter="url(#filter0_f_1_1156)">
            <circle cx="449.899" cy="-11.4122" r="165.588" fill="#8B6DCA" />
          </g>
          <g
            style={{ mixBlendMode: "overlay" }}
            filter="url(#filter1_f_1_1156)"
          >
            <circle cx="449.899" cy="-11.4122" r="165.588" fill="#D5C2FC" />
          </g>
          <defs>
            <filter
              id="filter0_f_1_1156"
              x="0.163025"
              y="-461.148"
              width="899.473"
              height="899.472"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="142.074"
                result="effect1_foregroundBlur_1_1156"
              />
            </filter>
            <filter
              id="filter1_f_1_1156"
              x="0.163025"
              y="-461.148"
              width="899.473"
              height="899.472"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="142.074"
                result="effect1_foregroundBlur_1_1156"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="absolute top-[0] z-[2] right-[0] h-full">
        <Icon name="light1" size={200} className="z-[0]" />
      </div>
      <div className="container z-[2] pt-[64px]">
        <div className="flex items-center justify-between">
          <Effect type="to-right" className="w-[38%]">
            <div className="flex  flex-col w-full gap-6">
              <Text
                T="Main"
                size="t48"
                className="text-primary10 text-[48px] leading-[120%]"
                weight="bold"
              >
                topT
              </Text>
              <Text
                T="Main"
                className="text-linkColor "
                size="sm"
                weight="medium"
              >
                topS
              </Text>
              <div>
                <Button
                  T="Main"
                  leftIcon="ps"
                  iconSize={20}
                  onClick={() => router.push(`/${locale}/catalog`)}
                  className="py-[10px] px-[32px]"
                  style={{
                    boxShadow: "0px 19px 59.1px rgba(139, 109, 202, 0.25)",
                  }}
                >
                  topB
                </Button>
              </div>
            </div>
          </Effect>
          <div className="flex flex-col bg-input p-6 rounded-2xl z-[2px] gap-6 ">
            <Text
              T="Main"
              weight="bold"
              size="xl"
              className="text-primary10 z-[11]"
            >
              popular
            </Text>
            <Carousel items={items}></Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainTop;
