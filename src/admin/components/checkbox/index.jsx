"use client";

import Icon from "@/components/Icons";
import React from "react";

const Checkbox = ({ isChecked, setIsChecked }) => {
  if (isChecked) {
    return (
      <div
        className="flex cursor-pointer w-5 h-5 border border-linkColor rounded-[4px] bg-primary80"
        onClick={() => setIsChecked(false)}
      >
        <Icon name="tick" className="w-[20px] h-[20px]" size={20} />
      </div>
    );
  }
  return (
    <div
      className="flex cursor-pointer w-5 h-5 border border-linkColor rounded-[4px]"
      onClick={() => setIsChecked(true)}
    ></div>
  );
};

export default Checkbox;
