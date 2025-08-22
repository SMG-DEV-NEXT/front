"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icons";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import { toast } from "react-toastify";

const TagSelector = ({ value, onChange, name }) => {
  const locale = useLocale();
  const { theme } = useTheme();
  const [newItemInputs, setNewItemInputs] = useState({
    ru: "",
    en: "",
  });

  const maxLength = 10;

  const handleChange = (e, name) => {
    if (e.target.value.length > maxLength) return;
    setNewItemInputs({
      ...newItemInputs,
      [name]: e.target.value,
    });
  };

  const handleAddElement = () => {
    if (newItemInputs.ru.length && newItemInputs.en.length) {
      onChange(name, [...value, newItemInputs]);
      setNewItemInputs({ ru: "", en: "" });
      return;
    }
    toast.error("Please fill all forms.");
  };

  const handleDeleteElement = (i) => {
    const newItems = value.filter((e, index) => index !== i);
    onChange(name, newItems);
  };

  return (
    <div className="flex p-4 flex-col gap-4 bg-input dark-box rounded-[16px] w-full">
      <Text
        T="admin"
        weight="semi"
        size="md"
        className="text-primary10 dark:text-linkColor"
      >
        tag
      </Text>
      <div className="flex flex-wrap p-[11px] bg-black dark-box rounded-[10px] gap-2">
        {!!value.length ? (
          value.map((e, i) => {
            return (
              <div
                key={i}
                className="py-[2px] px-[6px] flex items-center gap-[6px] bg-[#7B829329] dark:bg-white rounded-[6px]"
              >
                <Text T="none" weight="semi" className="text-[#97A0B5]">
                  {e[locale]}
                </Text>
                <div
                  className="flex cursor-pointer"
                  onClick={() => handleDeleteElement(i)}
                >
                  <Icon name="remove" folder="admin" size={13} />
                </div>
              </div>
            );
          })
        ) : (
          <Text
            T="none"
            weight="semi"
            size="md"
            className="text-primary10 dark:text-linkColor"
          >
            Empty
          </Text>
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex items-start gap-4 w-full">
          <Text T="none" weight="semi" className="text-linkColor">
            RUS
          </Text>
          <div className="w-full flex flex-col items-end gap-1">
            <Input
              value={newItemInputs.ru}
              styleDiv={{
                backgroundColor: theme !== "dark" ? "#272c33" : "transpartent",
              }}
              onChange={(e) => handleChange(e, "ru")}
            />
            {maxLength && (
              <Text T="none" weight="semi" className="text-linkColor">
                {newItemInputs.ru.length}/{maxLength}
              </Text>
            )}
          </div>
        </div>
        <div className="flex items-start gap-4 w-full">
          <Text T="none" weight="semi" className="text-linkColor">
            ENG
          </Text>
          <div className="w-full flex flex-col items-end gap-1">
            <Input
              value={newItemInputs.en}
              styleDiv={{
                backgroundColor: theme !== "dark" ? "#272c33" : "transpartent",
              }}
              onChange={(e) => handleChange(e, "en")}
            />
            {maxLength && (
              <Text T="none" weight="semi" className="text-linkColor">
                {newItemInputs.en.length}/{maxLength}
              </Text>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <Button T="admin" onClick={handleAddElement}>
            add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagSelector;
