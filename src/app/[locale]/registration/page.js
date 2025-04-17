"use client";
import React from "react";
import ViewRegistration from "../../../pages/Registration";
import ProtectedAuth from "../../../components/protectedAuth";

function Registration() {
  return (
    <ProtectedAuth>
      <ViewRegistration />
    </ProtectedAuth>
  );
}

export default Registration;
