import ContactsAdminView from "@/components/admin/Contacts";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ContactsAdmin = () => {
  return <ContactsAdminView />;
};

export default ContactsAdmin;
