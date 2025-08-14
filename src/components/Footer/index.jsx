"use client";
import React, { useState, useEffect } from "react";
import Icon from "../Icons";
import Text from "../Text";
import Link from "next/link";
import CustomLink from "../CustomLink";
import { useMobile } from "../../hooks/useMobile";
import FooterMobile from "./mobile";
import { useSettings } from "@/context/Middle";
import { MainSettings } from "@/script/main";
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
function Footer() {
  const isMobile = useMobile();
  const { settings, contacts } = useSettings();
  const FooterContacts = contacts.data.filter((e) => e.footer);
  const FooterLinkContacts = FooterContacts.filter((e) => !e.help);
  const FooterHelpContacts = FooterContacts.filter((e) => e.help);
  const FooterSettings =
    settings.data.find((e) => e.title === "main")?.settings || MainSettings;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // This runs only on the client
  }, []);

  const handleClickUrl = (e) => {
    window.open(e, "_blank");
  };

  if (!mounted) return null;
  if (isMobile)
    return (
      <FooterMobile
        handleClickUrl={handleClickUrl}
        helpLinks={FooterHelpContacts}
        socialLinks={FooterLinkContacts}
        logos={FooterSettings.footer.payLogos}
        logo={FooterSettings.footer.logo}
      />
    );
  return (
    <div className="flex bg-input pt-[48px] z-[1] pb-[64px] mt-auto">
      <div className="container flex justify-between">
        <div className="flex h-full justify-between flex-col">
          <div className="flex items-center gap-6">
            {FooterSettings.footer.logo ? (
              <Image
                alt="LogoFooter"
                src={FooterSettings.footer.logo}
                height={48}
                width={43}
              />
            ) : (
              <Icon
                name={"logoFooter"}
                h={48}
                size={43}
                className="color-black"
              />
            )}

            <Text size="sm" className="text-linkColor w-[50%]" weight="medium">
              secure
            </Text>
          </div>
          <div className="flex items-center gap-3">
            {FooterSettings.footer.payLogos.map((e) => {
              if (e === "") return;
              return (
                <Image
                  src={e}
                  width={60}
                  objectFit="contain"
                  alt="FooterPayLogos"
                  height={60}
                  key={crypto.randomUUID()}
                />
              );
            })}
          </div>
        </div>
        <div className="flex gap-[96px]">
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
                  <Text
                    size="sm"
                    className="text-linkColor  hover:opacity-70 transition-opacity duration-300"
                    weight="medium"
                  >
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
                  <Text
                    size="sm"
                    className="text-linkColor hover:opacity-70 transition-opacity duration-300"
                    weight="medium"
                  >
                    {e.label}
                  </Text>
                </CustomLink>
              );
            })}
          </div>
          <div className="flex justify-between flex-col">
            <div className="flex flex-col gap-4">
              <Text
                className="text-linkColor leading-[140%]"
                weight="bold"
                size="lg"
              >
                social
              </Text>
              <div className="flex gap-4">
                {FooterLinkContacts.map((e) => {
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
                {/* <Icon name="telegram" className="cursor-pointer" />
                <Icon name="wk" className="cursor-pointer" />
                <Icon name="discord" className="cursor-pointer" /> */}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Text
                className="text-linkColor leading-[140%]"
                weight="bold"
                size="lg"
              >
                help
              </Text>
              <div className="flex gap-4">
                {FooterHelpContacts.map((e) => {
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
      </div>
    </div>
  );
}

export default Footer;
