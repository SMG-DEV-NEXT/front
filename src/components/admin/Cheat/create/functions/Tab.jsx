"use client";
import Icon from "@/components/Icons";
import Text from "@/components/Text";
import React from "react";

const Tab = ({ title, onDelete, isActive, onSelect }) => {
  if (isActive) {
    return (
      <div
        key={crypto.randomUUID()}
        className="bg-primary80 cursor-pointer gap-2 py-[6px] px-3 rounded-[8px] border border-[#919EAB3D] flex items-center"
      >
        <Text T="none" weight="semi" className="text-[#141A21] dark:text-white">
          {title}
        </Text>
        <div
          className="flex cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          {" "}
          <Icon name="trash" folder="admin" size={24} />
        </div>
      </div>
    );
  }
  return (
    <div
      key={crypto.randomUUID()}
      onClick={() => onSelect()}
      className=" py-[6px] cursor-pointer px-3 gap-2 rounded-[8px] border border-[#919EAB3D] flex items-center"
    >
      <Text T="none" weight="semi" className="text-primary10">
        {title}
      </Text>
      <div
        className="flex cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
      >
        <Icon name="trash" folder="admin" size={24} />
      </div>
    </div>
  );
};

export default Tab;
