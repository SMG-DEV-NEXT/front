"use client";
import React from "react";
import Text from "../components/Text";
import Image from "next/image";
import Icon from "../components/Icons";

const PaymentView = () => {
  return (
    <div className="view relative h-full w-full bg-mainBlack flex items-center justify-center pt-[64px] pb-[453px]">
      <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      />
      <div className="container z-[1]">
        <div className="flex flex-col gap-6  bg-input rounded-[16px] p-6">
          <Text className="text-primary10" weight="bold" size="t48">
            Pay
          </Text>
          <Text className="text-linkColor" weight="medium" size="sm">
            payText
          </Text>
          <div className="flex flex-wrap items-center gap-2">
            <Text className="text-linkColor" weight="medium" size="sm">
              payIonsText
            </Text>
            <div className="flex items-center gap-3">
              <Icon name="B" size={60} h={20} />
              <Icon name="Master" size={44} h={27} />
              <Icon name="Visa" size={27} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentView;
