import Image from "next/image";
import React from "react";
import Icon from "../../../Icons";
import {
  iconsStylesByType,
  bgStylesByType,
  textStylesByType,
} from "../../../ListCheat";
import Text from "../../../Text";
import PayCard from "./Pay";
import RouteCheat from "..";
import Programs from "./Programs";
import { useLocale } from "next-intl";
import getLanguage from "@/utils/get-language";
import { getStars } from "@/utils/getStarsCheat";
const CardAndPay = ({ mobile, cheat }) => {
  const type = "Undetected";
  const locale = useLocale();
  if (mobile) {
    return (
      <div className="flex flex-col gap-6 items-start">
        <div className="flex flex-col items-center w-[100%] gap-8">
          <div className="flex gap-6 flex-col items-center  w-full">
            <Image
              src={cheat.image2 || cheat.image1}
              width={350}
              alt="Background"
              style={{ borderRadius: "12px" }}
              height={162}
              className="object-contain"
            />
            <div className="flex flex-col items-center gap-4">
              <Text
                T="none"
                className="text-primary10"
                weight="bold"
                size="t48"
              >
                {cheat[`title${getLanguage(locale)}`]}
              </Text>
              <div className="flex gap-2">
                <div
                  className={`flex gap-[6px] py-2 px-3 h-[36px] rounded-lg ${
                    bgStylesByType[cheat.type]
                  }`}
                  style={{ background: bgStylesByType[cheat.type] }}
                >
                  <Icon name={iconsStylesByType[cheat.type]} folder="cheat" />
                  <Text
                    weight="semi"
                    size="sm"
                    T="none"
                    className={textStylesByType[cheat.type]}
                  >
                    {cheat.type}
                  </Text>
                </div>
                <div className="flex gap-2 gap-3 bg-[#79CA6D26] py-2 px-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Text
                      T="none"
                      className="text-green"
                      size="sm"
                      weight="semi"
                    >
                      {cheat.comments.length}
                    </Text>
                    <Icon name="message" folder="cheat" size={20} />
                  </div>
                  <div className="h-[20px] w-[2px] rounded-full bg-[#79CA6D80]"></div>
                  <div className="flex items-center gap-1">
                    <Text
                      T="none"
                      className="text-green"
                      size="sm"
                      weight="semi"
                    >
                      {getStars(cheat.comments)}
                    </Text>
                    <Icon name="star" folder="cheat" size={20} />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {cheat.tags.map((e) => {
                  return (
                    <div className="flex py-2 px-3 rounded-lg bg-black">
                      <Text
                        T="none"
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                      >
                        {e[locale]}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <Programs /> */}
        </div>
        {/* <PayCard /> */}
      </div>
    );
  }
  const isHidedPayment = type === "detected";
  return (
    <div className="flex gap-6 items-start">
      <div
        className="flex flex-col w-[68%] gap-8"
        style={{ width: !isHidedPayment ? "100%" : "68%" }}
      >
        <RouteCheat
          catalogName={cheat.catalog[`head${getLanguage(locale)}`]}
          cheatName={cheat[`title${getLanguage(locale)}`]}
          catalogId={cheat.catalog.id}
        />
        <div className="flex gap-6  w-full">
          <Image
            src={cheat.image2 || cheat.image1}
            width={264}
            alt="Background"
            style={{ borderRadius: "12px" }}
            height={162}
            className="object-contain"
          />
          <div className="flex flex-col gap-4">
            <Text T="none" className="text-primary10" weight="bold" size="t48">
              {cheat[`title${getLanguage(locale)}`]}
            </Text>
            <div className="flex gap-2">
              <div
                className={`flex gap-[6px] py-2 px-3 h-[36px] rounded-lg ${bgStylesByType[type]}`}
                style={{ background: bgStylesByType[cheat.type] }}
              >
                <Icon name={iconsStylesByType[cheat.type]} folder="cheat" />
                <Text
                  weight="semi"
                  size="sm"
                  T="none"
                  className={textStylesByType[cheat.type]}
                >
                  {cheat.type}
                </Text>
              </div>
              <div className="flex gap-2 gap-3 bg-[#79CA6D26] py-2 px-3 rounded-lg">
                <div className="flex items-center gap-1">
                  <Text T="none" className="text-green" size="sm" weight="semi">
                    {cheat?.comments?.length || 0}
                  </Text>
                  <Icon name="message" folder="cheat" size={20} />
                </div>
                <div className="h-[20px] w-[2px] rounded-full bg-[#79CA6D80]"></div>
                <div className="flex items-center gap-1">
                  <Text T="none" className="text-green" size="sm" weight="semi">
                    {getStars(cheat.comments) || 0}
                  </Text>
                  <Icon name="star" folder="cheat" size={20} />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {cheat.tags.map((e) => {
                return (
                  <div
                    className="flex py-2 px-3 rounded-lg bg-black"
                    id={e.en}
                    key={crypto.randomUUID()}
                  >
                    <Text
                      T="none"
                      className="text-linkColor"
                      weight="medium"
                      size="sm"
                    >
                      {e[locale]}
                    </Text>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Programs cheat={cheat} />
      </div>
      {!isHidedPayment && <PayCard cheat={cheat} />}
    </div>
  );
};

export default CardAndPay;
