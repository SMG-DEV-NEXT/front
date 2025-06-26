"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
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
import { createPortal } from "react-dom";

const LANGUAGE_ITEMS = [
  { key: "ru", label: "russian" },
  { key: "en", label: "english" },
];

const MenuIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} fill="none">
      <path
        stroke="#7B8293"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.167 2.375h12.666M3.167 7.125h12.666m-12.666 4.75h12.666m-12.666 4.75h12.666"
      />
    </svg>
  );
};

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

  useEffect(() => {
    if (isOpenBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenBar]);

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
      className="header-container  z-[12]"
      style={{ backgroundColor: "#0E0F12" }}
    >
      {createPortal(
        <div
          style={{
            background: !isOpenBar ? "tertiary" : `rgba(0,0,0,0.5)`,
            backdropFilter: !isOpenBar ? "" : "blur(3px)",
            transition: "0.3s",
            visibility: !isOpenBar ? "hidden" : "visible",
            left: "0%",
            zIndex: isOpenBar ? "8000" : "-5",
          }}
          onClick={() => setIsOpenBar(false)}
          className="w-full absolute   h-full absolute "
        ></div>,
        document.body.querySelector("section")
      )}
      {createPortal(
        <div
          style={{
            transform: `translateX(${!isOpenBar ? "-100%" : "0%"})`,
            transition: "0.3s",
          }}
          className="absolute min-w-[280px] h-full  z-[9999]  "
        >
          <div
            className="absolute left-0 top-0 w-full h-full z-[9000]"
            style={{ background: "rgb(14,15,18)" }}
          >
            <div className="flex flex-col gap-[40px] pr-5 pl-5 pt-5">
              <div className="flex flex-col gap-3">
                {HeaderSettings.header.routes.map((key) => (
                  <CustomLink
                    key={key}
                    url={`/${key}`}
                    className="text-linkColor text-lg hover:text-primary10 duration-200"
                  >
                    <div onClick={() => setIsOpenBar(false)}>{t(key)}</div>
                  </CustomLink>
                ))}
              </div>
              {user?.id ? (
                <HeaderMyAccount />
              ) : (
                <div
                  className="buttons"
                  style={{
                    maxWidth: "max-content",
                    boxShadow: "inset 0 8px 18.5px rgba(207, 184, 255, 0.75)",
                  }}
                >
                  <Text
                    className="text-primary10 cursor-pointer px-5 py-3"
                    onClick={() => {
                      setIsOpenBar(false);
                      setIsOpenLoginModal(true);
                    }}
                    weight="semi"
                    size="sm"
                  >
                    login
                  </Text>
                  <div className="buttons-line"></div>
                  <Text
                    className="text-primary10 cursor-pointer px-5 py-3"
                    onClick={() => {
                      setIsOpenBar(false);
                      setIsOpenRegistrationModal(true);
                    }}
                    weight="semi"
                    size="sm"
                  >
                    register
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body.querySelector("section")
      )}

      <div className="container flex items-center justify-between py-4 header">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1 cursor-pointer ml-2">
            <button
              className="relative w-5 h-5 flex flex-col justify-between items-center group"
              onClick={() => setIsOpenBar(!isOpenBar)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-full h-[2px] bg-linkColor rounded transition-transform duration-300 ${
                  isOpenBar ? "rotate-45 translate-y-[2.8px] mt-2" : ""
                }`}
              />
              <span
                className={`w-full h-[2px] bg-linkColor rounded transition-all duration-300 ${
                  isOpenBar ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-[2px] bg-linkColor rounded transition-transform duration-300 ${
                  isOpenBar ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
          <CustomLink url="">
            <Image
              src={HeaderSettings.header.logo || "/images/logo.png"}
              alt="logo"
              width={43}
              height={48}
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
          customTop={"50%"}
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
                <Text className="text-linkColor text-sm">
                  {language.key.toUpperCase()}
                </Text>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select Language"
              className="flex flex-col rounded-[16px] overflow-hidden items-center"
            >
              {LANGUAGE_ITEMS.map((item, i) => (
                <DropdownItem
                  key={item.key}
                  onClick={() => handleLanguageChange(item)}
                  className={`language-item justify-center rounded-${
                    i === 0 ? "t" : "b"
                  }-2xl`}
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
        </div>
      </div>
    </div>
  );
}
