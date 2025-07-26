import RequestAdmimnView from "@/components/admin/requests";
import ResellersAdminView from "@/components/admin/resellers";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const RequestsAdmin = () => {
  return <RequestAdmimnView />;
};

export default RequestsAdmin;
