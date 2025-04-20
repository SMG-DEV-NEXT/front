import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import View from "@/components/pages/Login";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const LoginAdmin = () => {
  return (
    <ProtectedAdminRoute>
      <View />
    </ProtectedAdminRoute>
  );
};

export default LoginAdmin;
