"use client";

import CustomSelect from "@/components/Select";
import Text from "@/components/Text";
import React, { useEffect, useRef } from "react";

const AdminBox = ({
  value,
  onChange,
  select,
  label,
  isMultipleLanguage,
  maxLength,
  viewLength,
  isGuarante,
  multipleOptions,
  minTextAreaHeight = "46px",
  isUpperCode = true,
  name,
  style = {},
  type = "text",
  isInput,
}) => {
  const textareaRef = useRef(null);
  const textareaRef2 = useRef(null);
  const handleChange = (e, isSelect) => {
    if (isSelect) {
      onChange(name, e);
      return;
    }
    const { name: n, value } = e.target;
    onChange(n, type === "number" ? value * 1 : value);
    if (textareaRef.current) {
      textareaRef.current.style.height = `${minTextAreaHeight}px`; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Expand to fit content
    }
    if (textareaRef2.current) {
      textareaRef2.current.style.height = `${minTextAreaHeight}px`; // Reset height
      textareaRef2.current.style.height = `${textareaRef2.current.scrollHeight}px`; // Expand to fit content
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${minTextAreaHeight}px`; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Expand to fit content
    }
    if (textareaRef2.current) {
      textareaRef2.current.style.height = `${minTextAreaHeight}px`; // Reset height
      textareaRef2.current.style.height = `${textareaRef.current.scrollHeight}px`; // Expand to fit content
    }
  }, []);

  if (isMultipleLanguage) {
    return (
      <div
        style={style}
        className="flex p-4 flex-col gap-4 bg-input rounded-[16px] w-full"
      >
        {label && (
          <Text T="admin" weight="semi" size="md" className="text-primary10">
            {label}
          </Text>
        )}
        <div className="flex gap-4">
          <div className="flex items-start gap-4 w-full">
            <Text T="none" weight="semi" className="text-linkColor">
              RUS
            </Text>
            <div className="w-full flex flex-col items-end gap-1">
              <textarea
                ref={textareaRef}
                value={value.rus}
                name={!isUpperCode ? `${name}ru` : `${name}Ru`}
                className="bg-black w-full resize-none outline-none rounded-[10px] px-4 py-2 min-h-[46px] text-base font-semibold text-linkColor"
                onChange={handleChange}
              ></textarea>
              {maxLength && (
                <Text T="none" weight="semi" className="text-linkColor">
                  {value.rus.length}/{maxLength}
                </Text>
              )}
            </div>
          </div>
          <div className="flex items-start gap-4 w-full">
            <Text T="none" weight="semi" className="text-linkColor">
              ENG
            </Text>
            <div className="w-full flex flex-col items-end gap-1">
              <textarea
                ref={textareaRef2}
                value={value.en}
                name={!isUpperCode ? `${name}en` : `${name}En`}
                className="bg-black w-full resize-none outline-none rounded-[10px] px-4 py-2 min-h-[46px] text-base font-semibold text-linkColor"
                onChange={handleChange}
              ></textarea>
              {maxLength && (
                <Text T="none" weight="semi" className="text-linkColor">
                  {value.en.length}/{maxLength}
                </Text>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (select) {
    return (
      <div className="flex p-4 flex-col gap-4 bg-input rounded-[16px] w-full">
        <Text T="admin" weight="semi" size="md" className="text-primary10">
          {label}
        </Text>
        <CustomSelect
          options={select}
          inputStyles={{ height: "46px" }}
          value={value}
          valueStyles={{
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "28px",
            color: value?.color || "",
          }}
          setValue={(e) => handleChange(e, true)}
        />
      </div>
    );
  }

  return (
    <div className="flex p-4 flex-col gap-4 bg-input rounded-[16px] w-full">
      <Text T="admin" weight="semi" size="md" className="text-primary10">
        {label}
      </Text>
      <div className="flex flex-col w-full gap-2">
        {type === "number" || isInput ? (
          <div className="bg-black resize-none outline-none rounded-[10px] min-h-[46px] text-base font-semibold text-linkColor">
            <input
              value={value}
              type={type}
              name={name}
              className="bg-black resize-none w-full outline-none rounded-[10px] px-4 py-2 min-h-[46px] text-base font-semibold text-linkColor"
              onChange={handleChange}
            />
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            name={name}
            className="bg-black resize-none outline-none rounded-[10px] px-4 py-2 min-h-[46px] text-base font-semibold text-linkColor"
            onChange={handleChange}
          ></textarea>
        )}
        {maxLength && (
          <Text T="none" weight="semi" className="text-linkColor text-end">
            {value.length}/{maxLength}
          </Text>
        )}
      </div>
    </div>
  );
};

export default AdminBox;
