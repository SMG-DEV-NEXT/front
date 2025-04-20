import CommentPage from "@/components/admin/Comment";
import RulesAdminView from "@/components/admin/Rules";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const RulesAdmin = () => {
  return <RulesAdminView />;
};

export default RulesAdmin;
