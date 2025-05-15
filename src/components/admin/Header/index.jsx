"use client";

import Icon from "@/components/Icons";
import { setAuth } from "@/redux/authSlice";
import UserService from "@/services/User";
import { removeAccessToken } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const LANGUAGE_ITEMS = [
  { key: "ru", label: "russian", image: "/images/flag-ru.png" },
  { key: "en", label: "english", image: "/images/flag-us.png" },
];

const AdminHeader = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentLangKey = useMemo(
    () => pathname.split("/")[1] || "ru",
    [pathname]
  );
  const [language, setLanguage] = useState(
    LANGUAGE_ITEMS.find((item) => item.key === currentLangKey) ||
      LANGUAGE_ITEMS[0]
  );

  const mutate = useMutation({
    mutationFn: UserService.logout,
    mutationKey: "logout",
    onSuccess: () => {
      dispatch(setAuth({}));
      removeAccessToken();
      window.location.href = "/";
    },
  });

  const logout = () => {
    mutate.mutate();
  };

  const handleLanguageChange = () => {
    const lang = language.key === "ru" ? LANGUAGE_ITEMS[1] : LANGUAGE_ITEMS[0];
    setLanguage(lang);
    const newPath = `/${lang.key}${pathname.replace(/^\/(en|ru|zh)/, "")}`;
    window.location.href = newPath; // hly vor to mna senc
  };

  return (
    <div className="flex items-center py-[22px] px-10 w-full justify-between">
      <div></div>
      <div className="flex items-center gap-4">
        <div
          className="w-[28px] h-5 rounded-[3px] overflow-hidden cursor-pointer"
          onClick={handleLanguageChange}
        >
          <Image
            src={language.image}
            width={28}
            height={20}
            alt="language"
            className="w-[28px] h-5 cursor-pointer"
          />
        </div>
        <div className="rounded-full p-[2px] border border-primary80 cursor-pointer">
          <Image
            src={"/images/avatar.png"}
            width={36}
            alt="avatar"
            height={36}
            onClick={() => router.push(`/${locale}`)}
            className="w-9 h-9 rounded-full"
          />
        </div>
        <div className="cursor-pointer" onClick={logout}>
          <Icon name="logout" folder="admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
