"use client";
import AdminBox from "@/components/admin/components/Box";
import Input from "@/components/Input";
import React from "react";

const EditTabFunction = ({ title, tooltipru, tooltipen, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Input
        value={title}
        styleDiv={{ backgroundColor: "#272c33", height: "38px" }}
        setValue={(e) => onChange("title", e)}
        label="title"
      />
      <AdminBox
        isMultipleLanguage={true}
        isUpperCode={false}
        style={{ padding: 0 }}
        value={{ rus: tooltipru, en: tooltipen }}
        onChange={onChange}
        name={"tooltip"}
        label="tooltip"
      />
    </div>
  );
};
export default EditTabFunction;
