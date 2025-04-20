"use client";
import React from "react";
import Forget from "../../../components/pages/Forget";
import ProtectedAuth from "../../../components/protectedAuth";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
function Index() {
  return (
    <ProtectedAuth>
      <Forget />
    </ProtectedAuth>
  );
}

export default Index;
