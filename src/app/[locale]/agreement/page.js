"use client";
import React from "react";
import AgreementView from "@/components/pages/agreement";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Agreement = () => {
  return <AgreementView />;
};

export default Agreement;
