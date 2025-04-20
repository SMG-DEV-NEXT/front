import ContactsAdminView from "@/components/admin/Contacts";
import ContactsEditAdminView from "@/components/admin/Contacts/edit";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ContactsEditAdmin = () => {
  return <ContactsEditAdminView />;
};

export default ContactsEditAdmin;
