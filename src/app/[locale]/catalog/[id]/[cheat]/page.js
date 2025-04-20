import React from "react";
import View from "../../../../../components/pages/Cheat";
import { axiosWithoutAuth } from "@/api";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({ params }) {
  try {
    const { data } = await axiosWithoutAuth.get(
      `https://your-domain.com/cheats/view/${params.cheat}`
    );

    const l = params.locale === "en" ? "En" : "Ru";
    const meta = data?.[`meta${l}`] ?? "";
    const title = data?.[`metaTitle${l}`] ?? "Cheat Info";

    return {
      title,
      description: meta,
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    return {
      title: "Cheat Info",
      description: "Details about the cheat are unavailable at the moment.",
    };
  }
}

const CheatPage = () => {
  return <View />;
};

export default CheatPage;
