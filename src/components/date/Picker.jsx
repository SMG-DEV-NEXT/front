"use client";

import { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import Icon from "../Icons";

export default function DateRangePickerIcon({
  onChange,
  initialStartDate = null,
  initialEndDate = null,
}) {
  const [value, setValue] = useState([initialStartDate, initialEndDate]);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    setValue([initialStartDate, initialEndDate]);
  }, [initialStartDate, initialEndDate]);

  const handleChange = (newValue) => {
    const safeValue = newValue || [null, null];
    setValue(safeValue);
  };

  useEffect(() => {
    if (value[0] && value[1]) {
      onChange(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-2 relative inline-block">
      {/* Trigger button */}
      <IconButton
        ref={buttonRef}
        onClick={() => setOpen(true)}
        className="rounded-2xl w-[38px] h-[38px]"
      >
        <Icon
          folder="admin"
          name="date"
          style={{ height: "38px" }}
          className="h-[38px] min-w-[38px]"
          size={38}
        />
      </IconButton>

      {/* Picker (hidden input, anchored to buttonRef) */}
      <DateRangePicker
        open={open}
        disableCloseOnSelect
        disablePortal
        onClose={() => {
          if (value[0] && !value[1]) return;
          setOpen(false);
        }}
        value={value}
        onChange={handleChange}
        slots={{
          field: () => <input style={{ display: "none" }} />, // completely hidden field
        }}
        slotProps={{
          popper: {
            anchorEl: () => buttonRef.current, // ✅ force anchor to IconButton
            placement: "bottom-start",
          },
          // hide the default text fields completely
          field: { inputProps: { style: { display: "none" } } },
        }}
      />
    </div>
  );
}
