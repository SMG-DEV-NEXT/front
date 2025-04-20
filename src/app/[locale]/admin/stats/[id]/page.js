import StatsPage from "@/components/admin/Stats";
import StatEdit from "@/components/admin/Stats/edit";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Stat = () => {
  return <StatEdit />;
};

export default Stat;
