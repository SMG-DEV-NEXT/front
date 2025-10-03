import React, { Suspense } from "react";
import View from "../../../../../components/pages/Cheat";
import { axiosWithoutAuth } from "@/api";
import Loading from "@/app/loading";

export async function generateMetadata({ params }) {
  try {
    const { data } = await axiosWithoutAuth.get(`/cheats/view/${params.cheat}`);

    const l = params.locale === "en" ? "En" : "Ru";
    const meta = data?.[`meta${l}`] ?? "";
    const title = data?.[`metaTitle${l}`] ?? "Cheat Info";

    return {
      title: `${title}`,
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
  return (
    <Suspense fallback={<Loading noPage={true} />}>
      <View />
    </Suspense>
  );
};

export default CheatPage;
