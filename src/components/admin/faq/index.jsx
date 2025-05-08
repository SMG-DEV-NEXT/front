"use client";
import React from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { FAQService } from "@/services/FAQ";
import Loading from "@/app/loading";
import Text from "@/components/Text";
import AdminButton from "../components/button";
import { useRouter } from "next/navigation";

const FAQAdminView = () => {
  const locale = useLocale();
  const router = useRouter();
  const { data, isPending } = useQuery({
    queryKey: ["get-faq"],
    queryFn: FAQService.getAdminFaq,
    refetchOnWindowFocus: false,
  });
  return (
    <AdminContainer>
      <div className="flex flex-col gap-6">
        <AdminPageHeader route={"faq"} />
        {isPending ? (
          <Loading noPage={true} />
        ) : (
          <div className="flex flex-col w-full gap-6">
            {data?.data.map((e) => {
              return (
                <div
                  key={e.id}
                  className="flex px-4 py-[19px] rounded-[16px] bg-input justify-between items-center"
                >
                  <Text
                    T="none"
                    weight="bold"
                    size="md"
                    className="text-primary10"
                  >
                    {e[`title${locale}`]}
                  </Text>
                  <AdminButton
                    onClick={() => router.push(`/${locale}/admin/faq/${e.id}`)}
                  >
                    settings
                  </AdminButton>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminContainer>
  );
};

export default FAQAdminView;
