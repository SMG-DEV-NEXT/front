"use client";
import { useRef, useState } from "react";
import Input from "../Input";
import Text from "../Text";
import "./index.scss";
import { useMobile } from "../../hooks/useMobile";

const TwoFactorInput = ({
  length = 6,
  onComplete,
  code,
  setCode,
  label = "2fa",
}) => {
  const inputRefs = useRef([]);
  const isMobile = useMobile();
  const handleChange = (index, e) => {
    if (!e.target.value) {
      const newCode = [...code];
      newCode[index] = ""; // Store only last typed digit
      setCode(newCode);
    }
    const value = e.target.value.replace(/\D/, ""); // Allow only digits
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Store only last typed digit
    setCode(newCode);

    if (index < length - 1 && value) {
      inputRefs.current[index + 1]?.focus(); // Move to next input
    }

    if (newCode.join("").length === length) {
      onComplete?.(newCode.join("")); // Call callback when full code entered
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (isMobile) {
    return (
      <div className="flex gap-3 flex-wrap w-full flex-col">
        <Text className="text-primary10" weight="medium" size="sm">
          {label}
        </Text>
        <div className="w-full mobTwoFactor">
          {code.map((_, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              inputMode="numeric"
              styleDiv={{ backgroundColor: "#272C33", padding: "20px 21px" }}
              className="w-[32px] flex-1 h-[34px] outline-none text-primary10 font-semibold font-[600] leading-[120%] text-[36px] text-center"
              pattern="[0-9]"
              value={code[index]}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3  w-full flex-col">
      <Text className="text-primary10" weight="medium" size="sm">
        {label}
      </Text>
      <div className="flex gap-2 w-full">
        {code.map((_, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            inputMode="numeric"
            styleDiv={{ backgroundColor: "#272C33", padding: "20px 21px" }}
            className="w-[32px] flex-1 h-[34px] outline-none text-primary10 font-semibold font-[600] leading-[120%] text-[36px] text-center"
            pattern="[0-9]"
            value={code[index]}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default TwoFactorInput;
