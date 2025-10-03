"use client";

import Checkbox from "@/components/admin/components/checkbox";
import Icon from "@/components/Icons";
import Text from "@/components/Text";
import React from "react";
import {
  ProcessorOptions,
  Spoofer,
  SystemOptions,
  TypeWindow,
  USB,
} from "./options";
import Input from "@/components/Input";
import { useTheme } from "next-themes";

const Options = ({ options = [], selectedOption = [], onSelect }) => {
  const [isCustomSelected, setIsCustomSelected] = React.useState(
    options.length === 0
  );
  const [customValue, setCustomValue] = React.useState("");

  // Handle click on default options
  const handleClickOptions = (opt) => {
    if (selectedOption.includes(opt.value)) {
      onSelect(selectedOption.filter((v) => v !== opt.value));
    } else {
      onSelect([...selectedOption, opt.value]);
    }
  };

  // Handle toggle custom
  const handleCustomToggle = () => {
    if (isCustomSelected) {
      // if unselect custom → remove it from selected
      onSelect([]);
      setCustomValue("");
      setIsCustomSelected(false);
    } else {
      setIsCustomSelected(true);
    }
  };

  // Handle input typing
  const handleCustomInput = (e) => {
    const value = e.target.value;
    setCustomValue(value);

    // replace old custom with new one
    let newSelected = selectedOption.filter((v) => v !== customValue);
    if (value.trim()) newSelected = [...newSelected, value.trim()];
    onSelect(newSelected);
  };

  const theme = useTheme();
  return (
    <div className="flex w-full flex-col gap-3 pl-[3px]">
      {/* Default options */}
      {options.map((opt) => (
        <div
          key={opt.value}
          className="flex gap-2 cursor-pointer"
          onClick={() => handleClickOptions(opt)}
        >
          <Checkbox
            setIsChecked={() => {}}
            isChecked={selectedOption.includes(opt.value)}
          />
          <Text
            T="none"
            weight="semi"
            size="md"
            className="text-primary10 dark:text-linkColor"
          >
            {opt.label}
          </Text>
        </div>
      ))}

      {/* Custom option */}
      <div className="flex items-center gap-2">
        <Checkbox
          setIsChecked={handleCustomToggle}
          isChecked={isCustomSelected}
        />
        <Text
          T="none"
          weight="semi"
          size="md"
          className="text-primary10 dark:text-linkColor"
        >
          Custom
        </Text>
      </div>

      {/* Input only if checked */}
      {isCustomSelected && (
        <Input
          value={customValue}
          placeholder="Enter custom value"
          className="bg-input dark:bg-"
          styleDiv={
            theme !== "dark"
              ? { backgroundColor: "#272c33", height: "38px" }
              : {}
          }
          onChange={handleCustomInput}
        />
      )}
    </div>
  );
};

const Requirments = ({ value, onChange }) => {
  const handleChangeForm = (name, v) => {
    onChange("requirments", {
      ...value,
      [name]: v,
    });
  };
  return (
    <div className="flex flex-col p-4 justify-between  bg-input dark-box rounded-[16px] w-full">
      <Text
        T="admin"
        weight="semi"
        size="md"
        className="text-primary10 dark:text-linkColor"
      >
        techRequirements
      </Text>
      <div className="flex grid grid-cols-2 gap-4 mt-2 flex-wrap gap-10">
        <div className="flex w-1/2 flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="jostick" folder="products" />
            <Text
              T="product"
              className="text-primary10 dark:text-linkColor"
              weight="semi"
              size="md"
            >
              client
            </Text>
          </div>
          <Options
            selectedOption={value.client}
            onSelect={(e) => handleChangeForm("client", e)}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <div className="flex items-center justify-start gap-2">
            <Icon name="safe" folder="products" />
            <Text
              T="product"
              className="text-primary10 dark:text-linkColor"
              weight="semi"
              size="md"
            >
              anitCheat
            </Text>
          </div>
          <Options
            selectedOption={value.anitCheat}
            onSelect={(e) => handleChangeForm("anitCheat", e)}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="oc" folder="admin" />
            <Text
              T="admin"
              className="text-primary10 dark:text-linkColor"
              weight="semi"
              size="md"
            >
              oc
            </Text>
          </div>
          <Options
            selectedOption={value.oc}
            options={SystemOptions}
            onSelect={(e) => handleChangeForm("oc", e)}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="processor" folder="admin" />
            <Text
              T="admin"
              className="text-primary10 dark:text-linkColor"
              weight="semi"
              size="md"
            >
              processor
            </Text>
          </div>
          <Options
            selectedOption={value.processor}
            options={ProcessorOptions}
            onSelect={(e) => handleChangeForm("processor", e)}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="spoofer" folder="admin" />
            <Text
              T="admin"
              className="text-primary10 dark:text-linkColor"
              weight="semi"
              size="md"
            >
              spoofer
            </Text>
          </div>
          <Options
            selectedOption={value.spoofer}
            options={Spoofer}
            onSelect={(e) => handleChangeForm("spoofer", e)}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="usb" folder="products" />
            <Text
              T="admin"
              className="text-primary10 dark:text-linkColor"
              weight="semi"
              size="md"
            >
              fl
            </Text>
          </div>
          <Options
            selectedOption={value.usb}
            options={USB}
            onSelect={(e) => handleChangeForm("usb", e)}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="window" folder="admin" />
            <Text
              T="admin"
              className="text-primary10 dark:text-linkColor"
              weight="semi"
              size="md"
            >
              windowType
            </Text>
          </div>
          <Options
            selectedOption={value.window}
            options={TypeWindow}
            onSelect={(e) => handleChangeForm("window", e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Requirments;
