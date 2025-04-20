import React from "react";
import StatsView from "../../../components/pages/stats/Index";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Stats = () => {
  return <StatsView />;
};

export default Stats;
