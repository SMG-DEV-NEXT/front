import React from "react";
import Icon from "../Icons";
import Text from "../Text";

function Checkbox({ checked, onCheck, text, children }) {
  return (
    <div className="flex items-center gap-2 cursor-pointer"  onClick={() => onCheck(!checked)}>
      <div className="cursor-pointer flex w-5 h-5">

        {checked ? (
          <Icon name="tick" className="w-[20px] h-[20px]" size={20} />
        ) : (
          <div className="w-[20px] h-[20px] border rounded-[6px]  border-primary80 bg-transparet"></div>
        )}
      </div>
      {children ? (
        children
      ) : (
        <Text className="text-linkColor" weight="medium" size="sm">
          {text}
        </Text>
      )}
    </div>
  );
}

export default Checkbox;
