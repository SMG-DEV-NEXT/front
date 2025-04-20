"use client";
import React from "react";
import View from "../../../components/pages/Account";
import { ProtectedRoute } from "../../../components/protectedAuth";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const Account = () => {
  return (
    <ProtectedRoute>
      <View />
    </ProtectedRoute>
  );
};

export default Account;
