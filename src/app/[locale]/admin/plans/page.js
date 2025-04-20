import PlansView from "@/components/admin/Plans";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const PlansAdmin = () => {
  return <PlansView />;
};

export default PlansAdmin;
