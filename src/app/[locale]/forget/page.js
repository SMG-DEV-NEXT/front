"use client";
import React from "react";
import Forget from "../../../pages/Forget";
import ProtectedAuth from "../../../components/protectedAuth";

function Index() {
  return (
    <ProtectedAuth>
      <Forget />
    </ProtectedAuth>
  );
}

export default Index;
