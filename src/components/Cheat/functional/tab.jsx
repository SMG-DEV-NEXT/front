"use client";

import Text from "@/components/Text";
import { getLocale } from "@/utils/getlocale";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
const SelectedTabFunctional = ({ tab }) => {
  const [selectedTab, setSelectedTab] = useState(tab.tabs[0]);
  useEffect(() => {
    setSelectedTab(tab.tabs[0]);
  }, [tab]);
  return (
    <div className="flex flex-col overflow-x-auto tab-scroll gap-6 w-full pb-1 max-w-full">
      <div className="flex gap-4  max-w-full">
        {tab.tabs.map((e) => {
          return (
            <div
              key={e.key}
              className="px-6 py-4 bg-black rounded-b-lg cursor-pointer relative hover:bg-opacity-60 duration-200"
              onClick={() => setSelectedTab(e)}
            >
              <div
                className={`absolute w-1/2 h-[4px] bg-${
                  selectedTab?.key === e.key ? "primary80" : ""
                } top-0  rounded-b-lg`}
                style={{
                  transform: `translateX(-50%)`,
                  left: "50%",
                  transition: "0.3s ",
                }}
              ></div>
              <Text
                T="none"
                weight="semi"
                size="md"
                className="text-primary10
              "
              >
                {e.key}
              </Text>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-4 overflow-auto max-h-[350px] w-full comment-scroll pb-7">
        {selectedTab?.blocks.map((e) => {
          return (
            <div key={e.title} className="flex flex-col gap-1 ">
              <Text
                T="none"
                weight="medium"
                size="xl"
                className="text-primary10 leading-[140%]"
              >
                {e.title}
              </Text>
              <Text
                T="none"
                weight="normal"
                size="sm"
                className="text-linkColor"
              >
                {e[`about${getLocale()}`]}
              </Text>
              <div className="flex flex-wrap gap-1 mt-2">
                {e.items.map((tooltip, i) => {
                  return (
                    <Tooltip
                      title={tooltip[`tooltip${getLocale()}`]}
                      interactive={false}
                      position="top"
                      key={crypto.randomUUID()}
                      trigger="mouseenter"
                      arrow={true}
                      arrowSize="big"
                      className="custom-tooltip"
                    >
                      <div
                        id={`tab-${i}`}
                        className="py-3 px-4 bg-black group rounded-[12px] hover:bg-primary80 hover:bg-opacity-20 duration-200"
                      >
                        <Text
                          T="none"
                          className="text-linkColor group-hover:text-primary80"
                          weight="medium"
                          size="md"
                        >
                          {tooltip.title}
                        </Text>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SelectedTabFunctional;
