"use client";
import React from "react";
import AdminContainer from "../components/container";
import AdminHeader from "../Header";
import AdminPageHeader from "../components/header";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactsService } from "@/services/Contacts";
import Loading from "@/app/loading";
import ContactTable from "../components/tables/ContactTable";
import { toast } from "react-toastify";

const ContactsAdminView = () => {
  const router = useRouter();
  const locale = useLocale();

  const { data, isPending, refetch } = useQuery({
    queryFn: ContactsService.getAllContacts,
    queryKey: ["getContacts"],
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
  });

  const deleteMutation = useMutation({
    mutationFn: ContactsService.deleteContact,
    mutationKey: ["delete"],
    onSuccess: (e) => {
      if (e.status === 200) {
        toast.success("Deleted");
        refetch();
      }
    },
  });

  const contacts = !isPending && data ? data?.data?.filter((e) => !e.help) : [];
  const help = !isPending && data ? data.data.filter((e) => e.help) : [];

  return (
    <AdminContainer>
      <AdminPageHeader
        route="contacts"
        buttonText={"add"}
        buttonOnClick={() => router.push(`/${locale}/admin/contacts/create`)}
      />
      <div className="flex py-6">
        {isPending ? (
          <Loading noPage={true} />
        ) : (
          <ContactTable
            deleteItem={deleteMutation.mutate}
            items={{ data: contacts }}
            isPending={isPending || deleteMutation.isPending}
          />
        )}
      </div>
      <AdminPageHeader
        route="help"
        buttonText={"add"}
        buttonOnClick={() => router.push(`/${locale}/admin/contacts/create`)}
      />
      <div className="flex py-6">
        {isPending ? (
          <Loading noPage={true} />
        ) : (
          <ContactTable
            deleteItem={deleteMutation.mutate}
            items={{ data: help }}
            isPending={isPending || deleteMutation.isPending}
          />
        )}
      </div>
    </AdminContainer>
  );
};

export default ContactsAdminView;
