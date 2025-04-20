import PromoAdminView from "@/components/admin/Promo";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const PromoAdmin = () => {
  return <PromoAdminView />;
};

export default PromoAdmin;
