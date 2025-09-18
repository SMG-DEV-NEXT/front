"use client";
import AdminBox from "@/components/admin/components/Box";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";

const EditTabFunction = ({ title, tooltipru, tooltipen, onChange, theme }) => {
  return (
    <div className="flex flex-col gap-2">
      <Input
        value={title}
        styleDiv={
          theme !== "dark" ? { backgroundColor: "#272c33", height: "38px" } : {}
        }
        setValue={(e) => onChange("title", e)}
        label="title"
      />
      <AdminBox
        isMultipleLanguage={true}
        isUpperCode={false}
        value={{ rus: tooltipru, en: tooltipen }}
        onChange={onChange}
        name={"tooltip"}
        label="tooltip"
      />
    </div>
  );
};
export default EditTabFunction;
