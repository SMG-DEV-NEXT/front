"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Text from "../../Text";
import AccountTab from "../../Account/Tab";
import {
  MyAccountDefaultIcon,
  MyAccountFaIcon,
  MyAccountHistoryIcon,
  MyAccountLogoutIcon,
} from "../../Account/Icons";
import DefaultSettings from "../../Account/Default";
import FA from "../../Account/FA";
import HistoryAccount from "../../Account/History";
import { useSelector } from "react-redux";
import { useMobile } from "@/hooks/useMobile";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { useLocale } from "next-intl";
import Effect from "@/components/Animations/Effect";

export const AccountTabs = [
  { value: "default", label: "default", icon: MyAccountDefaultIcon },
  { value: "history", label: "history", icon: MyAccountHistoryIcon },
  { value: "2fa", label: "fa", icon: MyAccountFaIcon },
  { value: "logout", label: "logout", icon: MyAccountLogoutIcon },
];

const View = () => {
  const locale = useLocale();
  const [tab, setTab] = useState({
    value: "default",
    label: "default",
    icon: MyAccountDefaultIcon,
  });
  const [usd, setUSD] = useState(null);
  const onChangeTab = (e) => {
    setTab(e);
    window.location.hash = `#${e.value}`;
  };
  const user = useSelector((state) => state.auth.user);
  const isMobile = useMobile(1023);
  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_tfZjgKTbQ86JVJJm1yKs75nITIE3sDnyYLQCaFyc"
  );

  useEffect(() => {
    if (freecurrencyapi && usd === null && locale === "en") {
      freecurrencyapi
        .latest({
          base_currency: "USD",
          currencies: "RUB",
        })
        .then((response) => {
          setUSD(response.data.RUB);
        });
    }
  }, [freecurrencyapi]);
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
      <div className="view relative h-full w-full flex items-center justify-center pt-[60px] pb-[60px]">
        <div className="container z-[1]">
          <div className="flex flex-col gap-[40px] items-center ">
            <Text
              T="account"
              weight="bold"
              size="t40"
              className="text-primary10 leading-[120%]"
            >
              title
            </Text>
            <div className="flex flex-col gap-6 items-start w-full">
              <AccountTab
                selectedTab={tab}
                mobile={isMobile}
                setSelectedTab={onChangeTab}
              />
              <Effect
                type="to-left"
                className="w-full"
                onceEffect={false}
                key={tab.value}
              >
                <div className="w-full">
                  {user && <Component mobile={true} user={user} usd={usd} />}
                </div>
              </Effect>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[158px]">
      <div className="container z-[1]">
        <div className="flex flex-col gap-[48px] items-center ">
          <Text T="account" weight="bold" size="t48" className="text-primary10">
            title
          </Text>
          <div className="flex  gap-6 items-start w-full">
            <AccountTab selectedTab={tab} setSelectedTab={onChangeTab} />
            <Effect
              type="to-left"
              className="w-[66%]"
              onceEffect={false}
              key={tab.value}
            >
              <div className="w-full">
                {user && <Component user={user} usd={usd} />}
              </div>
            </Effect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
