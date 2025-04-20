"use client";
import Input from "@/components/Input";
import CustomSelect from "@/components/Select";
import React from "react";

const PositionEditor = ({ pos, itemValue, items, label, onChangePosition }) => {
  return (
    <div className="flex bg-input w-full rounded-[16px] p-4 gap-[32px]">
      <Input
        styleDiv={{ border: "1px solid #919EAB3D" }}
        label="position"
        T="admin"
        value={pos}
        setValue={() => {}}
      />
      <CustomSelect
        options={items}
        inputStyles={{
          width: "100%",
          background: "inherit",
          border: "1px solid #919EAB3D",
        }}
        label={label}
        value={items.find((e) => e.value === itemValue)}
        setValue={(e) => onChangePosition(e.value, pos - 1)}
      />
    </div>
  );
};

export default PositionEditor;
