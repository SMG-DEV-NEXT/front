"use client";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { getAccessToken } from "../utils/token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "../services/User";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import Header from "@/components/Header";
import "../styles/global.scss";
import "react-toastify/dist/ReactToastify.css";
import ChatWidget from "../components/mini-chat";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const Top = dynamic(() => import("@/components/Top"), { ssr: false });
const Icon = dynamic(() => import("../components/Icons"), { ssr: false });

import Footer from "@/components/Footer";
import { redirect, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import SettingsService from "@/services/Settings";
import { ContactsService } from "@/services/Contacts";
import Image from "next/image";
import { ThemeProvider } from "next-themes";

export function ChatbroWidget() {
  const isConnected = useRef(false);
  useEffect(() => {
    if (isConnected.current) return;
    const script = document.createElement("script");
    // script.src = "https://www.chatbro.com/embed.js";

    script.id = "chatBroEmbedCode";
    script.type = "text/javascript";
    function ChatbroLoader(chats, async) {
      async = !1 !== async;
      var params = {
          embedChatsParameters: chats instanceof Array ? chats : [chats],
          lang: navigator.language || navigator.userLanguage,
          needLoadCode: "undefined" == typeof Chatbro,
          embedParamsVersion: localStorage.embedParamsVersion,
          chatbroScriptVersion: localStorage.chatbroScriptVersion,
        },
        xhr = new XMLHttpRequest();
      xhr.withCredentials = !0;
      xhr.onload = function () {
        eval(xhr.responseText);
      };
      xhr.onerror = function () {
        console.error("Chatbro loading error");
      };
      xhr.open(
        "GET",
        "https://www.chatbro.com/embed.js?" +
          btoa(unescape(encodeURIComponent(JSON.stringify(params)))),
        async
      );
      xhr.send();
      isConnected.current = true;
    }
    /* Chatbro Widget Embed Code End */
    ChatbroLoader({
      encodedChatId: "897PD",
      chatRight: "20px",
      chatHeaderBackgroundColor: "#8767CF",
      chatHeaderTextColor: "#E9E3F6",
      chatBodyBackgroundColor: "#E9E3F6",
      chatBodyTextColor: "#8767CF",
      chatState: "minimized",
      chatInputTextColor: "#181A1F",
      avatarBorderRadius: "12px",
    });

    // return () => {
    //   document.head.removeChild(script);
    // };
  }, []);

  return null; // widget is injected into DOM
}

const SettingsContext = createContext({
  isLoading: false,
  settings: [],
  updateSetting: () => {},
  isLoadingSaveQuery: false,
});
export const fetchCache = "force-no-store";
const MiddleComponent = ({ children }) => {
  const dispatch = useDispatch();
  const token = getAccessToken();
  const path = usePathname();
  const locale = useLocale();
  const queryClient = useQueryClient();
  const { data, error, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: UserService.auth,
    enabled: !!token,
    refetchOnWindowFocus: false,
  });
  const { data: settings, isPending: isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: SettingsService.getAllSettings,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // data stays fresh for 5 mins
    cacheTime: 1000 * 60 * 30, // unused data lives for 30 mins
  });
  const { data: contacts, isPending: isLoadingContacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: ContactsService.getAllContacts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // data stays fresh for 5 mins
    cacheTime: 1000 * 60 * 30, // unused data lives for 30 mins
  });
  // if (!token && path.includes("admin")) {
  //   console.log(2);
  //   redirect(`/${locale}/login`);
  // }

  useEffect(() => {
    if (!token && path.includes("admin")) {
      redirect(`/${locale}/login`);
    }
    if (data) {
      dispatch(setAuth(data.data));
    }
  }, [data, dispatch]);
  const currentTheme =
    typeof window !== "undefined"
      ? window.localStorage.getItem("theme") || "light"
      : "light";

  const mutation = useMutation({
    mutationFn: async ({ title, settings }) => {
      return SettingsService.updateSettings({ title, settings });
    },
    onSuccess: () => {
      toast.success("Updated successfuly.");
      queryClient.invalidateQueries(["settings"]); // refetch updated data
    },
  });

  const updateSetting = (title, settings) => {
    mutation.mutate({ title, settings });
  };

  // if (data && data.data && data.data.isAdmin && !path.includes("admin")) {
  //   redirect(`/${locale}/admin/dashboard`);
  // }
  if ((isPending && !!token) || isLoading || isLoadingContacts) {
    return null;
  }
  const User = data?.data;
  const UserIsAdmin = User?.isAdmin;
  if (path.includes("admin")) {
    return (
      <>
        <SettingsContext.Provider
          value={{
            settings: settings,
            isLoading,
            updateSetting,
            contacts,
            isLoadingSaveQuery: mutation.isPending,
          }}
        >
          <ThemeProvider attribute="class" defaultTheme={currentTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <section className="content relative">{children}</section>
              <ToastContainer
                position="top-right"
                closeOnClick
                pauseOnHover
                autoClose={3000}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </SettingsContext.Provider>
      </>
    );
  }
  return (
    <>
      <SettingsContext.Provider
        value={{
          settings: settings,
          isLoading,
          contacts,
          updateSetting,
          isLoadingSaveQuery: mutation.isPending,
        }}
      >
        <Top />
        <Header />
        <section className="content relative bg-mainBlack">
          <div className="fixed inset-0 bg-login bg-cover bg-top " />
          {UserIsAdmin && (
            <div
              onClick={() => {
                window.open(
                  `${window.location.origin}/ru/admin/dashboard`,
                  "_blank"
                );
              }}
              className="fixed z-[99999] right-[80px] bg-primary80 bottom-[16px] p-2 rounded-full cursor-pointer flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Icon name="admin" size={30} />
            </div>
          )}
          <div className="z-[1]">{children}</div>
        </section>
        <Footer />
        <ChatbroWidget />
        <ToastContainer
          position="top-right"
          closeOnClick
          pauseOnHover
          autoClose={3000}
        />
      </SettingsContext.Provider>
    </>
  );
};

export default MiddleComponent;
export const useSettings = () => useContext(SettingsContext);
