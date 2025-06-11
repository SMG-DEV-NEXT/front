"use client";
import React, { useState } from "react";
import Text from "../../../Text";
import Icon from "../../../Icons";
import {
  ProcessorOptions,
  Spoofer,
  SystemOptions,
  TypeWindow,
} from "@/components/admin/Cheat/create/requirments/options";

const items = [
  {
    title: "client",
    value: "Внутриигровой",
    icon: "jostick",
  },
  {
    title: "anitCheat",
    value: "Внутриигровой",
    icon: "safe",
  },
  {
    title: "oc",
    value: "oc",
    icon: "windows",
  },
  {
    title: "proccesor",
    value: "processor",
    icon: "cpu",
  },
  {
    title: "spoofer",
    value: "spoofer",
    icon: "shuffle",
  },
  {
    title: "gameTime",
    value: "window",
    icon: "display",
  },
];

const display = [
  {
    title: "gameTime",
    value: "Безрамочный",
    icon: "display",
  },
  {
    title: "gameTime",
    value: "Полноэкранный",
    icon: "display",
  },
  {
    title: "gameTime",
    value: "Оконный",
    icon: "display",
  },
];
const GetText = ({ value, req }) => {
  if (value === "oc") {
    const label = (
      SystemOptions.filter((e) => req[value]?.includes(e.value)) || []
    ).map((e) => e.label);
    if (!label) return;
    return (
      <Text T="none" className="text-primary10" weight="semi" size="base">
        Windows {label.join(" / ")}
      </Text>
    );
  }
  if (value === "window") {
    const label = (
      TypeWindow.filter((e) => req[value]?.includes(e.value)) || []
    ).map((e) => e.label);
    if (!label) return;
    return (
      <Text T="none" className="text-primary10" weight="semi" size="base">
        {label.join(",")}
      </Text>
    );
  }
  if (value === "processor") {
    const label = (
      ProcessorOptions.filter((e) => req[value]?.includes(e.value)) || []
    ).map((e) => e.label);
    if (!label) return;
    return (
      <Text T="none" className="text-primary10" weight="semi" size="base">
        {label.join(" / ")}
      </Text>
    );
  }
  if (value === "spoofer") {
    const label = (
      Spoofer.filter((e) => req[value]?.includes(e.value)) || []
    ).map((e) => e.label);
    if (!label) return;
    return (
      <Text T="none" className="text-primary10" weight="semi" size="base">
        {label.join(" / ")}
      </Text>
    );
  }
  return (
    <Text T="none" className="text-primary10" weight="semi" size="base">
      {value}
    </Text>
  );
};
const getWindowOptions = (req, value) => {
  const label = (
    TypeWindow.filter((e) => req[value]?.includes(e.value)) || []
  ).map((e) => e.label);
  return label.map((e) => {
    return {
      title: "gameTime",
      value: e,
      icon: "display",
    };
  });
};
const Programs = ({ mobile, cheat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const req = cheat.requirments[0];
  if (mobile) {
    return (
      <div className="flex flex-col gap-4">
        <Text T="product" weight="bold" size="xl" className="text-primary10">
          for
        </Text>
        <div className="flex flex-col bg-input rounded-[16px]">
          <div className="flex flex-col gap-6 gap-y-6 p-6 ">
            {items.map((e) => {
              return (
                <div
                  className="flex  gap-3  items-center"
                  key={crypto.randomUUID()}
                >
                  <div className="p-3 bg-black rounded-[8px]">
                    <Icon name={e.icon} folder="products" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <Text
                      T="product"
                      className="text-linkColor"
                      weight="medium"
                      size="sm"
                    >
                      {e.title}
                    </Text>
                    <GetText value={e.value} req={req} />

                    {/* {e.title === "gameTime" ? (
                      <div onClick={() => setIsOpen(!isOpen)}>
                        <Text
                          T="product"
                          className="cursor-pointer text-primary10 underline"
                          weight="semi"
                          size="base"
                        >
                          {isOpen ? "hide" : "show"}
                        </Text>
                      </div>
                    ) : (
                      <GetText value={e.value} req={req} />
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
          {isOpen && (
            <>
              <div className="w-fill h-[1px] bg-[#404658]"></div>
              <div className="flex flex-col gap-6 gap-y-6 p-6 ">
                {getWindowOptions(req, "window").map((e, i) => {
                  return (
                    <div className="flex  gap-3">
                      <div className="p-3 bg-black rounded-[8px]">
                        <div className="relative">
                          <Icon name={e.icon} folder="products" />
                          <div
                            className="absolute border border-black rounded-full border-[2px]"
                            style={{ top: "-28%", right: "-32%" }}
                          >
                            <div className="w-[16px] h-[16px] bg-[#272c33] rounded-full border border-[#7b8293] flex-col justify-center items-center ">
                              <div className=" text-center flex items-center justify-center text-[#7b8293] text-[10.67px] font-semibold  leading-[12.80px]">
                                {i + 1}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <Text
                          T="product"
                          className="text-linkColor"
                          weight="medium"
                          size="sm"
                        >
                          {e.title}
                        </Text>
                        <Text
                          T="none"
                          className="text-primary10"
                          weight="semi"
                          size="base"
                        >
                          {e.value}
                        </Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col  gap-4">
      <Text
        T="product"
        weight="bold"
        size="xl"
        className="text-primary10 leading-[120%]"
      >
        for
      </Text>
      <div className="flex flex-col bg-input rounded-[16px]">
        <div className="grid  grid-cols-3 gap-6 gap-y-6 p-6 ">
          {items.map((e) => {
            return (
              <div
                className="flex  gap-3 items-center"
                key={crypto.randomUUID()}
              >
                <div className="p-3 bg-black rounded-[8px]">
                  <Icon name={e.icon} folder="products" />
                </div>
                <div className="flex flex-col justify-between">
                  <Text
                    T="product"
                    className="text-linkColor"
                    weight="medium"
                    size="sm"
                  >
                    {e.title}
                  </Text>
                  <GetText value={e.value} req={req} />

                  {/* {e.title === "gameTime" ? (
                    <div onClick={() => setIsOpen(!isOpen)}>
                      <Text
                        T="product"
                        className="cursor-pointer text-primary10 underline"
                        weight="semi"
                        size="base"
                      >
                        {isOpen ? "hide" : "show"}
                      </Text>
                    </div>
                  ) : (
                    <GetText value={e.value} req={req} />
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
        {isOpen && (
          <>
            <div className="w-fill h-[1px] bg-[#404658]"></div>
            <div className="grid  grid-cols-3 gap-6 gap-y-6 p-6 ">
              {getWindowOptions(req, "window").map((e, i) => {
                return (
                  <div className="flex  gap-3" key={crypto.randomUUID()}>
                    <div className="p-3 bg-black rounded-[8px]">
                      <div className="relative">
                        <Icon name={e.icon} folder="products" />
                        <div
                          className="absolute border border-black rounded-full border-[2px]"
                          style={{ top: "-28%", right: "-32%" }}
                        >
                          <div className="w-[16px] h-[16px] bg-[#272c33] rounded-full border border-[#7b8293] flex-col justify-center items-center ">
                            <div className=" text-center flex items-center justify-center text-[#7b8293] text-[10.67px] font-semibold  leading-[12.80px]">
                              {i + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <Text
                        T="product"
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                      >
                        {e.title}
                      </Text>
                      <Text
                        T="none"
                        className="text-primary10"
                        weight="semi"
                        size="base"
                      >
                        {e.value}
                      </Text>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Programs;
