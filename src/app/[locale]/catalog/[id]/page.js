import React from "react";
import Cheats from "../../../../pages/Cheats";
import { axiosWithoutAuth } from "@/api";
import getLanguage from "@/utils/get-language";

export async function generateMetadata({ params }) {
  const data = await axiosWithoutAuth.get(`/catalog/${params.id}`);
  const meta = data.data?.[`meta${params.locale === "en" ? "En" : "Ru"}`];
  return {
    title: `Cheat for ${
      data.data?.[`head${params.locale === "en" ? "En" : "Ru"}`]
    }`,
    description: meta,
  };
}

function Catalog() {
  return <Cheats />;
}

export default Catalog;
