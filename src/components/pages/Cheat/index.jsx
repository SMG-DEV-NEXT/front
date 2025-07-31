"use client";
import React from "react";
import CardAndPay from "../../Cheat/Route/CardAndPay";
import FunctionalCheat, { FunctionalItemsMobile } from "../../Cheat/Functional";
import Medias from "../../Cheat/Media";
import Comments from "../../Cheat/Comment";
import { useMobile } from "@/hooks/useMobile";
import Programs from "@/components/Cheat/Route/CardAndPay/Programs";
import PayCard from "@/components/Cheat/Route/CardAndPay/Pay";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import CheatsService from "@/services/Cheats";
import Loading from "@/app/loading";
import Text from "@/components/Text";
import { getLocale } from "@/utils/getlocale";

function getQueryParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}
const View = () => {
  const isMobile = useMobile(1030);
  const { cheat } = useParams();
  const ref = getQueryParam("ref");

  const { data, isPending } = useQuery({
    refetchOnWindowFocus: true,
    queryFn: () => CheatsService.getCheat({ cheat, refId: ref }),
    queryKey: ["get-cheat", cheat],
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 0, // No caching
    staleTime: 0, // Data is always stale
  });

  if (!data?.data && !isPending) return notFound();
  if (isPending || !data) {
    return <Loading />;
  }

  if (isMobile) {
    return (
      <div className="view relative h-full w-full flex items-center justify-center pt-[60px] pb-[60px]">
        <div className="container flex flex-col gap-10 z-[1]">
          <CardAndPay mobile={isMobile} cheat={data.data} />
          <Medias mobile={isMobile} cheat={data.data} />
          {data.data.type !== "detected" && (
            <PayCard ref={ref} mobile={isMobile} cheat={data.data} />
          )}
          <FunctionalCheat mobile={isMobile} cheat={data.data} />
          <Programs mobile={isMobile} cheat={data.data} />
          <div className="flex flex-col gap-4">
            <Text
              className="text-primary10 leading-[140%]"
              T="product"
              weight="bold"
              size="xl"
            >
              about
            </Text>
            <Text T="none" className="text-primary10" size="sm" weight="medium">
              {data.data[`about${getLocale() == "en" ? "En" : "Ru"}`]}
            </Text>
          </div>

          <Comments mobile={isMobile} cheat={data.data} />
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[158px]">
      <div className="container z-[1]">
        <CardAndPay ref={ref} mobile={isMobile} cheat={data.data} />
        <FunctionalCheat mobile={isMobile} cheat={data.data} />
        <Comments mobile={isMobile} cheat={data.data} />
      </div>
    </div>
  );
};

export default View;
