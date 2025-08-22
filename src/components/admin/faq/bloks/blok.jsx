"use client";

import Icon from "@/components/Icons";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import AdminBox from "../../components/Box";
import Text from "@/components/Text";

const Blok = ({ order, data, handleChange, handleDelete }) => {
  const { aboutru, abouten, titleru, titleen } = data || {};
  const [inputs, setInputs] = useState({
    titleru,
    titleen,
    aboutru,
    abouten,
  });
  const debouncedInputs = useDebounce(inputs);
  useEffect(() => {
    handleChange(order, "data", debouncedInputs);
  }, [debouncedInputs]);
  return (
    <div className="flex flex-col bg-input dark-box gap-4 rounded-2xl p-4">
      <div className="flex items-center justify-between w-full">
        <Text
          T="admin"
          weight="bold"
          size="lg"
          className="text-primary10 dark:text-linkColor"
        >
          blok
        </Text>
        <div
          className="flex cursor-pointer"
          onClick={() => handleDelete(order)}
        >
          <Icon name="trash" folder="admin" />
        </div>
      </div>
      <AdminBox
        isMultipleLanguage={true}
        value={{ rus: inputs.titleru, en: inputs.titleen }}
        onChange={(name, value) => setInputs({ ...inputs, [name]: value })}
        label="title"
        name="title"
        isUpperCode={false}
      />
      <AdminBox
        isMultipleLanguage={true}
        value={{ rus: inputs.aboutru, en: inputs.abouten }}
        onChange={(name, value) => setInputs({ ...inputs, [name]: value })}
        label="about"
        name="about"
        isUpperCode={false}
      />
    </div>
  );
};
export default Blok;
