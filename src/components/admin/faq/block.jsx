"use client";

import React, { useEffect, useState } from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FAQService } from "@/services/FAQ";
import { useLocale } from "next-intl";
import Loading from "@/app/loading";
import { toast } from "react-toastify";
import AdminBox from "../components/Box";
import Text from "@/components/Text";
import AdminButton from "../components/button";

const FaqBlockEdit = () => {
  const locale = useLocale();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    titleen: "",
    titleru: "",
    aboutru: "",
    abouten: "",
  });
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: "get-faq-block",
    queryFn: () => FAQService.getBlockFaq(id),
  });

  const updateMutation = useMutation({
    mutationFn: FAQService.updateBlock,
    mutationKey: "update-faq",
    onSuccess: () => {
      toast.success("Updated successfuly.");
    },
  });

  useEffect(() => {
    if (data?.data) {
      setInputs({
        titleen: data?.data.titleen,
        titleru: data?.data.titleru,
        aboutru: data?.data.aboutru || "",
        abouten: data?.data.abouten || "",
      });
    }
  }, [data]);

  const handleChange = (name, value) => {
    setInputs({
      ...inputs,
      [name.toLowerCase()]: value,
    });
  };

  const handleUpdateFaqBlock = () => {
    updateMutation.mutate({ id, data: inputs });
  };

  if (isPending) return <Loading />;
  return (
    <AdminContainer>
      <div className="flex flex-col gap-4">
        <AdminPageHeader
          route="faq"
          buttonText="save"
          isDisabledButton={updateMutation.isPending}
          buttonOnClick={handleUpdateFaqBlock}
          settingsRoute={
            inputs[`title${locale}`] || data?.data[`title${locale}`]
          }
        />
        <div className="flex flex-col gap-4">
          <div className="bg-input rounded-2xl flex flex-col">
            <AdminBox
              isMultipleLanguage={true}
              value={{ rus: inputs.titleru, en: inputs.titleen }}
              onChange={handleChange}
              isInput={true}
              name="title"
              maxLength={300}
              label="title"
            />

            <AdminBox
              isMultipleLanguage={true}
              value={{ rus: inputs.aboutru, en: inputs.abouten }}
              onChange={handleChange}
              name="about"
              maxLength={300}
              label="about"
            />
          </div>
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex w-full justify-between">
              <Text
                T="admin"
                weight="semi"
                size="lg"
                className="text-primary10"
              >
                faqStats
              </Text>
              <AdminButton
                onClick={() => router.push(`/${locale}/admin/faq/${id}/create`)}
              >
                createStat
              </AdminButton>
            </div>
            {data?.data.stats.map((e) => {
              const data = JSON.parse(e.data);
              return (
                <div
                  key={e.id}
                  className="flex bg-input items-center justify-between rounded-2xl p-4"
                >
                  <Text
                    T="none"
                    weight="semi"
                    size="lg"
                    className="text-primary10"
                  >
                    1 {data[`title${locale}`]}
                  </Text>
                  <AdminButton
                    onClick={() =>
                      router.push(`/${locale}/admin/faq/${id}/${e.id}`)
                    }
                  >
                    settings
                  </AdminButton>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default FaqBlockEdit;
