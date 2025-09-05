"use client";

import Icon from "@/components/Icons";
import React, { useState } from "react";
import AdminUploadImage from "../../components/ImageUpload";
import Text from "@/components/Text";
import Checkbox from "@/components/checkbox";

const Screenshot = ({ screens = [], handleChange, order, handleDelete }) => {
  const handleAddScreen = (value, index) => {
    const newValues = [...screens];
    newValues[index] = {
      url: value,
      isHaveZoom: false,
    };
    handleChange(
      order,
      "screens",
      newValues.filter((e) => e !== "")
    );
  };
  const handleChangeZoom = (value, index) => {
    const newValues = [...screens];
    newValues[index] = {
      ...(newValues[index] || {}),
      isHaveZoom: !value,
    };
    handleChange(order, "screens", newValues);
  };
  return (
    <div className="flex flex-col gap-4 bg-input dark-box p-4 rounded-2xl">
      <div className="flex items-center justify-between w-full">
        <Text
          T="admin"
          weight="bold"
          size="lg"
          className="text-primary10 dark:text-linkColor"
        >
          screenshot
        </Text>
        <div
          className="flex cursor-pointer"
          onClick={() => handleDelete(order)}
        >
          <Icon name="trash" folder="admin" />
        </div>
      </div>

      <div className="flex gap-2">
        {screens.map((e, i) => {
          return (
            <div className="flex flex-col gap-1 w-full">
              <Text
                T="none"
                weight="semi"
                size="md"
                className="text-primary10 dark:text-linkColor"
              >
                Screen {i + 1}
              </Text>
              <AdminUploadImage
                value={e.url}
                onChange={(x) => handleAddScreen(x, i)}
              />
              <Checkbox
                checked={e.isHaveZoom}
                onCheck={() => handleChangeZoom(e.isHaveZoom, i)}
                text="zoom"
              />
            </div>
          );
        })}
        {screens.length < 4 && (
          <div className="flex flex-col gap-1 w-full">
            <Text
              T="none"
              weight="semi"
              size="md"
              className="text-primary10 dark:text-linkColor"
            >
              Screen {screens.length + 1}
            </Text>
            <AdminUploadImage
              onChange={(x) => handleAddScreen(x, screens.length)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Screenshot;
