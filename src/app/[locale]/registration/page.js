"use client";
import React from "react";
import ViewRegistration from "../../../components/pages/Registration";
import ProtectedAuth from "../../../components/protectedAuth";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function Registration() {
  return (
    <ProtectedAuth>
      <ViewRegistration />
    </ProtectedAuth>
  );
}

export default Registration;
