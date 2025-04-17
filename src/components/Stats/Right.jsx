"use client";
import React, { useState } from "react";
import Text from "../Text";
import Image from "next/image";
import Icon from "../Icons";
import Pagination from "../pagination";
import CustomLink from "../CustomLink";
import { MomentFunctions } from "@/services/Moment";
import { useLocale } from "next-intl";

const Stat = ({ createdAt, view, mobile, Image1, ...params }) => {
  const locale = useLocale();
  const title = params[`title${locale}`];
  const about = params[`about${locale}`];
  if (mobile) {
    return (
      <div className="flex flex-col bg-input w-full cursor-pointer rounded-[12px] overflow-hidden">
        <Image
          src={Image1}
          width="302"
          height="139"
          objectFit="cover"
          alt="Background"
          className="h-[139px] w-full object-cover"
        />
        <div className="flex p-6 flex-col w-full gap-6 bg-black">
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center">
              <Icon name="date" folder="stats" size={20} />
              <Text
                className="text-linkColor"
                weight="medium"
                size="sm"
                T="none"
              >
                {MomentFunctions.statsDate(createdAt)}
              </Text>
            </div>
            <div className="flex gap-1 items-center">
              <Icon name="eye" folder="stats" size={20} />
              <Text
                className="text-linkColor"
                weight="medium"
                size="sm"
                T="none"
              >
                {view}
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Text
              T="none"
              weight="semi"
              size="lg"
              className="text-primary10 leading-[120%]"
            >
              {title}
            </Text>
            <Text
              T="none"
              weight="medium"
              size="sm"
              className="text-linkColor line-clamp-2"
            >
              {about}
            </Text>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex bg-input w-full cursor-pointer rounded-[12px] overflow-hidden">
      <Image
        src={Image1}
        width="196"
        height="184"
        alt="Background"
        objectFit="cover"
        className="h-[184px] object-cover"
      />
      <div className="flex p-6 flex-col w-full gap-6 bg-black">
        <div className="flex flex-col gap-2">
          <Text
            T="none"
            weight="semi"
            size="lg"
            className="text-primary10 leading-[120%]"
          >
            {title}
          </Text>
          <Text
            T="none"
            weight="medium"
            size="sm"
            className="text-linkColor line-clamp-2"
          >
            {about}
          </Text>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center">
            <Icon name="date" folder="stats" size={20} />
            <Text className="text-linkColor" weight="medium" size="sm" T="none">
              {MomentFunctions.statsDate(createdAt)}
            </Text>
          </div>
          <div className="flex gap-1 items-center">
            <Icon name="eye" folder="stats" size={20} />
            <Text className="text-linkColor" weight="medium" size="sm" T="none">
              {view}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

const RightStats = ({ mobile, game, handleChangePage, selectedFilterDate }) => {
  const getItems = (type) => {
    if (selectedFilterDate.value === "old") {
      return [...game.data].reverse();
    }
    return game.data;
  };

  if (mobile) {
    return (
      <div className="flex flex-col w-full gap-6 items-center rounded-[16px] bg-input p-6">
        <Text
          weight="bold"
          T="none"
          size="xl"
          className="text-primary10 text-start w-full"
        >
          {game.game.title}
        </Text>
        <div className="flex flex-col gap-4 w-full">
          {!!game.game.id &&
            getItems().map((e) => {
              return (
                <CustomLink url={`/stats/${e.id}`} key={crypto.randomUUID()}>
                  <Stat key={e.id} {...e} mobile={mobile} />
                </CustomLink>
              );
            })}
        </div>
        <Pagination
          itemsPerPage={game.totalPages}
          items={game.data}
          onPageChange={(e) => handleChangePage(e.selected + 1)}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-[70%] gap-6 items-center rounded-[16px] bg-input p-6">
      <Text
        weight="bold"
        T="none"
        size="xl"
        className="text-primary10 text-start w-full"
      >
        {game.game.title}
      </Text>
      <div className="flex flex-col gap-4 w-full">
        {!!game.game.id &&
          getItems().map((e) => {
            return (
              <CustomLink url={`/stats/${e.id}`} key={crypto.randomUUID()}>
                <Stat key={e.id} {...e} mobile={mobile} />
              </CustomLink>
            );
          })}
      </div>
      <Pagination
        itemsPerPage={game.totalPages}
        items={game.data}
        onPageChange={(e) => handleChangePage(e.selected + 1)}
      />
    </div>
  );
};

export default RightStats;
