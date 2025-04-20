"use client";
import React from "react";
import ContactsView from "../../../components/pages/Contacts/index";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const Contacts = () => {
  return <ContactsView />;
};
export default Contacts;
