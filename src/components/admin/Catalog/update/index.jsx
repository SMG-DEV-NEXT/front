"use client";

import AdminBox from "@/components/admin/components/Box";
import AdminContainer from "@/components/admin/components/container";
import AdminPageHeader from "@/components/admin/components/header";
import AdminUploadImage from "@/components/admin/components/ImageUpload";
import Loading from "@/app/loading";
import { AdminCatalog } from "@/services/Admin";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateCatalog = () => {
  const t = useTranslations("admin");
  const { id } = useParams();
  const statusLabels = [
    { label: t("active"), value: "published", color: "#22C55E" },
    { label: t("inactive"), value: "unpublish", color: "#DE5959" },
  ];

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

  const { data, isPending } = useQuery({
    queryFn: ({ queryKey }) => {
      return AdminCatalog.getCatalog(id);
    },
    queryKey: ["get-catalog", id],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      const itemInputs = data.data;
      setInputs({
        ...itemInputs,
        status: statusLabels.find((w) => w.value === itemInputs.type),
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: AdminCatalog.updateCatalog,
    mutationKey: ["Update"],
    onSuccess: (e) => {
      if (e) {
        toast.success("Updated successfuly!");
      }
    },
  });

  const handleChangeInput = (name, value) => {
    setInputs((e) => ({
      ...e,
      [name]: value,
    }));
  };

  const onClickSaveButton = () => {
    const { status, position, title, ...e } = inputs;
    const i = {
      ...e,
      title: inputs.title,
      position: Number.parseInt(inputs.position),
      type: inputs.status.value,
    };
    const { id, cheats, ...finishalData } = i;
    mutation.mutate({ id, data: finishalData });
  };

  if (isPending) return <Loading />;

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
      </div>
    </AdminContainer>
  );
};

export default UpdateCatalog;
