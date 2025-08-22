"use client";
import Icon from "@/components/Icons";
import CustomSelect from "@/components/Select";
import Text from "@/components/Text";
import React from "react";

const ButtonEditor = ({
  values,
  link,
  handleChange,
  handleDelete,
  locale,
  order,
}) => {
  const options = values.map((e) => {
    return {
      label: `${e.faqBlock[`title${locale}`]} / ${
        JSON.parse(e.data)[`title${locale}`]
      }`,
      value: e.id,
    };
  });
  return (
    <div className="flex bg-input dark-box p-4 gap-4 flex-col rounded-2xl">
      <div className="flex items-center justify-between w-full">
        <Text
          T="admin"
          weight="bold"
          size="lg"
          className="text-primary10 dark:text-linkColor"
        >
          addlink
        </Text>
        <div
          className="flex cursor-pointer"
          onClick={() => handleDelete(order)}
        >
          <Icon name="trash" folder="admin" />
        </div>
      </div>
      <CustomSelect
        value={options.find((e) => e.value === link)}
        options={options}
        setValue={(e) => handleChange(order, "link", e.value)}
      />
    </div>
  );
};

export default ButtonEditor;
