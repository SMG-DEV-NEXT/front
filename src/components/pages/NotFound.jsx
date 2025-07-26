"use client";
import React from "react";
import Text from "../Text";
import CustomLink from "../CustomLink";
import Button from "../Button";
import Icon from "../Icons";
import { useMobile } from "@/hooks/useMobile";
import { useRouter } from "next/navigation";

const NotFoundView = () => {
  const isMobile = useMobile();
  const router = useRouter();
  return (
    <div className="view relative h-full w-full px-5 flex  justify-center pt-[64px] pb-[40vh]">
      <div className="contain flex flex-col items-center">
        <div className="bg-[#8B6DCA26] w-[56px] h-[56px] rounded-full ml-6 flex items-center justify-center">
          <Icon name="alert" />
        </div>
        <Text weight="bold" size="t48" className="text-primary10 text-center">
          notFoundTitle
        </Text>
        <Text
          weight="nprmal"
          size="sm"
          className="text-linkColor w-full text-center mt-6"
        >
          notFoundText
        </Text>
        <div
          className={`flex gap-2 w-full mt-6  ${isMobile ? "flex-col" : ""}`}
        >
          <CustomLink url="/" className={isMobile ? "w-full" : "w-1/2"}>
            <Button
              className={`w-full ${!isMobile ? "max-w-[250px]" : ""} ml-auto`}
            >
              notFoundBtn
            </Button>
          </CustomLink>
          <Button
            variant="secondary"
            onClick={() => router.back()}
            className={`w-1/2 ${!isMobile ? "max-w-[250px]" : "w-full"}`}
          >
            notFoundBack
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundView;
