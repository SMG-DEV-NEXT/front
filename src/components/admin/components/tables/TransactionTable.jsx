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

const TransactionTable = ({ items = [] }) => {
  const [isReversed, setIsReversed] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const data = isReversed ? [...items].reverse() : items;
  return (
    <div className="flex w-full bg-input rounded-[16px] text-white mt-6 overflow-hidden">
      <table className="w-full overflow-auto">
        <thead className="bg-[#1E2026]">
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
                  mail
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
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  weight="semi"
                  size="sm"
                  className="text-linkColor text-center"
                >
                  cheat
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
                  get
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text weight="semi" size="sm" className="text-linkColor">
                  promo
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="preview"
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
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="preview"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  price
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="preview"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  pricePrcent
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
                  ip
                </Text>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={e.id} className="w-full">
                {/* <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-center">
                    <Checkbox
                      isChecked={selectedIds.includes(e.id)}
                      setIsChecked={() => onSelectItem(e.id)}
                    />
                  </div>
                </td> */}
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.email}
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

                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.cheat[`title${locale === "/ru" ? "Ru" : "En"}`]}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="admin"
                      weight="semi"
                      size="sm"
                      style={{
                        backgroundColor: e.isVisited
                          ? "#22C55E29"
                          : "#DE595929",
                        color: e.isVisited ? "#22C55E" : "#DE5959",
                      }}
                      className=" py-[2px] px-[6px] rounded-[6px]"
                    >
                      {e.isVisited ? "yes" : "no"}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="admin"
                      weight="semi"
                      size="sm"
                      style={{
                        backgroundColor: e.promoCode
                          ? "#22C55E29"
                          : "#DE595929",
                        color: e.promoCode ? "#22C55E" : "#DE5959",
                      }}
                      className=" py-[2px] px-[6px] rounded-[6px]"
                    >
                      {e.promoCode ? "yes" : "no"}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {moment(e.createdAt).format("D.MM.YYYY")}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.price}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.checkoutedPrice} /{" "}
                      {(e.checkoutedPrice / (e.price / 100)).toFixed(2)}%
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.ip}
                    </Text>
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

export default TransactionTable;
