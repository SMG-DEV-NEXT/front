"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import Text from "@/components/Text";
import { Stack } from "./icon";
import { useQuery } from "@tanstack/react-query";
import StatistisService from "@/services/Statistic";
import Loading from "@/app/loading";
import CustomSelect from "@/components/Select";
import DateRangePicker from "@/components/date/Picker";

export default function RevenueChart() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState({
    range: { label: "Неделя", value: "week" },
    from: null,
    to: null,
  });
  const { data: chart, isPending } = useQuery({
    queryKey: ["get-chart", filterData],
    queryFn: () =>
      StatistisService.getChart(
        filterData.range.value,
        filterData.from,
        filterData.to
      ),
  });

  useEffect(() => {
    if (!chart?.data) return;
    const { trend, percent } = chart.data;

    if (trend) {
      // Если пользователь указал from и to, используем их
      const startDate = filterData.from
        ? new Date(filterData.from)
        : (() => {
            const date = new Date();
            date.setDate(date.getDate() - trend.length + 1);
            return date;
          })();

      const formatted = trend.map((value, index) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + index);

        const label =
          filterData.range === "week" && !(filterData.from && filterData.to)
            ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][
                date.getDay() === 0 ? 6 : date.getDay() - 1
              ]
            : `${date.getDate().toString().padStart(2, "0")}.${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}`;

        return { name: label, value };
      });

      setData(formatted);
    }
  }, [chart]);

  if (isPending) {
    return (
      <div className="bg-[#181A1F] p-6 gap-6 flex flex-col rounded-2xl w-full">
        <Loading noPage={true} />
      </div>
    );
  }

  return (
    <div className="bg-[#181A1F] p-6 gap-6 flex flex-col rounded-2xl w-full">
      <div className="flex justify-between items-center  w-full">
        <div className="flex flex-col gap-[10px]">
          <Text T="admin" weight="bold" size="lg" className="text-primary10">
            profit
          </Text>
          {!(filterData.from && filterData.to) && (
            <div className="flex gap-1 items-center">
              <Stack backgroundColor={"#00A76F"} color={"#00A76F"} />
              <Text T="none" weight="semi" size="sm" className="text-primary10">
                {chart.data?.percent}%
              </Text>
              <Text
                T="admin"
                weight="semi"
                size="sm"
                className="text-linkColor whitespace-nowrap"
              >
                {filterData.range.value === "week" ? "lastweek" : "lastMonth"}
              </Text>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <CustomSelect
            options={[
              {
                label: "Месяц",
                value: "month",
              },
              {
                label: "Неделя",
                value: "week",
              },
            ]}
            value={filterData.range}
            inputStyles={{
              height: "34px",
              backgroundColor: "tertiary",
              border: "1px solid #7B8293",
              alignItems: "center",
            }}
            setValue={(e) => setFilterData({ range: e })}
          />
          <DateRangePicker
            onChange={([start, end]) =>
              setFilterData({ ...filterData, from: start, to: end })
            }
            initialEndDate={filterData.to}
            initialStartDate={filterData.from}
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={310}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 0, bottom: 0, left: -20 }}
        >
          {/* Сетка с горизонтальными линиями */}
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#4B5563" // цвет пунктирных линий
            vertical={false} // отключает вертикальные линии
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            stroke="#888"
            tick={{
              lineHeight: "18px",
              fontSize: 12,
              fontWeight: 400,
              color: "#7B8293",
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke="#888"
            tick={{
              lineHeight: "18px",
              fontSize: 12,
              fontWeight: 400,
              color: "#7B8293",
            }}
            domain={[0, 100]} // или [0, 'auto'] для автоматического масштаба
          />
          <Tooltip
            formatter={(value) => [`${value} ₽`, "Прибыль"]} // value, name
            labelFormatter={(label) => `Day: ${label}`}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "#A0AEC0" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#A855F7"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
