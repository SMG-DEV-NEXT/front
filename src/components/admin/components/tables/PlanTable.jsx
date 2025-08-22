"use client";
import React, { useState } from "react";
import Text from "@/components/Text";
import Icon from "@/components/Icons";
import AdminButton from "../button";
import { useLocale } from "next-intl";
import getLanguage from "@/utils/get-language";
import { useRouter } from "next/navigation";

const PlanTable = ({ items, time }) => {
  const [isReversed, setIsReversed] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const getCount = (item) => {
    const dayCount = item.day ? item.day.keys.length : "--";
    const weekCount = item.week ? item.week.keys.length : "--";
    const montCount = item.month ? item.month.keys.length : "--";
    switch (time) {
      case "all":
        return `${dayCount} / ${weekCount} / ${montCount}`;
      case "day":
        return dayCount;
      case "week":
        return weekCount;
      default:
        return montCount;
    }
  };

  const editItem = (id) => {
    router.push(`/${locale}/admin/plans/${id}`);
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
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  position
                </Text>
                <div
                  className="flex"
                  style={{
                    transform: `rotate(${isReversed ? 180 : 0}deg)`,
                    transition: "0.3s",
                    width: "18px",
                  }}
                  onClick={() => setIsReversed(!isReversed)}
                >
                  <Icon
                    name="arrowF"
                    folder="admin"
                    size={18}
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
            <th className="w-[30%]">
              <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  name
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
                  count
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
                  status
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
            const count = getCount(e.plan);
            return (
              <tr
                key={e.id}
                className="w-full dark:border-b dark:border-linkColor last:border-none"
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
                      {e.position}
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
                  <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e[`title${getLanguage()}`]}
                    </Text>
                  </div>
                </th>
                <th className="w-[40%]">
                  <div className="h-[56px] text-center w-full px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className={`text-${
                        count === "--" || count === 0
                          ? "[#DE5959]"
                          : "linkColor"
                      } text-center`}
                    >
                      {count}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    {e.status === "published" ? (
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
                    <AdminButton onClick={() => editItem(e.plan.id)}>
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

export default PlanTable;
