"use client";

import Text from "@/components/Text";
import React, { useState } from "react";
import "./style.scss";
import Icon from "@/components/Icons";

const Code = (props) => {
  const data = props.code;
  const [isActiveCopy, setIsActiveCopy] = useState(false);
  const handleCopy = () => {
    setIsActiveCopy(true);
    setTimeout(() => {
      setIsActiveCopy(false);
    }, 1500);
    const fullCode = data.join("\n");
    navigator.clipboard.writeText(fullCode);
  };

  return (
    <div className=" p-[14px] bg-[#272C33]  rounded-2xl relative">
      <div
        className="absolute top-[10px] right-[10px] cursor-pointer flex items-center gap-1"
        onClick={handleCopy}
      >
        <Icon name="copy" size={15} />
        <Text weight="norm" size="sm" className="text-linkColor">
          {isActiveCopy ? "copyActive" : "copy"}
        </Text>
      </div>
      <div className="flex flex-col pt-4 code-scrollbar pb-[14px]">
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
