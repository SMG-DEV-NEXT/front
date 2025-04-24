"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import Icon from "../Icons";
import Text from "../Text";
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
import Modal from "./../Modal/index";
import View from "../pages/Login";
import ViewRegistration from "../pages/Registration";
import Forget from "../pages/Forget";
import { useSettings } from "@/context/Middle";
import { MainSettings } from "@/script/main";

const LANGUAGE_ITEMS = [
  { key: "ru", label: "russian" },
  { key: "en", label: "english" },
  { key: "zh", label: "Chine" },
];

export default function HeaderMobile() {
  const t = useTranslations("Index");
  const pathname = usePathname();
  const router = useRouter();
  const { settings } = useSettings();
  const HeaderSettings =
    settings.data.find((e) => e.title === "main")?.settings || MainSettings;
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegistrationModal, setIsOpenRegistrationModal] = useState(false);
  const [isOpenForgetPasswordModal, setIsOpenForgetPasswordModal] =
    useState(false);
  const [isOpenBar, setIsOpenBar] = useState(false);

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
    <div className="header-container " style={{ backgroundColor: "#0E0F12" }}>
      <div
        className={`bg-input header-bar p-6 flex flex-col${
          isOpenBar && " header-open"
        }`}
      >
        <div
          className="flex gap-2 cursor-pointer ml-2"
          onClick={() => setIsOpenBar(false)}
        >
          <div
            className="w-[2px] rounded-full h-[19px] bg-linkColor"
            style={{ transform: "rotate(45deg)" }}
          ></div>
          <div
            className="w-[2px] rounded-full h-[19px] bg-linkColor ml-[-10px]"
            style={{ transform: "rotate(-45deg)" }}
          ></div>
        </div>
        <div className="flex flex-col mt-6">
          {HeaderSettings.header.routes.map((key) => (
            <CustomLink
              key={key}
              url={`/${key}`}
              className="text-linkColor text-md"
            >
              <div onClick={() => setIsOpenBar(false)}>{t(key)}</div>
            </CustomLink>
          ))}
        </div>
      </div>
      <div className="container flex items-center justify-between py-3 header">
        <div className="flex items-center gap-6">
          <div
            className="flex flex-col gap-1 cursor-pointer ml-2"
            onClick={() => setIsOpenBar(true)}
          >
            <div className="w-[19px] rounded-full h-[1.5px] bg-linkColor"></div>
            <div className="w-[19px] rounded-full h-[1.5px] bg-linkColor "></div>
            <div className="w-[19px] rounded-full h-[1.5px] bg-linkColor "></div>
            <div className="w-[19px] rounded-full h-[1.5px] bg-linkColor "></div>
          </div>
          <CustomLink url="">
            <Image
              src={HeaderSettings.header.logo || "/images/logo.png"}
              alt="logo"
              width={46}
              height={41}
            />
          </CustomLink>
        </div>
        <Modal
          isOpen={isOpenLoginModal}
          customTop={140}
          onClose={() => setIsOpenLoginModal(false)}
        >
          <View
            isMobile={true}
            onClose={() => setIsOpenLoginModal(false)}
            goToRegistration={() => {
              setIsOpenLoginModal(false);
              setIsOpenRegistrationModal(true);
            }}
            goToForgetPassword={() => {
              setIsOpenForgetPasswordModal(true);
              setIsOpenLoginModal(false);
            }}
          />
        </Modal>
        <Modal
          isOpen={isOpenRegistrationModal}
          customTop={140}
          onClose={() => setIsOpenRegistrationModal(false)}
        >
          <ViewRegistration
            onClose={() => setIsOpenLoginModal(false)}
            isMobile={true}
            goToLogin={() => {
              setIsOpenLoginModal(true);
              setIsOpenRegistrationModal(false);
            }}
          />
        </Modal>
        <Modal
          isOpen={isOpenForgetPasswordModal}
          customTop={140}
          onClose={() => setIsOpenForgetPasswordModal(false)}
        >
          <Forget
            isMobile={true}
            onClose={() => setIsOpenForgetPasswordModal(false)}
            goToLogin={() => {
              setIsOpenLoginModal(true);
              setIsOpenForgetPasswordModal(false);
            }}
          />
        </Modal>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <Dropdown>
            <DropdownTrigger className="z-[0]">
              <div className="flex language-picker cursor-pointer items-center gap-2 ">
                <Icon name="Language" />
                {/* <Text className="text-linkColor text-sm">
                  {language.key.toUpperCase()}
                </Text> */}
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
            <div className="buttons">
              <Text
                className="text-primary10 cursor-pointer"
                onClick={() => setIsOpenLoginModal(true)}
                weight="semi"
                size="sm"
              >
                login
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
