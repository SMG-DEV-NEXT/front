"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import ResellerService from "@/services/Reseller";
import Loading from "@/app/loading";
import AdminBox from "@/admin/components/Box";
import AdminContainer from "@/admin/components/container";
import AdminPageHeader from "@/admin/components/header";
import { toast } from "react-toastify";
import { ContactsService } from "@/services/Contacts";
import { useLocale, useTranslations } from "next-intl";
import AdminUploadImage from "@/admin/components/ImageUpload";

const contactServices = [
  { label: "telegram", value: "telegram" },
  { label: "vk", value: "vk" },
  { label: "discord", value: "discord" },
];

const ContactsEditAdminView = () => {
  const t = useTranslations("admin");
  const locale = useLocale();
  const statuses = [
    { label: t("active"), value: "active" },
    { label: t("inactive"), value: "inactive" },
  ];
  const help = [
    { label: t("yes"), value: true },
    { label: t("no"), value: false },
  ];
  const [inputs, setInputs] = useState({
    help: false,
    service: contactServices[0].value,
    status: "active",
    titleru: "",
    titleen: "",
    textru: "",
    texten: "",
    url: "",
    icon: "",
    footer: false,
  });
  const { id } = useParams();
  const { data, isPending, fetchStatus } = useQuery({
    queryFn: () => ContactsService.getContact(id),
    queryKey: ["Get"],
    enabled: id !== "create",
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: ContactsService.createContact,
    mutationKey: ["create"],
    onSuccess: (e) => {
      if (e?.data?.id) {
        toast.success("Created successfuly.");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ContactsService.updateContact,
    mutationKey: ["update"],
    onSuccess: (e) => {
      if (e?.data?.id) {
        toast.success("Updated successfuly.");
      }
    },
  });

  useEffect(() => {
    if (data?.data) {
      setInputs({
        ...data?.data,
      });
    }
  }, [data]);
  const handleChange = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickButton = () => {
    if (id === "create") {
      const { id: d, ...data } = inputs;
      createMutation.mutate(data);
      return;
    }
    const { id: d, ...data } = inputs;
    updateMutation.mutate({ id, payload: data });
  };

  return (
    <AdminContainer>
      <AdminPageHeader
        route="contacts/edit"
        buttonText="save"
        settingsRoute={inputs[`title${locale}`]}
        isDisabledButton={createMutation.isPending || updateMutation.isPending}
        buttonOnClick={handleClickButton}
      />
      {isPending && fetchStatus !== "idle" ? (
        <Loading />
      ) : (
        <div className="flex flex-col mt-6 gap-6 w-full pb-5">
          <div className="flex gap-6 w-full">
            <AdminBox
              select={contactServices}
              label="link"
              value={contactServices.find((e) => e.value === inputs.service)}
              onChange={(name, option) => {
                handleChange("service", option.value);
              }}
            />
            <AdminBox
              select={statuses}
              label="type"
              value={statuses.find((e) => e.value === inputs.status)}
              onChange={(name, option) => {
                handleChange("status", option.value);
              }}
            />
            <AdminBox
              select={help}
              label="help"
              value={help.find((e) => e.value === inputs.help)}
              onChange={(name, option) => {
                handleChange("help", option.value);
              }}
            />
            <AdminBox
              select={help}
              label="showFooter"
              value={help.find((e) => e.value === inputs.footer)}
              onChange={(name, option) => {
                handleChange("footer", option.value);
              }}
            />
          </div>

          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            label="name"
            minTextAreaHeight={150}
            name="title"
            value={{
              rus: inputs.titleru,
              en: inputs.titleen,
            }}
            onChange={(e, value) => handleChange(e, value)}
          />
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            minTextAreaHeight={150}
            name="text"
            label="textUrl"
            value={{
              rus: inputs.textru,
              en: inputs.texten,
            }}
            onChange={(e, value) => handleChange(e, value)}
          />
          <AdminBox
            name="url"
            label="url"
            value={inputs.url}
            isInput={true}
            onChange={(e, value) => handleChange(e, value)}
          />
          <AdminUploadImage
            label={"icon"}
            size="64 x 64"
            width={64}
            height={64}
            value={inputs.icon}
            onChange={(e) => handleChange("icon", e)}
          />
        </div>
      )}
    </AdminContainer>
  );
};

export default ContactsEditAdminView;
