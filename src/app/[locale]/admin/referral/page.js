import PromoAdminView from "@/components/admin/Promo";
import ReferralAdminView from "@/components/admin/Referral";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ReferralAdmin = () => {
  return <ReferralAdminView />;
};

export default ReferralAdmin;
