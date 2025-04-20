import ResellersAdminView from "@/components/admin/resellers";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ResellersAdmin = () => {
  return <ResellersAdminView />;
};

export default ResellersAdmin;
