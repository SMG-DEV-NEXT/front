import PromoEditAdminView from "@/components/admin/Promo/edit";
import ReferralEditAdminView from "@/components/admin/Referral/edit";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ReferralEdit = () => {
  return <ReferralEditAdminView />;
};

export default ReferralEdit;
