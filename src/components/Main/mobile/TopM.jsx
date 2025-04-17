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
const items = Array.from({ length: 30 }, (_, index) => ({
  imageUrl: "/images/game.png",
  title: `Game ${index + 1}`,
  price: `${10000 + index}$`,
  products: "1000+",
}));
function MainTopMobile() {
  const router = useRouter();
  const locale = useLocale();
  return (
    <div className="flex w-full relative flex-col  pb-[164px] bg-mainBlack overflow-hidden">
      <div className="absolute top-[0] z-[0] left-[0] h-full">
        <Icon name="light" size={200} className="z-[0]" />
      </div>
      <div className="absolute top-[-15%] z-[1] right-[0] h-full opacity-[0.2]">
        <Icon name="frame145" size={2000} className="z-[1]" />
      </div>
      <div className="absolute top-[-5%] left-[30%] z-[0]  h-full opacity-[1]">
        <Icon name="light2" size={500} className="z-[0]" />
      </div>
      <div className="absolute top-[0] z-[0] right-[0] h-full">
        <Icon name="light1" size={200} className="z-[0]" />
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
