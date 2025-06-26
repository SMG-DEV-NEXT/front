"use client";
import Text from "@/components/Text";
import React from "react";
import isUrl from "@/utils/url";

const TableFaq = ({ cols, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed  border-separate border-spacing-2">
        <thead>
          <tr>
            {cols.map((col) => (
              <th
                key={col}
                className="p-3 bg-[#272C33] rounded-[12px] text-left align-middle"
              >
                <Text
                  T="none"
                  weight="bold"
                  size="base"
                  className="text-primary10 leading-[140%] break-words whitespace-normal"
                >
                  {col}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={crypto.randomUUID()}>
              {row.map((cell) => {
                const is = isUrl(cell);
                if (is) {
                  return (
                    <td
                      key={crypto.randomUUID()}
                      className="p-3 bg-[#272C33] rounded-[12px] align-middle "
                    >
                      <Text
                        T="none"
                        weight="bold"
                        size="base"
                        onClick={() => window.open(cell, "_blank")}
                        className="text-primary80 mt-auto cursor-pointer leading-[140%] break-words whitespace-normal"
                      >
                        {cell}
                      </Text>
                    </td>
                  );
                }
                return (
                  <td
                    key={crypto.randomUUID()}
                    className="p-3 bg-[#272C33] rounded-[12px] align-middle"
                  >
                    <Text
                      T="none"
                      weight="bold"
                      size="base"
                      className="text-primary10 leading-[140%] break-words whitespace-normal"
                    >
                      {cell}
                    </Text>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableFaq;
