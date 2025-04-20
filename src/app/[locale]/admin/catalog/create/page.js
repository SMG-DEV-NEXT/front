import CatalogCreateView from "@/components/admin/Catalog/create";
import React from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const CatalogCreate = () => {
  return <CatalogCreateView />;
};

export default CatalogCreate;
