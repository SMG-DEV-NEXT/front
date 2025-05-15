"use client";
import { useState } from "react";
import Icon from "../Icons";
import Text from "../Text";

const Input = ({
  type = "text",
  iconLeft,
  label,
  iconRight,
  styleDiv = {},
  setValue = () => {},
  isCopyButton,
  value,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const onChange = (e) => {
    if (type === "number" && props.max !== undefined) {
      if (e.target.value < props.max) {
        setValue(e.target.value);
      }
      return;
    }
    setValue(e.target.value);
  };
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error("Ошибка при копировании:", err);
    }
  };

  return (
    <div className="flex flex-col w-full gap-3">
      {label && (
        <Text className="text-primary10" weight="medium" size="sm">
          {label}
        </Text>
      )}
      <div
        className="relative  px-[14px] py-3 bg-input flex items-center  rounded-xl"
        style={styleDiv}
      >
        {iconLeft && (
          <div className="flex items-center mr-2">
            <Icon name={iconLeft} size={20} />
          </div>
        )}
        <input
          type={
            type === "password"
              ? isPasswordVisible
                ? "text"
                : "password"
              : type
          }
          style={{
            backgroundColor: "transparent !important",
          }}
          onChange={onChange}
          autoComplete="new-password"
          value={value}
          className="w-full bg-inherit text-[#7B8293] focus:bg-inherit focus:outline-none text-sm"
          {...props}
        />

        {/* Left Icon */}

        {/* Right Icon */}
        {iconRight && type === "password" && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <Icon name="eye" /> : <Icon name="eyeOpen" />}
          </div>
        )}
        {iconRight && type !== "password" && (
          <Icon name={iconRight.icon} folder={iconRight.folder} />
        )}
        {isCopyButton && (
          <div className="cursor-pointer" onClick={copyText}>
            <Icon name="copy" size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
