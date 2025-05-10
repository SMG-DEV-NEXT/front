"use client";
import React, { useEffect } from "react";
import Icon from "../Icons";
import Text from "../Text";
import Button from "../Button";
import { useState } from "react";

const Top = () => {
  const [isVisible, setIsVisible] = useState(true);

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
    <div className="flex bg-top-gradient" onClick={() => {}}>
      <div
        className="container py-3 flex items-center justify-between
 w-full"
      >
        <div className="flex items-center gap-2">
          <Icon name="Danger" />
          <Text className="text-primary10">top</Text>
          <Button variant="primary10" className="bg-primary20 text-xs">
            go
          </Button>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={onClickClose}
        >
          <Icon name="Close" />
        </div>
      </div>
    </div>
  );
};

export default Top;
