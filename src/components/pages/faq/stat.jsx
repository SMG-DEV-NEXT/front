"use client";

import Icon from "@/components/Icons";
import Text from "@/components/Text";
import React from "react";
import Code from "./bloks/code";
import Blok from "./bloks/blok";
import Screens from "./bloks/screens";
import Button from "./bloks/button";
import Image from "next/image";
import Table from "./bloks/table";

const ComponentsAsBlockTypes = {
  blok: Blok,
  code: Code,
  screenshot: Screens,
  goto: Button,
  table: Table,
};

const FaqStat = ({
  stat = {},
  mobile,
  getStatById,
  locale,
  allStats,
  handleChangeTab,
}) => {
  const data = JSON.parse(stat.data);
  const blocks = JSON.parse(stat.content);
  const index = allStats.findIndex((item) => item.id === stat.id);

  // Get previous and next
  const prev = index > 0 ? allStats[index - 1] : null;
  const next = index < allStats.length - 1 ? allStats[index + 1] : null;
  const getJSONData = (obj) => {
    return JSON.parse(obj.data);
  };
  const prevData = prev ? getJSONData(prev) : {};
  const nextData = next ? getJSONData(next) : {};
  return (
    <div
      style={{ width: "100%" }}
      className="w-[71%] bg-input rounded-2xl flex flex-col p-6 gap-6"
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          {data.icon && (
            <Image
              width={20}
              className="flex"
              height={20}
              alt="logo"
              src={data.iconActive || data.icon}
            />
          )}
          <Text
            T="none"
            weight="bold"
            className="text-primary10 leading-[140%]"
            size="t32"
          >
            {data[`title${locale}`]}
          </Text>
        </div>
        {data[`text${locale}`] && (
          <Text T="none" weight="medium" size="sm" className="text-linkColor">
            {data[`text${locale}`]}
          </Text>
        )}
      </div>
      {blocks.map((e) => {
        const Component = ComponentsAsBlockTypes[e.type];
        if (Component) {
          return (
            <Component
              {...e}
              key={crypto.randomUUID()}
              handleChangeTab={handleChangeTab}
              locale={locale}
              mobile={mobile}
              getJSONData={getJSONData}
              getStatById={getStatById}
            />
          );
        }
        return <div className="flex">{e.type}</div>;
      })}
      <div className="flex gap-2 mt-auto">
        {prev && (
          <div
            onClick={() => handleChangeTab(stat.arrI, prev)}
            className="flex w-full cursor-pointer py-3 px-5 rounded-[12px] border-[1.5px] border-[#8B6DCB] justify-between items-center"
          >
            <Icon
              name="arrowR"
              folder="admin"
              size={20}
              className="transform rotate-180"
            />
            <div className="flex items-center gap-2">
              <Text
                T="none"
                weight="semi"
                size="sm"
                className="text-[#E9E3F7] flex items-center"
              >
                {prevData[`title${locale}`]}
              </Text>
              {prevData.icon && (
                <Image
                  width={20}
                  className="flex"
                  height={20}
                  alt="logo"
                  src={prevData.iconActive || prevData.icon}
                />
              )}
            </div>
          </div>
        )}
        {next && (
          <div
            onClick={() => handleChangeTab(stat.arrI, next)}
            className="flex w-full cursor-pointer py-3 px-5 rounded-[12px] border-[1.5px] border-[#8B6DCB] justify-between items-center"
          >
            <div className="flex items-center gap-2">
              {nextData.icon && (
                <Image
                  width={20}
                  className="flex"
                  height={20}
                  alt="logo"
                  src={nextData.iconActive || nextData.icon}
                />
              )}
              <Text
                T="none"
                weight="semi"
                size="sm"
                className="text-[#E9E3F7] flex items-center"
              >
                {nextData[`title${locale}`]}
              </Text>
            </div>
            <Icon name="arrowR" folder="admin" size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqStat;
