"use client";

import Text from "@/components/Text";
import React from "react";
import "./style.scss";

const Code = (props) => {
  const data = props.code;
  return (
    <div className=" p-[14px] bg-[#272C33] rounded-2xl ">
      <div className="flex flex-col code-scrollbar pb-[14px]">
        {data.map((e, i) => {
          return (
            <Text
              T="none"
              weight="semi"
              size="sm"
              className="text-linkColor whitespace-nowrap"
              key={i}
            >
              {e}
            </Text>
          );
        })}
      </div>
    </div>
  );
};

export default Code;
