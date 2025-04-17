import Text from "@/components/Text";
import { useTranslations } from "next-intl";
import React from "react";

const AdminButton = ({ children, onClick, disabled, isDelete }) => {
  const t = useTranslations("admin");
  if (isDelete) {
    return (
      <button
        className="flex bg-[#DE595926] px-3 py-[6px] rounded-[8px]"
        onClick={onClick}
        disabled={disabled}
      >
        <Text
          T="admin"
          size="sm"
          weight="semi"
          className="text-[#DE5959] whitespace-nowrap"
        >
          {children}
        </Text>
      </button>
    );
  }
  return (
    <button
      className="flex bg-primary80 px-3 py-[6px] rounded-[8px]"
      onClick={onClick}
      disabled={disabled}
      style={{ maxWidth: "max-content" }}
    >
      <Text T="admin" size="sm" weight="semi" className="text-[#141A21]">
        {children}
      </Text>
    </button>
  );
};

export default AdminButton;
