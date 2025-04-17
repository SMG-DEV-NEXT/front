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
    <div className="flex w-full relative  pb-[164px] bg-mainBlack overflow-hidden">
      <div className="absolute top-[0] z-[0] left-[0] h-full">
        <Icon name="light" size={200} className="z-[0]" />
      </div>
      <div className="absolute top-[-15%] z-[1] right-[0] h-full opacity-[0.2]">
        <Icon name="frame145" size={1500} className="z-[1]" />
      </div>
      <div className="absolute top-[-5%] left-[30%] z-[0]  h-full opacity-[1]">
        <Icon name="light2" size={500} className="z-[0]" />
      </div>
      <div className="absolute top-[0] z-[0] right-[0] h-full">
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
            <Text T="Main" weight="bold" size="xl" className="text-primary10">
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
