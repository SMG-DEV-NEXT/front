"use client";
import React, { useState } from "react";
import Text from "../Text";
import Select, { components } from "react-select";
import Icon from "../Icons";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
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
          color: "#E9E3F6",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "140%",
          cursor: "pointer",
          color: "#E9E3F6",
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

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <Text className="text-primary10" weight="medium" size="sm">
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
            borderRadius: isOpen ? "12px 12px 0px 0px" : "12px",
          }),
          menu: (provided) => ({
            ...customStyles.menu(provided),
            ...menuStyles,
          }),
          placeholder: (defaultStyles) => ({
            ...defaultStyles,
            color: placeholderColor, // Change this to any color you want
          }),
          singleValue: (defaultStyles) => ({
            ...defaultStyles,
            color: placeholderColor, // Change this to any color you want
            ...valueStyles,
          }),
        }}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default CustomSelect;
