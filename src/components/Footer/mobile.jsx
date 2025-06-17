"use client";
import React from "react";
import Icon from "../Icons";
import Text from "../Text";
import Link from "next/link";
import CustomLink from "../CustomLink";
import Image from "next/image";

const navigateTabs = [
  { label: "catalog", value: "/catalog" },
  { label: "FAQ", value: "/FAQ" },
  { label: "garant", value: "/guarante" },
  { label: "contacts", value: "/contacts" },
];

const otherTabs = [
  { label: "resel", value: "/reseller" },
  { label: "konf", value: "/policy" },
  { label: "Pay", value: "/payment" },
  { label: "User", value: "/agreement" },
];
function FooterMobile({ socialLinks, helpLinks, logos, logo, handleClickUrl }) {
  return (
    <div className="flex flex-col bg-input pt-[40px] pb-[40px] z-[1] mt-auto">
      <div className="container flex flex-col justify-between">
        <div className="flex h-full justify-between flex-col">
          <div className="flex items-center gap-6">
            {logo ? (
              <Image alt="LogoFooter" src={logo} height={48} width={43} />
            ) : (
              <Icon
                name={"logoFooter"}
                h={48}
                size={43}
                className="color-black"
              />
            )}
            <Text weight="medium" size="sm" className="text-linkColor w-full">
              secure
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[30px] mt-[44px]">
          <div className="flex flex-col gap-4">
            <Text
              className="text-linkColor leading-[140%]"
              weight="bold"
              size="lg"
            >
              navigation
            </Text>
            {navigateTabs.map((e) => {
              return (
                <CustomLink url={e.value} key={e.label}>
                  <Text size="sm" className="text-linkColor" weight="medium">
                    {e.label}
                  </Text>
                </CustomLink>
              );
            })}
          </div>
          <div className="flex flex-col gap-4">
            <Text
              className="text-linkColor leading-[140%]"
              weight="bold"
              size="lg"
            >
              other
            </Text>
            {otherTabs.map((e) => {
              return (
                <CustomLink url={e.value} key={e.label}>
                  <Text size="sm" className="text-linkColor" weight="medium">
                    {e.label}
                  </Text>
                </CustomLink>
              );
            })}
          </div>
          <div className="flex justify-between w-full cols-2 ">
            <div className="flex flex-col gap-4">
              <Text
                className="text-linkColor leading-[140%]"
                weight="bold"
                size="lg"
              >
                social
              </Text>
              <div className="flex gap-4">
                {socialLinks.map((e) => {
                  return (
                    <div
                      className="cursor-pointer"
                      key={e.id}
                      onClick={() => handleClickUrl(e.url)}
                    >
                      <Image src={e.icon} height={25} width={25} alt="Socila" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full cols-2 ">
            <div className="flex flex-col gap-4">
              <Text
                className="text-linkColor leading-[140%]"
                weight="bold"
                size="lg"
              >
                help
              </Text>
              <div className="flex gap-4">
                {helpLinks.map((e) => {
                  return (
                    <div
                      className="cursor-pointer"
                      key={e.id}
                      onClick={() => handleClickUrl(e.url)}
                    >
                      <Image src={e.icon} height={25} width={25} alt="Socila" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {logos[0] !== "" && (
          <div className="flex items-center gap-3 mt-[60px]">
            {logos.map((e) => {
              if (e === "") return;
              return (
                <Image
                  src={e}
                  width={60}
                  alt="FooterPayLogos"
                  height={60}
                  key={crypto.randomUUID()}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default FooterMobile;
