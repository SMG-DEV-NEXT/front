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
import { Axyus, HugeGlow, LeftIcon, RightIcon } from "./i";
import getLanguage from "@/utils/get-language";

function MainTop({ data }) {
  const router = useRouter();
  const locale = useLocale();
  const items = data.data.map((e) => {
    return {
      imageUrl: e.image2,
      id: e.id,
      plan: e.plan,
      title: e[`title${locale === "en" ? "En" : "Ru"}`],
      cheats: e.cheats,
      catalogId: e.catalogId,
    };
  });
  return (
    <div className="flex w-full relative  pb-[164px]  overflow-hidden ">
      <div className="container z-[2] pt-[64px] z-[12]">
        <div className="flex items-center justify-between z-[12]">
          <Effect type="to-right" className="w-[38%] z-[12]">
            <div className="flex  flex-col w-full gap-6 z-[12]">
              <Text
                T="Main"
                size="t48"
                className="text-primary10 text-[48px] leading-[120%] z-[12]"
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
                  className="py-[10px] px-[32px] mt-2"
                  style={{
                    boxShadow: "0px 19px 59.1px rgba(139, 109, 202, 0.25)",
                  }}
                >
                  topB
                </Button>
              </div>
            </div>
          </Effect>
          <div className="flex flex-col bg-input p-6 rounded-2xl min-h-[312px] min-w-[580px]  z-[2px] gap-6 relative">
            <div className="absolute  overflow-hidden top-[-63%] left-[-95%] ">
              <HugeGlow />
            </div>
            <Text
              T="Main"
              weight="bold"
              size="xl"
              className="text-primary10 leading-[140%] z-[11]"
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
