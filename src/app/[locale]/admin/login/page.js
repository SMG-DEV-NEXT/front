import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import View from "@/pages/Login";
import React from "react";

const LoginAdmin = () => {
  return (
    <ProtectedAdminRoute>
      <View />
    </ProtectedAdminRoute>
  );
};

export default LoginAdmin;
