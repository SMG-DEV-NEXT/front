"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Text from "../../components/Text";
import AccountTab from "./Tab";
import {
  MyAccountDefaultIcon,
  MyAccountFaIcon,
  MyAccountHistoryIcon,
  MyAccountLogoutIcon,
} from "./Icons";
import DefaultSettings from "../../components/Account/Default";
import FA from "../../components/Account/FA";
import HistoryAccount from "../../components/Account/History";
import { useSelector } from "react-redux";
import { useMobile } from "@/hooks/useMobile";

export const AccountTabs = [
  { value: "default", label: "default", icon: MyAccountDefaultIcon },
  { value: "history", label: "history", icon: MyAccountHistoryIcon },
  { value: "2fa", label: "fa", icon: MyAccountFaIcon },
  { value: "logout", label: "logout", icon: MyAccountLogoutIcon },
];

const View = () => {
  const [tab, setTab] = useState({
    value: "default",
    label: "default",
    icon: MyAccountDefaultIcon,
  });
  const onChangeTab = (e) => {
    setTab(e);
  };
  const user = useSelector((state) => state.auth.user);
  const isMobile = useMobile();

  const getComponent = () => {
    if (tab.value === "default") return DefaultSettings;
    if (tab.value === "2fa") return FA;
    if (tab.value === "history") return HistoryAccount;
    return DefaultSettings;
  };
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTab(AccountTabs.find((e) => e.value === hash));
    }
  }, []);
  const Component = getComponent();
  if (isMobile) {
    return (
      <div className="view relative h-full w-full bg-mainBlack flex items-center justify-center pt-[60px] pb-[60px]">
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
          <div className="flex flex-col gap-[40px] items-center ">
            <Text
              T="account"
              weight="bold"
              size="t40"
              className="text-primary10"
            >
              title
            </Text>
            <div className="flex flex-col gap-6 items-start w-full">
              <AccountTab
                selectedTab={tab}
                mobile={isMobile}
                setSelectedTab={onChangeTab}
              />
              <div className="w-full">
                <Component mobile={isMobile} user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full bg-mainBlack flex items-center justify-center pt-[64px] pb-[158px]">
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
        <div className="flex flex-col gap-[48px] items-center ">
          <Text T="account" weight="bold" size="t48" className="text-primary10">
            title
          </Text>
          <div className="flex  gap-6 items-start w-full">
            <AccountTab selectedTab={tab} setSelectedTab={onChangeTab} />
            <div className="w-[66%]">
              <Component user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
