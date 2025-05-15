"use client";

import Loading from "@/app/loading";
import StatistisService from "@/services/Statistic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Chart from "./chart";
import AdminContainer from "../components/container";
import Icon from "@/components/Icons";
import Text from "@/components/Text";
import { Stack, Stroke } from "./icon";
import { TransactionTable } from "@/components/admin/components/tables/transactions";

const colors = {
  checkoutedKeys: "#00A76F",
  newUsers: "#ECB92C",
  amount: "#8B6DCA",
};

const WeekBlock = ({ title, percent, txt }) => {
  return (
    <div className="flex items-center rounded-2xl bg-input p-6">
      <div className="flex flex-col gap-3">
        <Text T="admin" weight="semi" size="sm" className="text-primary10">
          {title}
        </Text>
        <Text T="none" weight="bold" size="t32" className="text-primary10">
          {txt}
        </Text>
        <div className="flex gap-1 items-center">
          <Stack backgroundColor={colors[title]} color={colors[title]} />
          <Text T="none" weight="semi" size="sm" className="text-primary10">
            {percent}%
          </Text>
          <Text
            T="admin"
            weight="semi"
            size="sm"
            className="text-linkColor whitespace-nowrap"
          >
            lastweek
          </Text>
        </div>
      </div>
      <Stroke color={colors[title]} />
    </div>
  );
};

const DashboardAdminView = () => {
  const { data, isPending } = useQuery({
    queryKey: ["get"],
    queryFn: StatistisService.initDefault,
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (isPending) return <Loading />;
  return (
    <AdminContainer>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Icon name="adminlogo" folder="admin" />
          <Text
            T="admin"
            weight="bold"
            size="2xl"
            className="text-primary10 leading-[34px] "
            style={{ fontSize: "24px" }}
          >
            hello
          </Text>
        </div>
        <div className="flex gap-6">
          <WeekBlock
            title="checkoutedKeys"
            txt={data.data?.keysSold?.total}
            percent={data.data.keysSold.percentChange}
          />
          <WeekBlock
            title="newUsers"
            txt={data.data?.newUsers?.total}
            percent={data.data.newUsers.percentChange}
          />
          <WeekBlock
            title="amount"
            txt={`${data.data?.sales?.total} ₽`}
            percent={data.data?.sales?.percentChange}
          />
        </div>
        <div className="flex gap-6 items-start">
          <Chart />
          <TransactionTable data={data.data?.keysSold.lastWeek} />
        </div>
      </div>
    </AdminContainer>
  );
};

export default DashboardAdminView;
