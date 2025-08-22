"use client";
import React, { useState } from "react";
import Text from "@/components/Text";
import Icon from "@/components/Icons";
import AdminButton from "../button";
import { useLocale } from "next-intl";
import getLanguage from "@/utils/get-language";
import { useRouter } from "next/navigation";
import moment from "moment";
import Image from "next/image";

const StatTable = ({ items = [], time }) => {
  const [isReversed, setIsReversed] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const editItem = (id) => {
    router.push(`/${locale}/admin/stats/${id}`);
  };

  const data = isReversed ? [...items].reverse() : items;
  return (
    <div className="flex w-full bg-input dark-box rounded-[16px] text-white mt-6 overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#1E2026] dark-head">
          <tr className="w-full">
            {/* <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Checkbox
                  isChecked={selectedIds.length === items.length}
                  setIsChecked={handleSelectAll}
                />
              </div>
            </th> */}
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  date
                </Text>
                <div
                  className="flex w-[18px] h-[18px]"
                  style={{
                    transform: `rotate(${isReversed ? 180 : 0}deg)`,
                    transition: "0.3s",
                  }}
                  onClick={() => setIsReversed(!isReversed)}
                >
                  <Icon
                    name="arrowF"
                    folder="admin"
                    className="w-[18px] h-[18px] cursor-pointer"
                  />
                </div>
              </div>
            </th>
            {/* <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  logo
                </Text>
              </div>
            </th> */}
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor text-start"
                >
                  category
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  prevStat
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  type
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-end flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  actions
                </Text>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr
                key={e.id}
                className="w-full dark:border-b dark:border-input last:border-none"
              >
                {/* <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-center">
                    <Checkbox
                      isChecked={selectedIds.includes(e.id)}
                      setIsChecked={() => onSelectItem(e.id)}
                    />
                  </div>
                </td> */}
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {moment(e.createdAt).format("DD.MM.YYYY")}
                    </Text>
                  </div>
                </th>
                {/* <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  logo
                </Text>
              </div>
            </th> */}
                <th className="w-[30%]">
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.catalog.title}
                    </Text>
                  </div>
                </th>
                <th className="w-[70%]">
                  <div className="h-[80px] w-full text-center w-full px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                    <div className="flex gap-3 items-center ">
                      <div className="w-[48px] h-[48px] overflow-hidden rounded-[12px]">
                        <Image
                          src={e.Image1 || e.Image2}
                          alt="ImageStat"
                          objectFit="contain"
                          width={48}
                          className="w-[48px] h-[48px] contain"
                          height={48}
                        />
                      </div>
                      <div className="flex flex-col gap-1 items-start">
                        <Text
                          T="none"
                          weight="semi"
                          size="sm"
                          className={`text-[#E9E3F7] dark:text-linkColor
                      } `}
                        >
                          {e[`title${locale}`]}
                        </Text>
                        <Text
                          T="none"
                          weight="medium"
                          size="sm"
                          className={`text-linkColor whitespace-nowrap truncate max-w-[350px] overflow-hidden"
                      } `}
                        >
                          {e[`about${locale}`]}
                        </Text>
                      </div>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    {e.type === "published" ? (
                      <Icon
                        name="publish"
                        folder="admin"
                        className="w-[24px] h-6"
                      />
                    ) : (
                      <div className="relative">
                        <Icon
                          name="unpublish"
                          folder="admin"
                          className="w-[24px] h-6"
                        />
                        <div className="absolute top-1/2 left-1/2 rotate-45 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[31px] bg-[#DE5959] "></div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-end flex items-center gap-[16px]">
                    <AdminButton onClick={() => editItem(e.id)}>
                      addSettings
                    </AdminButton>
                    {/* <div
                      className="flex items-center bg-[#DE595926] px-3 py-[6px] rounded-[8px] cursor-pointer"
                      onClick={() => onClickDeleteIcon(e.title, e.id)}
                    >
                      <Icon name="trash" folder="admin" />
                    </div> */}
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatTable;
