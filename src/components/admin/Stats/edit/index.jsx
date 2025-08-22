"use client";

import AdminBox from "@/components/admin/components/Box";
import AdminContainer from "@/components/admin/components/container";
import AdminPageHeader from "@/components/admin/components/header";
import AdminUploadImage from "@/components/admin/components/ImageUpload";
import Loading from "@/app/loading";
import { AdminCatalog } from "@/services/Admin";
import StatsService from "@/services/Stats";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminButton from "../../components/button";

const queryInputs = (e) => {
  const { catalog, id, popular, ...data } = e;
  return {
    ...data,
    type: data.type.value,
    catalogId: catalog?.value,
  };
};

const StatEdit = () => {
  const statTypes = [
    { label: "Published", value: "published" },
    { label: "Unpublished", value: "unpublish" },
  ];
  const locale = useLocale();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    titleru: "New Stat",
    titleen: "New Stat",
    metaru: "",
    metaen: "",
    aboutru: "",
    abouten: "",
    contentru: "",
    contenten: "",
    Image1: "",
    type: statTypes[1], //  @default("unpublish") // "published" or "unpublish"
    Image2: "",
    catalog: null,
  });
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryFn: AdminCatalog.getAllCatalogs,
    queryKey: ["get-all"],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation({
    mutationFn: StatsService.createStat,
    mutationKey: "create",
    onSuccess: (data) => {
      if (data?.data?.id) {
        toast.success("Created successfuly.");
        setInputs({
          titleru: "New Stat",
          titleen: "New Stat",
          metaru: "",
          metaen: "",
          aboutru: "",
          abouten: "",
          contentru: "",
          contenten: "",
          Image1: "",
          type: statTypes[1], //  @default("unpublish") // "published" or "unpublish"
          Image2: "",
          catalog: null,
        });
      }
    },
  });
  const update = useMutation({
    mutationFn: StatsService.updateStat,
    mutationKey: "update",
    onSuccess: (data) => {
      if (data?.data?.id) {
        toast.success("Updated successfuly.");
      }
    },
  });

  const { data: stat, isPending: statLoading } = useQuery({
    queryFn: () => StatsService.getStat(id),
    queryKey: ["get-stat", id],
    enabled: id !== "create",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (stat?.data) {
      const { catalog, type, ...e } = stat.data;
      setInputs({
        ...e,
        catalog: { label: catalog.title, value: catalog.id },
        type: statTypes.find((a) => a.value === type),
      });
    }
  }, [stat]);
  const handleSave = () => {
    if (id === "create") {
      mutation.mutate(queryInputs(inputs));
      return;
    }
    update.mutate({ id, data: queryInputs(inputs) });
  };

  const onChange = (name, value) => {
    if (name.includes("En") || name.includes("Ru")) {
      setInputs({
        ...inputs,
        [name.toLowerCase()]: value,
      });
      return;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const options = data?.data
    ? data.data.map((e) => ({ label: e.title, value: e.id }))
    : null;
  if (statLoading && id !== "create") {
    return <Loading />;
  }
  return (
    <AdminContainer>
      <AdminPageHeader
        route={"stats/edit"}
        isDisabledButton={mutation.isPending || update.isPending}
        buttonText={"save"}
        settingsRoute={inputs[`title${locale}`]}
        buttonOnClick={handleSave}
      />
      <div className="flex flex-col mt-6 gap-6 pb-6">
        <AdminBox
          value={{ en: inputs.titleen, rus: inputs.titleru }}
          name="title"
          isMultipleLanguage={true}
          maxLength={300}
          onChange={onChange}
          label={"head"}
        />
        <AdminBox
          value={{ en: inputs.metaen, rus: inputs.metaru }}
          name="meta"
          isMultipleLanguage={true}
          maxLength={300}
          onChange={onChange}
          label={"meta"}
        />
        <div className="flex gap-6">
          <AdminUploadImage
            label={"cheatOblojka"}
            size="48 x 48"
            width={48}
            height={48}
            value={inputs.Image1}
            onChange={(e) => onChange("Image1", e)}
          />
          <AdminUploadImage
            label={"oblojkaStat"}
            size={`528 x 250`}
            width={528}
            height={250}
            value={inputs.Image2}
            onChange={(e) => onChange("Image2", e)}
          />
        </div>
        <div className="flex gap-6">
          {data && (
            <AdminBox
              value={inputs.catalog}
              name="catalog"
              select={options}
              onChange={onChange}
              label={"category"}
            />
          )}
          <AdminBox
            value={inputs.type}
            name="type"
            select={statTypes}
            onChange={onChange}
            label={"siteStatus"}
          />
        </div>
        <AdminBox
          value={{ en: inputs.abouten, rus: inputs.aboutru }}
          name="about"
          isMultipleLanguage={true}
          maxLength={300}
          onChange={onChange}
          label={"prevStat"}
        />
        <AdminBox
          value={{ en: inputs.contenten, rus: inputs.contentru }}
          name="content"
          isMultipleLanguage={true}
          maxLength={300}
          onChange={onChange}
          label={"textStat"}
        />
        <div className="flex w-full justify-center">
          <AdminButton
            onClick={handleSave}
            disabled={mutation.isPending || update.isPending}
          >
            save
          </AdminButton>
        </div>
      </div>
    </AdminContainer>
  );
};

export default StatEdit;
