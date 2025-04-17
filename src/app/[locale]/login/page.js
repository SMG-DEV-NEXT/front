"use client";
import React from "react";
import View from "../../../pages/Login";
import ProtectedAuth from "../../../components/protectedAuth";

function Login() {
  return (
    <ProtectedAuth>
      <View />
    </ProtectedAuth>
  );
}

export default Login;
