"use client";
import Text from "@/components/Text";
import React from "react";

const BLokFaq = ({ data, locale }) => {
  // const {titleen,titleru,abouten,aboutru} = data
  const title = data[`title${locale}`];
  const text = data[`about${locale}`];
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <Text
          T="none"
          weight="bold"
          size="2xl"
          className="text-primary10 leading-[140%]"
        >
          {title}
        </Text>
      )}
      {text && (
        <Text
          T="none"
          weight="medium"
          size="sm"
          className="text-linkColor leading-[140%]"
        >
          {text}
        </Text>
      )}
    </div>
  );
};

export default BLokFaq;
