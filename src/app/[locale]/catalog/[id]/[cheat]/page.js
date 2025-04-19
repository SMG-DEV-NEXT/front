import React from "react";
import View from "../../../../../pages/Cheat";
import { axiosWithoutAuth } from "@/api";

export async function generateMetadata({ params }) {
  const data = await axiosWithoutAuth.get(`/cheats/view/${params.cheat}`);
  const l = params.locale === "en" ? "En" : "Ru";
  const meta = data.data?.[`meta${l}`];
  const title = data.data?.[`metaTitle${l}`];
  return {
    title,
    description: meta,
  };
}

const CheatPage = () => {
  return <View />;
};

export default CheatPage;
