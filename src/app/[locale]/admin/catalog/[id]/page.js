import CatalogCreateView from "@/components/admin/Catalog/create";
import UpdateCatalog from "@/components/admin/Catalog/update";
import React from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const Update = () => {
  return <UpdateCatalog />;
};

export default Update;
