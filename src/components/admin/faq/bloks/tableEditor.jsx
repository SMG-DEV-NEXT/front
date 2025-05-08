"use client";
import React from "react";
import TableFaq from "./table";
import Text from "@/components/Text";
import Icon from "@/components/Icons";

export default function DownloadTable({
  order,
  rows,
  cols,
  handleChange,
  handleDelete,
}) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-stretch w-full">
        <div className="flex w-[80%]">
          <TableFaq
            rows={rows}
            cols={cols}
            changeCol={(newCOls) => handleChange(order, "cols", newCOls)}
            handleChangeRow={(newRows) => handleChange(order, "rows", newRows)}
          />
        </div>
        <div
          onClick={() => {
            if (cols.length < 5) {
              handleChange(order, "cols", [...cols, "New Col"]);
            }
          }}
          className="flex w-[20%]  border border-dashed border-[1px] cursor-pointer border-[#919EAB33] rounded-[12px] items-center justify-center"
        >
          <Text T="none" weight="semi" className="text-[15px] text-[#919EAB]">
            Добавить столбец
          </Text>
        </div>
      </div>
      <div className="w-full flex">
        <div
          onClick={() => handleChange(order, "rows", [...rows, []])}
          className="flex w-[80%]  border border-dashed border-[1px] cursor-pointer border-[#919EAB33] rounded-[12px] items-center justify-center"
        >
          <Text
            T="none"
            weight="semi"
            className="text-[15px] py-[19px] text-[#919EAB]"
          >
            Добавить строку
          </Text>
        </div>
        <div
          onClick={() => handleDelete(order)}
          className="flex w-[20%] py-[19px] border border-dashed border-[1px] cursor-pointer border-[#919EAB33] rounded-[12px] items-center justify-center"
        >
          <Icon name="trash" folder="admin" />
        </div>
      </div>
    </div>
  );
}
