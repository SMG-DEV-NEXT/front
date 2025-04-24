"use client";
import React, {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAccessToken } from "../utils/token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "../services/User";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import Header from "@/components/Header";
import "../styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

const Top = dynamic(() => import("@/components/Top"), { ssr: false });
const Icon = dynamic(() => import("../components/Icons"), { ssr: false });

import Footer from "@/components/Footer";
import { redirect, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import SettingsService from "@/services/Settings";
import { ContactsService } from "@/services/Contacts";
import Image from "next/image";

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
  });
  const { data: contacts, isPending: isLoadingContacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: ContactsService.getAllContacts,
    refetchOnWindowFocus: false,
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

  if (data && data.data && data.data.isAdmin && !path.includes("admin")) {
    redirect(`/${locale}/admin/dashboard`);
  }
  if ((isPending && !!token) || isLoading || isLoadingContacts) {
    return (
      <div className="flex w-full h-[100vh] bg-input items-center justify-center">
        <Icon name="logo" size={50} />
      </div>
    );
  }
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
          <section className="content">{children}</section>
          <ToastContainer
            position="top-right"
            closeOnClick
            pauseOnHover
            autoClose={3000}
          />
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
        <Suspense fallback={<Loading />}>
          <section className="content relative bg-mainBlack">
            <Image
              src="/images/loginBg.png"
              style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
              quality={100}
              priority
              fill
              alt="Image"
              className="z-[0] w-full h-full"
            />{" "}
            {children}
          </section>
        </Suspense>
        <Footer />
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
