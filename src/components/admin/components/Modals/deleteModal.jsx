"use client";

import Button from "@/components/Button";
import Text from "@/components/Text";
import { useTranslations } from "next-intl";
import React from "react";

const DeleteModal = ({ text, onClose, onDelete }) => {
  const t = useTranslations("admin");
  return (
    <div className="flex flex-col w-[340px]">
      <Text T="none" weight="semi" size="lg" className="text-primary10">
        {t("deleteText")}: {text}
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
        <Button T="admin" onClick={onDelete} className="w-full h-[40px]">
          delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
