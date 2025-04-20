import React from "react";
import Cheats from "../../../../components/pages/Cheats";
import { axiosWithoutAuth } from "@/api";
import getLanguage from "@/utils/get-language";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({ params }) {
  try {
    const { data } = await axiosWithoutAuth.get(
      `https://your-api-domain.com/catalog/${params.id}`
    );

    const l = params.locale === "en" ? "En" : "Ru";
    const meta = data?.[`meta${l}`];
    const head = data?.[`head${l}`];

    return {
      title: `Cheat for ${head}`,
      description: meta,
    };
  } catch (e) {
    console.error("Metadata fetch failed:", e);

    return {
      title: "Cheat Info",
      description: "Details unavailable at the moment.",
    };
  }
}

function Catalog() {
  return <Cheats />;
}

export default Catalog;
