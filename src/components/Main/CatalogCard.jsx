"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Text from "../Text";
import Icon from "../Icons";
import "./index.scss";
import CustomLink from "../CustomLink";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { useLocale } from "next-intl";
function CatalogCard({
  imageUrl,
  title,
  products,
  minimumPrice,
  imageWidth = 264,
  cheats,
  id,
  usd,
  link,
}) {
  const locale = useLocale();

  const getMinimumPrice = () => {
    if (!cheats) return;
    const prices = cheats
      .map((e) => {
        let price = 0;
        if (e.plan?.day) {
          price = e.plan?.day.price;
          return price;
        }
        if (e.plan?.week) {
          price = e.plan?.week.price;
          return price;
        }
        if (e.plan?.month) {
          price = e.plan?.month.price;
          return price;
        }
        price = minimumPrice;
        return price;
      })
      .sort((a, b) => a - b);
    if (locale === "en") {
      return `${((prices[0] || 0) / usd).toFixed(2)} $`;
    }
    return `${prices[0] || 0} ₽`;
  };
  return (
    <CustomLink url={`/catalog/${link}`}>
      <div
        className="flex relative rounded-2xl shadow-md z-[11]  overflow-hidden flex-col bg-[#272C33]  h-[252px] group"
        style={{ width: imageWidth }}
      >
        <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110">
          <Image
            src={imageUrl}
            fill
            priority
            alt="card"
            className="z-[1] rounded-2xl object-cover"
          />
        </div>
        <div className="box"></div>
        <div
          className="absolute z-[2] bottom-[0px] w-full overflow-hidden
"
        >
          {" "}
          <div className="flex flex-col gap-2 px-6 pb-3">
            <Text
              T="none"
              className="text-primary10 leading-[20px]"
              size="xl"
              weight="bold"
            >
              {title}
            </Text>
            <div className="flex">
              <Text
                T="none"
                className="text-linkColor pr-1"
                size="sm"
                weight="medium"
              >
                {cheats ? cheats.length : 0}
              </Text>
              <Text
                T="Main"
                className="text-linkColor"
                size="sm"
                weight="medium"
              >
                product
              </Text>
            </div>
          </div>
          <div className="line shadowBlock"></div>
          <div className="flex justify-between bg-[#272c33]  px-6 py-3">
            <div className="flex gap-1 items-end   ">
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
                className="text-primary10 "
                size="lg"
                weight="medium"
              >
                {getMinimumPrice()}
              </Text>
            </div>
            <Icon
              name="arrowRightCricle"
              size={20}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </CustomLink>
  );
}

export default CatalogCard;
