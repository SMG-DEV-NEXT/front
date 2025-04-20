"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import ResellerService from "@/services/Reseller";
import Loading from "@/app/loading";
import AdminBox from "@/components/admin/components/Box";
import AdminContainer from "@/components/admin/components/container";
import AdminPageHeader from "@/components/admin/components/header";
import { toast } from "react-toastify";
import { ContactsService } from "@/services/Contacts";
import { useLocale, useTranslations } from "next-intl";
import AdminUploadImage from "@/components/admin/components/ImageUpload";
import promoApi from "@/services/Promo";

const PromoEditAdminView = () => {
  const t = useTranslations("admin");
  const locale = useLocale();
  const statuses = [
    { label: t("active"), value: "active" },
    { label: t("inactive"), value: "inactive" },
  ];
  const [inputs, setInputs] = useState({
    code: "",
    status: statuses[0].value,
    percent: 20,
    maxActivate: 5000,
  });
  const { id } = useParams();
  const { data, isPending, fetchStatus } = useQuery({
    queryFn: () => promoApi.getPromocodeById(id),
    queryKey: ["Get"],
    enabled: id !== "create",
    refetchOnWindowFocus: false,
  });
  console.log(id);

  const createMutation = useMutation({
    mutationFn: promoApi.createPromocode,
    mutationKey: ["create"],
    onSuccess: (e) => {
      if (e?.data?.id) {
        toast.success("Created successfuly.");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: promoApi.updatePromocode,
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
    console.log(inputs);
    if (id === "create") {
      const { id: d, ...data } = inputs;
      createMutation.mutate(data);
      return;
    }
    const { id: d, ...data } = inputs;
    updateMutation.mutate({ id, data });
  };

  return (
    <AdminContainer>
      <AdminPageHeader
        route="promo/edit"
        buttonText="save"
        settingsRoute={inputs.code}
        isDisabledButton={createMutation.isPending || updateMutation.isPending}
        buttonOnClick={handleClickButton}
      />
      {isPending && fetchStatus !== "idle" ? (
        <Loading />
      ) : (
        <div className="flex flex-col mt-6 gap-6 w-full pb-5">
          <div className="flex gap-6 w-full">
            <AdminBox
              label="pr"
              name="code"
              isInput={true}
              value={inputs.code}
              onChange={handleChange}
            />
            <AdminBox
              label="prcent"
              name="percent"
              isInput={true}
              type="number"
              value={inputs.percent}
              onChange={handleChange}
            />
            <AdminBox
              label="maxActivate"
              name="maxActivate"
              isInput={true}
              type="number"
              value={inputs.maxActivate}
              onChange={handleChange}
            />
            <AdminBox
              select={statuses}
              label="status"
              value={statuses.find((e) => e.value === inputs.status)}
              onChange={(name, option) => {
                handleChange("status", option.value);
              }}
            />
          </div>
        </div>
      )}
    </AdminContainer>
  );
};

export default PromoEditAdminView;
