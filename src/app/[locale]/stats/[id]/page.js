import React from "react";
import StatView from "../../../../components/pages/Stat";
import { axiosWithoutAuth } from "@/api";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({ params }) {
  try {
    const res = await axiosWithoutAuth.get(`/stats/${params.id}`);
    const meta = res.data?.[`meta${params.locale}`];

    return {
      title: `Stat about ${res.data?.[`title${params.locale}`]}`,
      description: meta,
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);

    return {
      title: "Stat page",
      description: "Default metadata for stat page.",
    };
  }
}

const Stat = () => {
  return <StatView />;
};

export default Stat;
