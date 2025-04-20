import CatalogView from "@/components/admin/Catalog";
import React from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const CatalogGames = () => {
  return <CatalogView />;
};

export default CatalogGames;
