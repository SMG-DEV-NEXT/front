import Image from "next/image";
import React from "react";
import Text from "../Text";
import Button from "./../Button/index";
import Icon from "../Icons";
import CustomLink from "../CustomLink";
import { useMobile } from "@/hooks/useMobile";
import { useLocale } from "use-intl";
import getLanguage from "@/utils/get-language";
import { getStars } from "@/utils/getStarsCheat";

export const bgStylesByType = {
  undetected: "#6DCAC526",
  detected: "#CA6D6D26",
  risk: "#CAC86D26",
  update: "#8B6DCA26",
};
export const textStylesByType = {
  undetected: "text-[#6DCAC5]",
  detected: "text-[#CA6D6D]",
  risk: "text-[#CAC86D]",
  update: "text-[#8B6DCA]",
};
export const iconsStylesByType = {
  undetected: "Tick",
  detected: "Close",
  risk: "danger",
  update: "update",
};
const ListCheatItem = (props) => {
  const isMobile = useMobile();
  const locale = useLocale();
  const {
    image,
    stars,
    tags = [],
    minimumPrice: price,
    type,
    onBuy,
    image1,
    id,
    catalogId,
    comments,
    usd,
  } = props;
  if (isMobile) {
    return (
      <div className="flex flex-col rounded-2xl w-[350px] bg-input overflow-hidden  ">
        {image1 && (
          <Image
            src={image1}
            alt="Background"
            height="210"
            width="350"
            objectFit="cover"
            className="object-cover"
          />
        )}
        <div
          className="flex flex-col p-6 pt-[15px] h-full w-full justify-between"
          style={{ paddingTop: "15px" }}
        >
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[10px] ">
              <Text T="none" className="text-primary10" weight="bold" size="lg">
                {props[`title${getLanguage()}`]}
              </Text>
              <div className="flex  gap-2">
                <div
                  className={`flex gap-[6px] py-2 px-3 h-[36px] rounded-lg bg-[${bgStylesByType[type]}]`}
                  style={{ backgroundColor: bgStylesByType[type] }}
                >
                  <Icon name={iconsStylesByType[type]} folder="cheat" />
                  <Text
                    weight="semi"
                    size="sm"
                    T="none"
                    className={textStylesByType[type]}
                  >
                    {type}
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
                      {comments.length}
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
                      {getStars(comments)}
                    </Text>
                    <Icon name="star" folder="cheat" size={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {tags.map((e) => {
                return (
                  <div
                    key={crypto.randomUUID()}
                    className="flex py-2 px-3 rounded-lg bg-black"
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
          <div className="flex items-end justify-between">
            <div className="flex gap-2 justify-between  w-full ">
              <div className="flex gap-1   items-end   ">
                <Text
                  T="Main"
                  className="text-primary10 pb-[2px]"
                  size="sm"
                  weight="medium"
                >
                  from
                </Text>
                <Text
                  T="none"
                  className="text-primary10"
                  size="lg"
                  weight="medium"
                >
                  {usd ? (price / usd).toFixed(2) : price} {!usd ? "₽" : "$"}
                </Text>
              </div>
              <CustomLink url={`/catalog/${catalogId}/${id}`}>
                <Button
                  T="cheats"
                  className="text-sm"
                  leftIcon="buy"
                  iconSize={20}
                >
                  buy
                </Button>
              </CustomLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex rounded-2xl bg-input overflow-hidden h-[210px] w-full">
      {image1 && (
        <Image
          src={image1}
          alt="Background"
          height="210"
          width="220"
          objectFit="cover"
          className="object-cover"
        />
      )}
      <div className="flex flex-col p-6 h-full w-full justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Text T="none" className="text-primary10" weight="bold" size="lg">
              {props[`title${getLanguage()}`]}
            </Text>
            <div className="flex gap-2 gap-3 bg-[#79CA6D26] py-2 px-3 rounded-lg">
              <div className="flex items-center gap-1">
                <Text T="none" className="text-green" size="sm" weight="semi">
                  {comments.length || 0}
                </Text>
                <Icon name="message" folder="cheat" size={20} />
              </div>
              <div className="h-[20px] w-[2px] rounded-full bg-[#79CA6D80]"></div>
              <div className="flex items-center gap-1">
                <Text T="none" className="text-green" size="sm" weight="semi">
                  {getStars(comments) || 0}
                </Text>
                <Icon name="star" folder="cheat" size={20} />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {tags.map((e) => {
              return (
                <div
                  key={crypto.randomUUID()}
                  className="flex py-2 px-3 rounded-lg bg-black"
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
        <div className="flex items-end justify-between">
          <div className="flex gap-1 items-end   ">
            <Text
              T="Main"
              className="text-primary10 pb-[2px]"
              size="sm"
              weight="medium"
            >
              from
            </Text>
            <Text T="none" className="text-primary10" size="lg" weight="medium">
              {usd ? (price / usd).toFixed(2) : price} {!usd ? "₽" : "$"}
            </Text>
          </div>
          <div className="flex gap-2">
            <div
              className={`flex gap-[6px] py-2 px-3 h-[36px] rounded-lg ${bgStylesByType[type]}`}
              style={{ backgroundColor: bgStylesByType[type] }}
            >
              <Icon name={iconsStylesByType[type]} folder="cheat" />
              <Text
                weight="semi"
                size="sm"
                T="none"
                className={textStylesByType[type]}
              >
                {type}
              </Text>
            </div>
            <CustomLink url={`/catalog/${catalogId}/${id}`}>
              <Button
                T="cheats"
                className="text-sm"
                leftIcon="buy"
                iconSize={20}
              >
                buy
              </Button>
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCheatItem;
