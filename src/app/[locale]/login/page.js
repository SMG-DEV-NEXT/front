"use client";
import React from "react";
import View from "../../../components/pages/Login";
import ProtectedAuth from "../../../components/protectedAuth";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function Login() {
  return (
    <ProtectedAuth>
      <View />
    </ProtectedAuth>
  );
}

export default Login;
