import MainAdminView from "@/components/admin/Main";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const MainAdmin = () => {
  return <MainAdminView />;
};

export default MainAdmin;
