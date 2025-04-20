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

const ResellerEditAdminView = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    prcent: 20,
  });
  const { id } = useParams();

  const { data, isPending, fetchStatus } = useQuery({
    queryFn: () => ResellerService.getReseller(id),
    queryKey: ["Get"],
    enabled: id !== "create",
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: ResellerService.createReseller,
    mutationKey: ["create"],
    onSuccess: (e) => {
      if (e?.data?.id) {
        toast.success("Created successfuly.");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ResellerService.updateReseller,
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
        name: data?.data.name || "",
        email: data?.data.email || "",
        prcent: data?.data.prcent || "",
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
      createMutation.mutate(inputs);
      return;
    }
    updateMutation.mutate({ id, payload: inputs });
  };

  return (
    <AdminContainer>
      <AdminPageHeader
        route="resellers/edit"
        buttonText="save"
        settingsRoute={inputs.name}
        isDisabledButton={createMutation.isPending || updateMutation.isPending}
        buttonOnClick={handleClickButton}
      />
      {isPending && fetchStatus !== "idle" ? (
        <Loading />
      ) : (
        <div className="flex mt-6 gap-6">
          <AdminBox
            label={"mail"}
            isInput={true}
            value={inputs.email}
            onChange={handleChange}
            name={"email"}
          />
          <AdminBox
            label={"userName"}
            isInput={true}
            value={inputs.name}
            onChange={handleChange}
            name={"name"}
          />
          <AdminBox
            label={"prcent"}
            isInput={true}
            value={inputs.prcent}
            type="number"
            onChange={handleChange}
            name={"prcent"}
          />
        </div>
      )}
    </AdminContainer>
  );
};

export default ResellerEditAdminView;
