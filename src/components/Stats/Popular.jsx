"use client";

import React from "react";
import Icon from "../Icons";
import Text from "../Text";
import { MomentFunctions } from "@/services/Moment";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
const popularStats = [
  {
    id: 1,
    title: "Как пользоваться приватным читом Rust SMG в 2024-ом году",
    date: "04.11.2024",
    view: "120",
  },
  {
    id: 2,
    title: "Как пользоваться приватным читом Rust SMG в 2024-ом году",
    date: "04.11.2024",
    view: "120",
  },
  {
    id: 3,
    title: "Как пользоваться приватным читом Rust SMG в 2024-ом году",
    date: "04.11.2024",
    view: "120",
  },
  {
    id: 4,
    title: "Как пользоваться приватным читом Rust SMG в 2024-ом году",
    date: "04.11.2024",
    view: "120",
  },
];

const PopularStats = ({ popular }) => {
  popular;
  const locale = useLocale();
  const router = useRouter();
  const openStat = (e) => {
    router.push(`stats/${e}`);
  };
  return (
    <div className="flex bg-input rounded-[16px] gap-[22px] flex-col p-6">
      <Text
        T="stats"
        weight="bold"
        size="xl"
        className="text-primary10 leading-[140%]"
      >
        popular
      </Text>
      {popular.map((e) => {
        return (
          <div
            className="flex gap-2 flex-col cursor-pointer"
            key={e.id}
            onClick={() => openStat(e.id)}
          >
            <Text
              T="none"
              weight="semi"
              size="lg"
              className="text-primary10 leading-[120%]"
            >
              {e[`title${locale}`]}
            </Text>
            <div className="flex gap-4 items-center">
              <div className="flex gap-1 items-center">
                <Icon name="date" folder="stats" size={20} />
                <Text
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                  T="none"
                >
                  {MomentFunctions.statsDate(e.createdAt)}
                </Text>
              </div>
              <div className="flex gap-1 items-center">
                <Icon name="eye" folder="stats" size={20} />
                <Text
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                  T="none"
                >
                  {e.view}
                </Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularStats;
