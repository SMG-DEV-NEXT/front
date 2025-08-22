"use client";
import React, { useState } from "react";
import Text from "../Text";
import Select, { components } from "react-select";
import Icon from "../Icons";
import { useTheme } from "next-themes";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props} className="!p-0">
      {!props.selectProps.menuIsOpen ? (
        <Icon
          name="arrow"
          style={{ transform: "rotate(180deg)" }}
          folder="products"
        />
      ) : (
        <Icon name="arrow" folder="products" />
      )}
    </components.DropdownIndicator>
  );
};

const CustomSingleValue = (props) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {data.icon}
        <span style={{ marginLeft: "10px" }}>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};

const CustomOption = (props) => {
  const { data, innerRef, innerProps, isSelected } = props;
  const { theme } = useTheme();
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      {data.icon} {/* Left Icon */}
      <span
        style={{
          marginLeft: "10px",
          color: theme === "dark" ? "#181A1F" : "#E9E3F6",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "140%",
          cursor: "pointer",
        }}
      >
        {data.label}
      </span>
      {data.isStat && (
        <Text
          className="text-linkColor ml-auto w-[32px] h-[20px] rounded-[6px] bg-[#7B829326] flex items-center justify-center"
          T="none"
          weight="medium"
          size="sm"
        >
          {data.stats}
        </Text>
      )}
    </div>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#272C33",
    border: "none",
    color: "white",
    outline: "none",
    borderColor: "none",
    boxShadow: "none",
    padding: "5px",
    color: "#E9E3F6",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "140%",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "#272C33",
    borderTop: "1px solid",
    borderColor: "#404658",
    marginTop: "0px",
    borderRadius: "0px 0px 12px 12px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#282c34" : "#282c34",
    color: "#E9E3F6",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "140%",
    cursor: "pointer",
    color: state.isSelected ? "#E9E3F6" : "#E9E3F6",
    //   ':hover': {
    //     backgroundColor: '#61dafb',
    //     color: 'black',
    //   },
  }),
  input: (provided) => ({
    ...provided,
    color: "#E9E3F6",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "140%",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#E9E3F6",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "140%",
  }),
};
const CustomSelect = ({
  options = [],
  label,
  value,
  setValue,
  placeholder,
  inputStyles = {},
  menuStyles = {},
  placeholderColor,
  valueStyles = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const darkSelectStyles =
    theme === "dark"
      ? {
          backgroundColor: "white",
          border: "1px solid #181A1F",
        }
      : {};
  const darkSelectStylesSelector =
    theme === "dark"
      ? {
          backgroundColor: "white",
          border: "1px solid #181A1F",
        }
      : {};
  const darkSelectStylesValue =
    theme === "dark"
      ? {
          color: "#181A1F",
        }
      : {};
  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <Text
          className="text-primary10 dark:text-linkColor"
          weight="medium"
          size="sm"
        >
          {label}
        </Text>
      )}
      <Select
        value={value}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
          Option: CustomOption,
          SingleValue: CustomSingleValue, // ✅ Custom selected value with an icon
        }} // Use custom arrow
        onChange={setValue}
        options={options}
        isSearchable={false}
        placeholder={placeholder}
        styles={{
          ...customStyles,
          control: (provided) => ({
            ...customStyles.control(provided),
            ...inputStyles,
            ...darkSelectStyles,
            borderRadius: isOpen ? "12px 12px 0px 0px" : "12px",
          }),
          menu: (provided) => ({
            ...customStyles.menu(provided),
            ...darkSelectStylesSelector,
            ...menuStyles,
          }),
          placeholder: (defaultStyles) => ({
            ...defaultStyles,
            color: placeholderColor, // Change this to any color you want
          }),
          singleValue: (defaultStyles) => ({
            color: placeholderColor, // Change this to any color you want
            ...defaultStyles,
            ...valueStyles,
            ...darkSelectStylesValue,
          }),
        }}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default CustomSelect;
