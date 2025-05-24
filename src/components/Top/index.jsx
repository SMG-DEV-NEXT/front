"use client";
import React, { useEffect } from "react";
import Icon from "../Icons";
import Text from "../Text";
import Button from "../Button";
import { useState } from "react";
import { useSettings } from "@/context/Middle";

const Top = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { settings } = useSettings();
  const data = settings.data.find((e) => e.title === "main")?.settings || {};
  // useEffect(() => {
  //   const closeFromLocalStorage =
  //     typeof window !== "undefined" ? localStorage.getItem("close") : "false";
  //   setIsVisible(closeFromLocalStorage === "false" ? false : true);
  // }, []);
  const onClickClose = () => {
    // localStorage.setItem("close", false);
    setIsVisible(false);
  };
  if (!isVisible) {
    return <></>;
  }
  return (
    <div className="flex bg-top-gradient z-[1]" onClick={() => {}}>
      <div
        className="container py-3 flex items-center justify-between
 w-full"
      >
        <div className="flex items-center gap-2">
          <Icon name="Danger" />
          <Text className="text-primary10 leading-[140%]">top</Text>
          <Button
            variant="primary10"
            onClick={() => (window.location.href = data.link)}
            className="bg-primary20 !px-3 !py-2 text-[12px] leading-[14px]"
          >
            go
          </Button>
        </div>
        <div
          className="flex items-center cursor-pointer ml-2 w-[20px]"
          onClick={onClickClose}
        >
          <Icon name="Close" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Top;
