"use client";
import React from "react";
import Text from "../Text";
import CustomLink from "../CustomLink";
import Button from "../Button";

const NotFoundView = () => {
  return (
    <div className="view relative h-full w-full flex items-center justify-center  py-[112px]">
      <div className="contain flex flex-col items-center">
        <Text weight="bold" size="t32" className="text-primary10">
          notFoundTitle
        </Text>
        <Text
          weight="semi"
          size="2xl"
          className="text-linkColor w-3/4 text-center mt-[10px]"
        >
          notFoundText
        </Text>
        <CustomLink url="/" className="mt-6">
          <Button>notFoundBtn</Button>
        </CustomLink>
      </div>
    </div>
  );
};

export default NotFoundView;
