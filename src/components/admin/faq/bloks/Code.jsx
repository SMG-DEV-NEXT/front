"use client";

import Icon from "@/components/Icons";
import Text from "@/components/Text";
import { useEffect, useRef, useState } from "react";

export default function CodeEditor({
  code,
  handleChange,
  order,
  handleDelete,
}) {
  const [value, setValue] = useState(code?.join("\n"));
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!value) return;
    const time = setTimeout(() => {
      handleChange(order, "code", value.split("\n"));
    }, 500);
    return () => clearTimeout(time);
  }, [value]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset height
      textarea.style.height = textarea.scrollHeight + "px"; // set to content height
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-4 bg-input rounded-2xl p-4 ">
      <div className="flex items-center justify-between w-full">
        <Text T="admin" weight="bold" size="lg" className="text-primary10">
          code
        </Text>
        <div
          className="flex cursor-pointer"
          onClick={() => handleDelete(order)}
        >
          <Icon name="trash" folder="admin" />
        </div>
      </div>
      <textarea
        className="w-full h-64 text-[#E9E3F7] font-medium leading-[28px] text-lg outline-none rounded-2xl font-mono bg-[#272C33]  px-4 py-[9px]"
        value={value}
        ref={textareaRef}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
