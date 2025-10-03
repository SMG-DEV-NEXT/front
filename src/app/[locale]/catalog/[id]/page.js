import React, { Suspense } from "react";
import Cheats from "../../../../components/pages/Cheats";
import { axiosWithoutAuth } from "@/api";
import getLanguage from "@/utils/get-language";
import Loading from "@/app/loading";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({ params }) {
  try {
    const { data } = await axiosWithoutAuth.get(`/catalog/${params.id}`);

    const l = params.locale === "en" ? "En" : "Ru";
    const meta = data?.[`meta${l}`];
    const head = data?.[`head${l}`];

    return {
      title: head,
      description: meta,
    };
  } catch (e) {
    console.error("Metadata fetch failed:", e);

    return {
      title: "SMG : Cheat Info",
      description: "Details unavailable at the moment.",
    };
  }
}

function Catalog() {
  return (
    <Suspense fallback={<Loading />}>
      <Cheats />
    </Suspense>
  );
}

export default Catalog;
