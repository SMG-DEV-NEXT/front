import React from "react";
import Icon from "../Icons";
import Text from "../Text";

function Checkbox({ checked, onCheck, text, children }) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none focus:outline-none"
      onClick={() => onCheck(!checked)}
    >
      <div className="cursor-pointer flex w-5 h-5">
        {checked ? (
          <Icon
            name="tick"
            size={20}
            style={{ minWidth: "20px" }}
            className="w-[20px] h-[20px]"
          />
        ) : (
          <div className="w-[20px] h-[20px] select-none focus:outline-none border-[2px] rounded-[6px]  border-[#7B8293] bg-transparet"></div>
        )}
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
