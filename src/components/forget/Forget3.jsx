"use client";
import Image from "next/image";
import React from "react";
import Input from "../Input";
import Button from "../Button";
import Text from "../Text";
import CustomLink from "../CustomLink";

function Forget3({ isMobile, openLogin }) {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 z-[1] w-full min-w-[350px] max-w-[350px] items-center">
        <Text
          T="login"
          className="text-primary10 whitespace-nowrap"
          size="2xl"
          weight="bold"
        >
          reset
        </Text>
        <div className="flex flex-col bg-input gap-6 rounded-2xl w-full">
          <div className="flex flex-col gap-4 w-full">
            <Text
              T="login"
              className="text-center text-linkColor"
              weight="medium"
              size="sm"
            >
              goToLogin
            </Text>
          </div>
          <Button className="w-full" onClick={openLogin}>
            go
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[234px]">
      {/* <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      /> */}
      <div className="flex flex-col gap-6 z-[1] w-[39%] max-w-[552px] items-center">
        <Text
          T="login"
          className="text-primary10 whitespace-nowrap"
          size="t48"
          weight="bold"
        >
          reset
        </Text>
        <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl w-full">
          <div className="flex flex-col gap-4 w-full">
            <Text
              T="login"
              className="text-center text-linkColor"
              weight="medium"
              size="sm"
            >
              goToLogin
            </Text>
          </div>
          <CustomLink url="/login">
            <Button className="w-full">go</Button>
          </CustomLink>
        </div>
      </div>
    </div>
  );
}

export default Forget3;
