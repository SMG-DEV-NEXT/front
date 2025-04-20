import SMTPAdminView from "@/components/admin/smtp";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const SMTPAdmin = () => {
  return <SMTPAdminView />;
};

export default SMTPAdmin;
