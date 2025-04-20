import PlansView from "@/components/admin/Plans";
import PlanUpdate from "@/components/admin/Plans/edit";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const PlanAdmin = () => {
  return <PlanUpdate />;
};

export default PlanAdmin;
