import React from "react";
import StatView from "../../../../pages/Stat";
import { axiosWithoutAuth } from "@/api";

export async function generateMetadata({ params }) {
  const data = await axiosWithoutAuth.get(`/stats/${params.id}`);
  const meta = data.data?.[`meta${params.locale}`];
  return {
    title: `Stat about ${data.data?.[`title${params.locale}`]}`,
    description: meta,
  };
}

const Stat = () => {
  return <StatView />;
};

export default Stat;
