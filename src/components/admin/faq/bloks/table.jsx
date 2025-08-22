"use client";
import Text from "@/components/Text";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";

const TableFaq = ({ cols: col, rows: row, handleChangeRow, changeCol }) => {
  const [rows, setRows] = useState(row);
  const [cols, setCols] = useState(col);
  useEffect(() => {
    if (col.length > cols.length) {
      setCols(col);
    }
    if (row.length > rows.length) {
      setRows(row);
    }
  }, [col, row]);
  const debouncedRows = useDebounce(rows);
  const debouncedCols = useDebounce(cols);
  const handleChangeRowInput = (rowIndex, valueIndex, value) => {
    const newRows = rows.map((e, i) => {
      if (i === rowIndex) {
        const newRow = e;
        newRow[valueIndex] = value;
        return newRow;
      }
      return e;
    });
    setRows(newRows);
  };
  const handleChangeCol = (colIndex, value) => {
    const newCols = [...cols];
    newCols[colIndex] = value;
    setCols(newCols);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleChangeRow(rows);
    }, 1000);
    return () => clearTimeout(timer);
  }, [debouncedRows]);
  useEffect(() => {
    const timer = setTimeout(() => {
      changeCol(cols);
    }, 1000);
    return () => clearTimeout(timer);
  }, [debouncedCols]);
  return (
    <div className="flex flex-col w-full ">
      <div className="w-full flex bg-[#272C33] dark-box p-3 rounded-[12px]">
        {cols.map((e, i) => {
          return (
            <textarea
              value={e}
              onChange={(text) => handleChangeCol(i, text.target.value)}
              className="bg-[#272C33]  rounded-xl dark:p-2  dark-box dark:text-linkColor font-medium text-lg leading-[140%] break-words w-full text-primary10"
            />
          );
        })}
      </div>
      {rows.map((e, rowIndex) => {
        return (
          <div className="w-full border-[#272C33]  border-b-[1px] flex">
            {cols.map((a, i) => {
              return (
                <div
                  className="px-3 py-[22px]  h-full flex items-center"
                  style={{ width: `${100 / (cols.length || 1)}%` }}
                >
                  <textarea
                    value={e[i]}
                    onChange={(text) =>
                      handleChangeRowInput(rowIndex, i, text.target.value)
                    }
                    className="bg-mainBlack  rounded-xl dark:p-2 dark-box dark:text-linkColor font-medium text-md leading-[140%] break-words w-full text-primary10"
                  />
                  {/* <Text
                      T="none"
                      weight="medium"
                      size="md"
                      className="leading-[140%] break-words w-full text-primary10"
                    >
                      Программа
                    </Text> */}
                </div>
              );
            })}
          </div>
        );
      })}
      {/* <div className="w-full border-[#272C33] border-b-[1px] flex">
        <div className="px-3 py-[22px]  h-full w-[33%] flex items-center">
          <Text
            T="none"
            weight="medium"
            size="md"
            className="leading-[140%] break-words w-full text-primary10"
          >
            Программа
          </Text>
        </div>
        <div className="px-3 py-[22px] w-[33%] border-[#272C33] border-x-[1px] h-full flex items-center">
          <Text
            T="none"
            weight="medium"
            size="md"
            className="leading-[140%] break-words w-full text-[#8B6DCA] cursor-pointer"
          >
            https://www.softportal.com/get-43861-defender-control.html
          </Text>
        </div>
        <div className="px-3 py-[22px] w-[33%] w-full h-full flex items-center">
          <Text
            T="none"
            weight="medium"
            size="md"
            className="leading-[140%] break-words w-full text-[#8B6DCA] cursor-pointer"
          >
            https://www.upload.ee/download/17058274/0ef4d5a3d1771f5ee9e8/win11_driver_OFF.reg{" "}
          </Text>
        </div>
      </div> */}
    </div>
  );
};

export default TableFaq;
