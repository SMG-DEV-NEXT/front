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

const View = () => {
  const isMobile = useMobile(1030);
  const { cheat } = useParams();
  const { data, isPending } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: () => CheatsService.getCheat(cheat),
    queryKey: ["get-cheat"],
    retry: false,
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
          <FunctionalCheat mobile={isMobile} cheat={data.data} />
          {data.data.type !== "detected" && (
            <PayCard mobile={isMobile} cheat={data.data} />
          )}
          <Medias mobile={isMobile} cheat={data.data} />
          <Programs mobile={isMobile} cheat={data.data} />
          <FunctionalItemsMobile cheat={data.data} />
          <Comments mobile={isMobile} cheat={data.data} />
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[158px]">
      <div className="container z-[1]">
        <CardAndPay mobile={isMobile} cheat={data.data} />
        <FunctionalCheat mobile={isMobile} cheat={data.data} />
        <Medias mobile={isMobile} cheat={data.data} />
        <Comments mobile={isMobile} cheat={data.data} />
      </div>
    </div>
  );
};

export default View;
