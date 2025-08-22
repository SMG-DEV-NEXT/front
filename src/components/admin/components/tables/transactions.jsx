"use client";
import Icon from "@/components/Icons";
import Text from "@/components/Text";
import moment from "moment";
import React, { useState } from "react";

export const TransactionTable = ({ data }) => {
  const [isReversed, setIsReversed] = useState(false);

  const groupedByDate = (isReversed ? data.reverse() : data).reduce(
    (acc, curr) => {
      const dateKey = curr.createdAt.slice(0, 10); // "YYYY-MM-DD"
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(curr);
      return acc;
    },
    {}
  );

  function getTotalProfit(purchases) {
    return purchases.reduce((sum, p) => sum + (p.checkoutedPrice || 0), 0);
  }
  const getAllPrice = () => {
    const total = getTotalProfit(data);
    return total;
  };

  return (
    <div className="flex w-full bg-input dark:bg-white dark:border dark:border-input rounded-[16px] text-white  overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#1E2026] dark:bg-white dark:border-b dark:border-input">
          <tr className="w-full">
            <th>
              <div className="h-[56px] px-[18px] flex items-start justify-start flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor dark:text-linkColor"
                >
                  date
                </Text>
                <div
                  className="flex"
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
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor text-center dark:text-linkColor"
                >
                  profit
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="account"
                  weight="semi"
                  size="sm"
                  className="text-linkColor text-center dark:text-linkColor"
                >
                  historyM
                </Text>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {(isReversed
            ? Object.keys(groupedByDate).reverse()
            : Object.keys(groupedByDate)
          ).map((e, i) => {
            const item = groupedByDate[e];
            return (
              <tr
                key={e}
                className="w-full border-b border-dashed border-b-[1px] border-linkColor"
              >
                <th>
                  <div className="h-[56px] px-[18px] flex items-start justify-start flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-primary10"
                    >
                      {moment(e).format("DD.MM.YYYY")}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-primary10 text-center"
                    >
                      {getTotalProfit(item)} ₽
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-primary10 text-center"
                    >
                      {item.length}
                    </Text>
                  </div>
                </th>
              </tr>
            );
          })}
          <tr className="w-full">
            <th>
              <div className="h-[56px] px-[18px] flex items-start justify-start flex items-center gap-[6px]">
                <Text
                  T="account"
                  weight="semi"
                  size="sm"
                  className="text-primary80"
                >
                  week
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="none"
                  weight="semi"
                  size="sm"
                  className="text-primary80 text-center"
                >
                  {getAllPrice().toFixed(2)} ₽
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="none"
                  weight="semi"
                  size="sm"
                  className="text-primary80 text-center"
                >
                  {data.length}
                </Text>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
