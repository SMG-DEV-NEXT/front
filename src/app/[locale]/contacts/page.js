"use client";
import React, { Suspense } from "react";
import ContactsView from "../../../components/pages/Contacts/index";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const Contacts = () => {
  return (
    <Suspense fallback={null}>
      <ContactsView />
    </Suspense>
  );
};
export default Contacts;
