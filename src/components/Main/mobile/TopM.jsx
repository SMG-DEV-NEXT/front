"use client";
import React from "react";
import Text from "../../Text";
import Button from "../../Button";
import Icon from "../../Icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../../Carousel";
import Effect from "../../Animations/Effect";
import CustomLink from "@/components/CustomLink";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { HugeGlow, LeftIcon, RightIcon } from "../i";

function MainTopMobile() {
  const router = useRouter();
  const locale = useLocale();
  return (
    <div className="flex w-full relative flex-col  pb-[250px] bg-mainBlack overflow-hidden">
      <div className="absolute top-[2] z-[2] left-[0] h-full">
        <LeftIcon />
      </div>
      <div className="absolute top-[-15%] z-[1] right-[0] h-full opacity-[0.5]">
        <Icon name="setka" size={1000} className="z-[1]" />
      </div>
      <div className="absolute top-[-40%] left-[-10%] ">
        <HugeGlow />
      </div>

      <div className="container z-[2] pt-[64px]">
        <div className="flex flex-col items-center justify-between">
          <Effect type="to-right" className="w-full">
            <div className="flex  flex-col w-full gap-6">
              <Text
                T="Main"
                size="t38"
                className="text-primary10 text-[48px] leading-[120%]"
                weight="bold"
              >
                topT
              </Text>
              <Text T="Main" className="text-linkColor " weight="medium">
                topS
              </Text>
              <div className="w-full">
                <CustomLink url={"/catalog"}>
                  <Button
                    T="Main"
                    leftIcon="ps"
                    iconSize={20}
                    onClick={() => router.push(`/${locale}/catalog`)}
                    className="py-[10px] px-[32px] w-full"
                    style={{
                      boxShadow: "0px 19px 59.1px rgba(139, 109, 202, 0.25)",
                    }}
                  >
                    topB
                  </Button>
                </CustomLink>
              </div>
            </div>
          </Effect>
          {/* <div className="flex flex-col bg-input p-6 rounded-2xl z-[2px] gap-6 ">
            <Text T="Main" weight="bold" size="xl" className="text-primary10">
              popular
            </Text>
            <Carousel items={items}></Carousel>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default MainTopMobile;
