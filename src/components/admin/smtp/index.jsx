"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AdminPageHeader from "../components/header";
import { useMutation, useQuery } from "@tanstack/react-query";
import { smtpService } from "@/services/smtp";
import AdminContainer from "../components/container";
import AdminBox from "../components/Box";
import { toast } from "react-toastify";

const SMTPAdminView = () => {
  const locale = useLocale();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    host: "",
    port: 4000,
    user: "",
    pass: "",
  });

  const { data } = useQuery({
    queryFn: smtpService.get,
    queryKey: ["get"],
    refetchOnWindowFocus: false,
  });

  const update = useMutation({
    mutationFn: smtpService.edit,
    mutationKey: ["Update"],
    onSuccess: (e) => {
      if (e.status === 200) {
        toast.success("Updated successfuly.");
      }
    },
  });

  useEffect(() => {
    if (data?.data) {
      setInputs({
        ...data.data,
      });
    }
  }, [data]);

  const handleChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <AdminContainer>
      <AdminPageHeader
        route="smtp"
        buttonText="save"
        isDisabledButton={update.isPending}
        buttonOnClick={() => update.mutate(inputs)}
      />
      <div className="flex flex-col mt-6 gap-6">
        <div className="flex gap-6">
          <AdminBox
            label="host"
            name="host"
            isInput={true}
            value={inputs.host}
            onChange={handleChange}
          />
          <AdminBox
            label="port"
            name="port"
            isInput={true}
            type="number"
            value={inputs.port}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-6">
          <AdminBox
            label="username"
            name="user"
            isInput={true}
            value={inputs.user}
            onChange={handleChange}
          />
          <AdminBox
            label="password"
            name="pass"
            isInput={true}
            value={inputs.pass}
            onChange={handleChange}
          />
        </div>
      </div>
    </AdminContainer>
  );
};

export default SMTPAdminView;
