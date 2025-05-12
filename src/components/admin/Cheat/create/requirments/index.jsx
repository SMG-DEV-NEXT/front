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

const Options = ({ options, selectedOption, onSelect }) => {
  const handleClickOptions = (e) => {
    if (selectedOption?.includes(e.value)) {
      onSelect(selectedOption.filter((a) => a !== e.value));
      return;
    }
    onSelect([...(selectedOption || []), e.value]);
  };
  return (
    <div className="flex gap-5">
      {options.map((e) => {
        return (
          <div
            key={crypto.randomUUID()}
            className="flex gap-2 cursor-pointer"
            onClick={() => handleClickOptions(e)}
          >
            <Checkbox
              setIsChecked={() => {}}
              isChecked={selectedOption?.includes(e.value)}
            />
            <Text T="none" weight="semi" size="md" className="text-primary10">
              {e.label}
            </Text>
          </div>
        );
      })}
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
    <div className="flex flex-col p-4 justify-between gap-4 bg-input rounded-[16px] w-full">
      <Text T="admin" weight="semi" size="md" className="text-primary10">
        techRequirements
      </Text>
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="oc" folder="admin" />
            <Text T="admin" className="text-primary10" weight="semi" size="md">
              oc
            </Text>
          </div>
          <Options
            selectedOption={value.oc}
            options={SystemOptions}
            onSelect={(e) => handleChangeForm("oc", e)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="processor" folder="admin" />
            <Text T="admin" className="text-primary10" weight="semi" size="md">
              processor
            </Text>
          </div>
          <Options
            selectedOption={value.processor}
            options={ProcessorOptions}
            onSelect={(e) => handleChangeForm("processor", e)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="spoofer" folder="admin" />
            <Text T="admin" className="text-primary10" weight="semi" size="md">
              spoofer
            </Text>
          </div>
          <Options
            selectedOption={value.spoofer}
            options={Spoofer}
            onSelect={(e) => handleChangeForm("spoofer", e)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="usb" folder="admin" />
            <Text T="admin" className="text-primary10" weight="semi" size="md">
              fl
            </Text>
          </div>
          <Options
            selectedOption={value.usb}
            options={USB}
            onSelect={(e) => handleChangeForm("usb", e)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Icon name="window" folder="admin" />
            <Text T="admin" className="text-primary10" weight="semi" size="md">
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
