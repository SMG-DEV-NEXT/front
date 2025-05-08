"use client";

import Icon from "@/components/Icons";
import Text from "@/components/Text";
import Image from "next/image";
import React from "react";

const FaqButton = ({
  getStatById,
  link,
  handleChangeTab,
  getJSONData,
  locale,
}) => {
  const { stat, i } = getStatById(link);
  const data = getJSONData(stat);
  return (
    <div
      onClick={() => handleChangeTab(i, stat)}
      className="flex w-full cursor-pointer py-3 px-5 rounded-[12px] border-[1.5px] border-[#8B6DCB] justify-between items-center"
    >
      <div className="flex items-center gap-2">
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
          weight="semi"
          size="sm"
          className="text-[#E9E3F7] flex items-center"
        >
          {data[`title${locale}`]}
        </Text>
      </div>
      <Icon name="arrowR" folder="admin" size={20} />
    </div>
  );
};
export default FaqButton;
