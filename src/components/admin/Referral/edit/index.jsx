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
import { referralService } from "@/services/Referral";

const ReferralEditAdminView = () => {
  const t = useTranslations("admin");
  const locale = useLocale();

  const [inputs, setInputs] = useState({
    code: "",
    prcentToPrice: 20,
    owner: "",
  });
  const { id } = useParams();
  const { data, isPending, fetchStatus } = useQuery({
    queryFn: () => referralService.getById(id),
    queryKey: ["Get", id],
    enabled: id !== "create",
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: referralService.create,
    mutationKey: ["create"],
    onSuccess: (e) => {
      if (e?.data?.id) {
        toast.success("Created successfuly.");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: referralService.update,
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
    const { id: d, transactions, createdAt, ...data } = inputs;
    updateMutation.mutate({ id, data });
  };

  return (
    <AdminContainer>
      <AdminPageHeader
        route="referral/edit"
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
              label="referralKod"
              name="code"
              isInput={true}
              value={inputs.code}
              onChange={handleChange}
            />
            <AdminBox
              label="prcent"
              name="prcentToPrice"
              isInput={true}
              type="number"
              value={inputs.prcentToPrice}
              onChange={handleChange}
            />
            <AdminBox
              label="referralOwner"
              name="owner"
              isInput={true}
              value={inputs.owner}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </AdminContainer>
  );
};

export default ReferralEditAdminView;
