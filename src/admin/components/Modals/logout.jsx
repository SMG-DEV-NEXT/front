"use client";

import Button from "@/components/Button";
import Text from "@/components/Text";
import { useTranslations } from "next-intl";
import React from "react";

const LogoutModal = ({ onClose, onLogout }) => {
  const t = useTranslations("account");
  return (
    <div className="flex flex-col w-[340px]">
      <Text T="none" weight="semi" size="lg" className="text-primary10">
        {t("logoutText")}
      </Text>
      <div className="flex gap-2 mt-4">
        <Button
          T="admin"
          onClick={onClose}
          variant="secondary"
          className="w-full h-[40px]"
        >
          cancel
        </Button>
        <Button T="account" onClick={onLogout} className="w-full h-[40px]">
          logoutMain
        </Button>
      </div>
    </div>
  );
};

export default LogoutModal;
