import ResellerEditAdminView from "@/components/admin/resellers/edit";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ResellerEdit = () => {
  return <ResellerEditAdminView />;
};

export default ResellerEdit;
