"use client";

import Loading from "@/app/loading";
import Button from "@/components/Button";
import CustomLink from "@/components/CustomLink";
import Text from "@/components/Text";
import { useMobile } from "@/hooks/useMobile";
import CheckoutService from "@/services/Checkout";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useTranslations } from "next-intl";
import { notFound, useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const keyses = [
  { label: "order", value: "id" },
  { label: "date", value: "createdAt" },
  { label: "promokod", value: "promoCode" },
  { label: "mail", value: "email" },
  { label: "prcent", value: "prcent" },
  { label: "price", value: "price" },
  { label: "pricePrcent", value: "checkoutedPrice" },
];

function calculatePercentageDifference(original, newNumber) {
  const difference = original - newNumber;
  const percent = (difference / original) * 100;
  return percent;
}

const CodePreview = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth);
  const isMobile = useMobile();
  const t = useTranslations("preview");
  const { data, isPending } = useQuery({
    queryFn: () => CheckoutService.info(id),
    queryKey: ["Check", id],
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (isPending) return <Loading />;
  if (!isPending && !data?.data) notFound();
  // petqa sharunakenq view
  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[158px]">
      <div className="container flex flex-col gap-3 items-center">
        <Text T="preview" weight="semi" size="t38" className="text-primary10">
          title
        </Text>
        <Text T="preview" weight="semi" size="lg" className="text-linkColor">
          subtitle
        </Text>
        <div
          className={`flex  rounded-2xl bg-input mt-4  p-4 border-linkColor border flex-col gap-2 w-${
            isMobile ? "full" : "1/2"
          }`}
        >
          <Text
            T="preview"
            weight="semi"
            size="lg"
            className="text-linkColor text-center"
          >
            codes
          </Text>
          {data.data.codes.map((e, i) => {
            return (
              <div className="flex gap-2 w-full justify-between" key={e}>
                <Text
                  T="none"
                  weight="semi"
                  size="md"
                  className="text-primary10"
                >
                  {t("code")}
                  {i + 1}:
                </Text>
                <Text
                  T="none"
                  weight="semi"
                  size="md"
                  className="text-linkColor"
                >
                  {e}
                </Text>
              </div>
            );
          })}
        </div>
        <div
          className={`flex rounded-2xl bg-input mt-4 w-${
            isMobile ? "full" : "1/2"
          } p-4 border-linkColor border flex-col gap-2`}
        >
          {keyses.map((e) => {
            if (e.label === "promokod" && !data?.data?.promoCode) return;
            return (
              <div
                className="flex gap-2 w-full justify-between"
                key={crypto.randomUUID()}
              >
                <Text
                  T="preview"
                  weight="semi"
                  size="md"
                  className="text-primary10"
                >
                  {e.label}
                </Text>
                {e.value === "createdAt" ? (
                  <Text
                    T="none"
                    weight="semi"
                    size="md"
                    className="text-linkColor"
                  >
                    {moment(data.data.createdAt).format("D MMMM, YYYY")}
                  </Text>
                ) : (
                  <Text
                    T="none"
                    weight="semi"
                    size="md"
                    className="text-linkColor"
                  >
                    {e.value === "prcent"
                      ? `${calculatePercentageDifference(
                          data.data.price,
                          data.data.checkoutedPrice
                        )}%`
                      : data?.data[e.value]}
                  </Text>
                )}
              </div>
            );
          })}
        </div>
        <Text
          T="none"
          weight="semi"
          size="md"
          className={`text-linkColor w-${
            isMobile ? "full" : "1/2"
          } text-center`}
        >
          {t("text")} {"<"} {t("gmailText")} SMG {">"}
        </Text>
        <div className="flex gap-4">
          <CustomLink url="/">
            <Button T="preview">main</Button>
          </CustomLink>
          {!user?.user && (
            <CustomLink url="/login">
              <Button T="preview">login</Button>
            </CustomLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodePreview;
