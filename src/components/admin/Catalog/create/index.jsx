"use client";

import AdminBox from "@/components/admin/components/Box";
import AdminContainer from "@/components/admin/components/container";
import AdminPageHeader from "@/components/admin/components/header";
import AdminUploadImage from "@/components/admin/components/ImageUpload";
import { AdminCatalog } from "@/services/Admin";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminButton from "../../components/button";

const CatalogCreate = () => {
  const t = useTranslations("admin");

  const [inputs, setInputs] = useState({
    title: "Title Game",
    status: { label: t("active"), value: "published", color: "#22C55E" },
    position: 1,
    headRu: "",
    headEn: "",
    metaRu: "",
    metaEn: "",
    imageUrl: "",
  });

  const mutation = useMutation({
    mutationFn: AdminCatalog.createCatalog,
    mutationKey: ["Create"],
    onSuccess: (e) => {
      if (e) {
        toast.success("Created successfuly!");
        setInputs({
          title: "Title Game",
          status: { label: t("active"), value: "published", color: "#22C55E" },
          position: 1,
          headRu: "",
          headEn: "",
          metaRu: "",
          metaEn: "",
          imageUrl: "",
        });
      }
    },
  });

  const handleChangeInput = (name, value) => {
    setInputs((e) => ({
      ...e,
      [name]: value,
    }));
  };

  const statusLabels = [
    { label: t("active"), value: "published", color: "#22C55E" },
    { label: t("inactive"), value: "unpublish", color: "#DE5959" },
  ];

  const onClickSaveButton = () => {
    const { status, position, title, ...e } = inputs;
    const data = {
      ...e,
      title: inputs.title,
      position: Number.parseInt(inputs.position),
      type: inputs.status.value,
    };
    mutation.mutate(data);
  };

  return (
    <AdminContainer>
      <AdminPageHeader
        buttonText="save"
        route="catalog/create"
        buttonOnClick={onClickSaveButton}
        isDisabledButton={mutation.isPending}
        settingsRoute={inputs.title}
      />
      <div className="flex flex-col gap-6 mt-6 pb-6">
        <div className="flex gap-6">
          <AdminBox
            value={inputs.title}
            name="title"
            onChange={handleChangeInput}
            label={"gameTitle"}
          />
          <AdminBox
            value={inputs.status}
            name="status"
            select={statusLabels}
            onChange={handleChangeInput}
            label={"siteStatus"}
          />
          <AdminBox
            value={inputs.position}
            name="position"
            type="number"
            onChange={handleChangeInput}
            label={"position"}
          />
        </div>
        <AdminBox
          value={inputs.link}
          name="link"
          onChange={handleChangeInput}
          label={"catalogLink"}
        />
        <AdminBox
          value={{ rus: inputs.headRu, en: inputs.headEn }}
          name="head"
          maxLength={300}
          isMultipleLanguage={true}
          onChange={handleChangeInput}
          label={"head"}
        />{" "}
        <AdminBox
          value={{ rus: inputs.metaRu, en: inputs.metaEn }}
          name="meta"
          maxLength={300}
          isMultipleLanguage={true}
          onChange={handleChangeInput}
          label={"meta"}
        />
        <AdminUploadImage
          label={"logo"}
          size={40}
          value={inputs.imageUrl}
          onChange={(e) => handleChangeInput("imageUrl", e)}
        />
        <div className="flex w-full justify-center">
          <AdminButton
            onClick={onClickSaveButton}
            disabled={mutation.isPending}
          >
            save
          </AdminButton>
        </div>
      </div>
    </AdminContainer>
  );
};

export default CatalogCreate;
