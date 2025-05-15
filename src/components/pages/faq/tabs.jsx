"use client";

import Icon from "@/components/Icons";
import Text from "@/components/Text";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const FAQTabs = ({ sections, mobile, selectedStat, handleSelectTab }) => {
  const locale = useLocale();
  return (
    <div
      style={{ width: mobile ? "100%" : "29%" }}
      className="flex w-[29%] flex-col p-6 gap-6 bg-input rounded-2xl"
    >
      {sections.map((e, indexSection) => {
        return (
          <div key={e.id} className="flex flex-col gap-3">
            <Text
              T="none"
              weight="bold"
              size="xl"
              className="text-primary10 leading-[140%]"
            >
              {e[`title${locale}`]}
            </Text>
            <div className="flex flex-col">
              {e.stats.map((stat) => {
                const dataStats = JSON.parse(stat.data);
                if (stat.id === selectedStat.id) {
                  return (
                    <div className="flex rounded-2xl px-3 bg-[#8B6DCA26] items-center gap-2 py-3 cursor-pointer">
                      {dataStats.icon && (
                        <Image
                          src={dataStats.iconActive || dataStats.icon}
                          width={20}
                          height={20}
                          objectFit="contain"
                          alt="logo"
                        />
                      )}
                      <Text
                        T="none"
                        weight="medium"
                        size="sm"
                        className="text-primary80"
                      >
                        {dataStats[`title${locale}`]}
                      </Text>
                    </div>
                  );
                }
                return (
                  <div
                    onClick={() => handleSelectTab(indexSection, stat)}
                    className="flex items-center px-3 gap-2 py-3 cursor-pointer"
                  >
                    {dataStats.icon && (
                      <Image
                        src={dataStats.icon}
                        width={20}
                        height={20}
                        objectFit="contain"
                        alt="logo"
                      />
                    )}
                    <Text
                      T="none"
                      weight="medium"
                      size="sm"
                      className="text-linkColor"
                    >
                      {dataStats[`title${locale}`]}
                    </Text>
                  </div>
                );
              })}
              {e.order === 0 && (
                <div
                  onClick={() =>
                    window.open(
                      "https://cdn.smgcheats.com/client.php",
                      "_blank"
                    )
                  }
                  className="flex items-center justify-between px-3 gap-2 py-3 cursor-pointer"
                >
                  <Text
                    T="none"
                    weight="medium"
                    size="sm"
                    className="text-linkColor"
                  >
                    Loader
                  </Text>
                  <Icon name="loader" folder="admin" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQTabs;
