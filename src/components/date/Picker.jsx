"use client";

import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../Icons";

export default function DateRangePicker({
  onChange,
  initialStartDate = null,
  initialEndDate = null,
}) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const ref = useRef();

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange([start, end]);
  };

  return (
    <div className="flex flex-col gap-2 relative inline-block">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        placeholderText="Выберите дату"
        customInput={
          <button
            type="button"
            onClick={() => ref.current.setOpen(true)}
            className=" rounded-2xl w-[38px] h-[38px]"
          >
            <Icon
              folder="admin"
              name="date"
              style={{ height: "38px" }}
              className="h-[38px]"
              size={38}
            />
          </button>
        }
        popperPlacement="bottom-start"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ]}
      />
    </div>
  );
}
