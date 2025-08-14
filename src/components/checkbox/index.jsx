import React from "react";
import Icon from "../Icons";
import Text from "../Text";

function Checkbox({ checked, onCheck, text, children }) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none focus:outline-none"
      onClick={() => onCheck(!checked)}
    >
      <div className="cursor-pointer flex w-5 h-5 relative">
        {/* Background box */}
        <div
          className={`w-[20px] h-[20px] border-[2px] rounded-[6px] border-[#7B8293]
            transition-colors duration-300 ease-in-out
            ${checked ? "bg-primary80 border-primary80" : "bg-transparent"}
          `}
        ></div>

        {/* Tick icon (animated fade/scale) */}
        <div
          className={`absolute inset-0 flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${checked ? "opacity-100 scale-100" : "opacity-0 scale-75"}
          `}
        >
          <Icon
            name="tick"
            size={20}
            style={{ minWidth: "20px" }}
            className="w-[20px] h-[20px]"
          />
        </div>
      </div>

      {children ? (
        children
      ) : (
        <Text className="text-linkColor select-none" weight="medium" size="sm">
          {text}
        </Text>
      )}
    </div>
  );
}

export default Checkbox;
