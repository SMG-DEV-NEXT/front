"use client";
import React from "react";
import View from "../../../pages/Account";
import { ProtectedRoute } from "../../../components/protectedAuth";

const Account = () => {
  return (
    <ProtectedRoute>
      <View />
    </ProtectedRoute>
  );
};

export default Account;
