"use client";
import React from "react";
import PolicyView from "../../../components/pages/policy";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Policy = () => {
  return <PolicyView />;
};

export default Policy;
