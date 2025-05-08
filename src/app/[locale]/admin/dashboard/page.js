import DashboardAdminView from "@/components/admin/dashboard";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const DashboardAdmin = () => {
  return <DashboardAdminView />;
};

export default DashboardAdmin;
