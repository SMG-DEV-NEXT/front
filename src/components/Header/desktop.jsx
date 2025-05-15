"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import Icon from "../Icons";
import Text from "../Text";
import Input from "../Input";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import "./index.scss";
import CustomLink from "../CustomLink";
import HeaderMyAccount from "./Account";
import { useSelector } from "react-redux";
import { MainSettings } from "@/script/main";
import { useSettings } from "@/context/Middle";

const LANGUAGE_ITEMS = [
  { key: "ru", label: "russian" },
  { key: "en", label: "english" },
];

export default function Header() {
  const t = useTranslations("Index");
  const { settings } = useSettings();
  const HeaderSettings =
    settings.data.find((e) => e.title === "main")?.settings || MainSettings;
  const pathname = usePathname();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const currentLangKey = useMemo(
    () => pathname.split("/")[1] || "ru",
    [pathname]
  );

  const [language, setLanguage] = useState(
    LANGUAGE_ITEMS.find((item) => item.key === currentLangKey) ||
      LANGUAGE_ITEMS[0]
  );

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    const newPath = `/${lang.key}${pathname.replace(/^\/(en|ru|zh)/, "")}`;
    window.location.href = newPath; // hly vor to mna senc
  };

  return (
    <div
      className="header-container z-[12]"
      style={{ backgroundColor: "#0E0F12" }}
    >
      <div className="container flex items-center justify-between py-3 header">
        <div className="flex items-center gap-6">
          <CustomLink url="">
            <Image
              src={HeaderSettings.header.logo || "/images/logo.png"}
              alt="logo"
              width={43}
              objectFit="contain"
              height={48}
            />
          </CustomLink>
          {HeaderSettings.header.routes.map((key) => (
            <CustomLink
              key={key}
              url={`/${key}`}
              className="text-linkColor text-sm leading-[140%] font-medium"
            >
              {t(key)}
            </CustomLink>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <Dropdown>
            <DropdownTrigger className="z-[0]">
              <div className="flex language-picker cursor-pointer items-center gap-2 ">
                <Icon name="Language" />
                <Text className="text-linkColor text-sm font-medium">
                  {language.key.toUpperCase()}
                </Text>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select Language"
              className="flex flex-col rounded-2xl overflow-hidden items-center"
            >
              {LANGUAGE_ITEMS.map((item) => (
                <DropdownItem
                  key={item.key}
                  onClick={() => handleLanguageChange(item)}
                  className="language-item justify-center"
                  style={{
                    backgroundColor:
                      item.key === language.key ? "#8B6DCA" : "#272c33",
                  }}
                >
                  <Text className="text-primary10 text-center text-sm">
                    {item.label}
                  </Text>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Search Input */}
          {/* <Input iconLeft="searchNew" /> */}

          {/* Auth Buttons */}
          {user?.id ? (
            <HeaderMyAccount />
          ) : (
            <div
              className="buttons"
              style={{
                boxShadow: "inset 0 8px 18.5px rgba(207, 184, 255, 0.75)",
              }}
            >
              <CustomLink url="/login">
                <Text className="text-primary10" weight="semi" size="sm">
                  login
                </Text>
              </CustomLink>
              <div className="buttons-line"></div>
              <CustomLink url="/registration">
                <Text className="text-primary10" weight="semi" size="sm">
                  register
                </Text>
              </CustomLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
