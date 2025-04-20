"use client";
import React from "react";
import Text from "../Text";
import Image from "next/image";
import Icon from "../Icons";
import Effect from "../Animations/Effect";
import { useMobile } from "@/hooks/useMobile";
import { useSettings } from "@/context/Middle";
import { useLocale } from "next-intl";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const GuaranteView = () => {
  const { settings } = useSettings();
  const guarante = settings.data.find((e) => e.title === "guarante")?.settings;
  const locale = useLocale();
  // const MobileComponent = dynamic(
  //   () => import("./mobiles/GuaranteMobile.jsx"),
  //   {
  //     ssr: false, // Disable SSR for this component (optional)
  //   }
  // );
  const isMobile = useMobile();

  // if (isMobile) return <MobileComponent locale={locale} guarante={guarante} />;

  return (
    <div className="view relative h-full w-full bg-mainBlack flex items-center justify-center pt-[60px] ">
      <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      />
      <div className="flex flex-col z-[1] gap-[164px] pt-[64px] w-full">
        <div className="container">
          <div className="flex flex-col gap-[48px] items-center">
            <Text weight="bold" size="t40" className="text-primary10">
              garant
            </Text>
            <Effect type="to-top" onceEffect={true} className="w-full">
              <div className="flex gap-6">
                <div className="w-full min-h-[344px] relative p-6">
                  <Image
                    src={"/images/document1.png"}
                    alt="Document"
                    fill
                    className="z-[1]"
                  />
                  <div className="flex flex-col  gap-6 z-[4] relative">
                    {guarante?.logo1 ? (
                      <Image
                        src={guarante.logo1}
                        className="h-[96px]"
                        width={96}
                        alt="Logo1"
                        height={96}
                      />
                    ) : (
                      <Icon name="card" folder="document" size={96} />
                    )}
                    <div className="flex flex-col  gap-2">
                      <Text
                        T={guarante.block1 ? "none" : "guarant"}
                        className="text-primary10"
                        weight="bold"
                        size="xl"
                      >
                        {guarante.block1
                          ? guarante.block1[`blockTitle${locale}`]
                          : "returnT"}
                      </Text>
                      <Text
                        T={guarante.block1 ? "none" : "guarant"}
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                      >
                        {guarante.block1
                          ? guarante.block1[`blockText${locale}`]
                          : "returnT"}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="w-full min-h-[344px] relative p-6">
                  <Image
                    src={"/images/document1.png"}
                    alt="Document"
                    fill
                    className="z-[1]"
                  />
                  <div className="flex flex-col  gap-6 z-[4] relative">
                    {guarante?.logo2 ? (
                      <Image
                        src={guarante.logo2}
                        className="h-[96px]"
                        width={96}
                        alt="Logo2"
                        height={96}
                      />
                    ) : (
                      <Icon name="tick" folder="document" size={96} />
                    )}{" "}
                    <div className="flex flex-col  gap-2">
                      <Text
                        T={guarante.block2 ? "none" : "guarant"}
                        className="text-primary10"
                        weight="bold"
                        size="xl"
                      >
                        {guarante.block2
                          ? guarante.block2[`blockTitle${locale}`]
                          : "reputT"}
                      </Text>
                      <Text
                        T={guarante.block2 ? "none" : "guarant"}
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                      >
                        {guarante.block2
                          ? guarante.block2[`blockText${locale}`]
                          : "reputS"}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="w-full min-h-[344px] relative p-6">
                  <Image
                    src={"/images/document1.png"}
                    alt="Document"
                    alt="Logo3"
                    fill
                    className="z-[1]"
                  />
                  <div className="flex flex-col  gap-6 z-[4] relative">
                    {guarante?.logo3 ? (
                      <Image
                        src={guarante.logo3}
                        className="h-[96px]"
                        width={96}
                        height={96}
                      />
                    ) : (
                      <Icon name="message" folder="document" size={96} />
                    )}{" "}
                    <div className="flex flex-col  gap-2">
                      <Text
                        T={guarante.block3 ? "none" : "guarant"}
                        className="text-primary10"
                        weight="bold"
                        size="xl"
                      >
                        {guarante.block3
                          ? guarante.block3[`blockTitle${locale}`]
                          : "tech1"}
                      </Text>
                      <Text
                        T={guarante.block3 ? "none" : "guarant"}
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                      >
                        {guarante.block3
                          ? guarante.block3[`blockText${locale}`]
                          : "tech2"}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </Effect>
          </div>
        </div>
        <div className="flex bg-input relative">
          <Image
            src={"/images/documentBg.png"}
            alt="Document"
            fill
            className="z-[1]"
          />
          <div className="container relative z-[2]">
            <div className="flex flex-col py-[64px] gap-[64px]">
              <Effect type="to-right">
                <div className="flex flex-col gap-6 w-[40%]">
                  <Text
                    className="text-primary10"
                    size="t48"
                    weight="bold"
                    T={guarante.block ? "none" : "guarant"}
                  >
                    {guarante.block
                      ? guarante.block[`blockTitle${locale}`]
                      : "guaranteTitle"}
                  </Text>
                  <Text
                    className="text-linkColor"
                    size="sm"
                    weight="medium"
                    T={guarante.block ? "none" : "guarant"}
                  >
                    {guarante.block
                      ? guarante.block[`blockText${locale}`]
                      : "guaranteText"}
                  </Text>
                </div>
              </Effect>
              <div className="flex gap-[64px]">
                <Effect type="to-left">
                  <div className="flex gap-4 items-center">
                    <Icon name="like" folder="document" size={64} />
                    <div className="flex flex-col gap-1">
                      <Text
                        className="text-primary10"
                        weight="bold"
                        size="xl"
                        T="none"
                      >
                        10 000+
                      </Text>
                      <Text
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                        T="guarant"
                      >
                        happyClients
                      </Text>
                    </div>
                  </div>
                </Effect>
                <Effect type="to-left">
                  <div className="flex gap-4 items-center">
                    <Icon name="korzina" folder="document" size={64} />
                    <div className="flex flex-col gap-1">
                      <Text
                        className="text-primary10"
                        weight="bold"
                        size="xl"
                        T="none"
                      >
                        40 000+
                      </Text>
                      <Text
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                        T="guarant"
                      >
                        sailed
                      </Text>
                    </div>
                  </div>
                </Effect>
                <Effect type="to-left">
                  <div className="flex gap-4 items-center">
                    <Icon name="safe" folder="document" size={64} />
                    <div className="flex flex-col gap-1">
                      <Text
                        className="text-primary10"
                        weight="bold"
                        size="xl"
                        T="none"
                      >
                        100%
                      </Text>
                      <Text
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                        T="guarant"
                      >
                        guarantBack
                      </Text>
                    </div>
                  </div>
                </Effect>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default GuaranteView;
