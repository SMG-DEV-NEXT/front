"use client";
import React from "react";
import ResellerView from "../../../components/pages/reseller";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Reseller = () => {
  return <ResellerView />;
};

export default Reseller;
